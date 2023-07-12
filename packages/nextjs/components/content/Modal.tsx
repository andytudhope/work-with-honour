import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
  // These three constants are required to create and write valid accept txes
  const apiUrl = "https://propose.honour.community";
  const graphUrl = "https://api.studio.thegraph.com/query/24825/honour-goerli/0.1.1";
  const proposer = "0x4Daf7C338134C0Bf9aaB7C4D7dEa6e8418385c29";

  const connectedAccount = useAccount();

  const [loading, setLoading] = useState(false);
  const [askSuccess, setAskSuccess] = useState(false);
  const [proposalId, setProposalId] = useState<bigint | undefined>(undefined);

  // have the api propose HON on the first click
  const requestHON = async () => {
    setLoading(true);
    try {
      const response = await axios.post(apiUrl, null, {
        headers: {
          amount: 1,
          address: connectedAccount.address,
        },
      });
      if (response.status === 200) {
        console.log("Successful request!");
        setAskSuccess(true);
        setLoading(false);
      } else {
        console.log("Weird response. Please try again later");
        setLoading(false);
      }
    } catch (error) {
      console.log("We can't prepare HON for you right now. Please try again later");
      setLoading(false);
      onClose();
    }
  };

  // use the subgraph to fetch the correct proposalId for the HON just proposed by the api
  const getProposalId = async () => {
    let proposalId = null;
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 5000;

    while (!proposalId && retryCount < maxRetries) {
      try {
        const response = await axios.post(graphUrl, {
          query: `
            query GetProposals($account: Bytes!) {
              proposeds(where: { receiver: $account }) {
                proposalId
              }
            }
          `,
          variables: {
            account: connectedAccount.address,
          },
        });

        const { data } = response.data;
        const proposals = data.proposeds;
        if (proposals && proposals.length > 0) {
          const proposal = proposals[0];
          proposalId = proposal.proposalId;
        }
      } catch (error) {
        console.log("There was an error with the subgraph.");
      }

      if (!proposalId) {
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }

    if (!proposalId) {
      console.log("There was an error. Please try again later.");
    }

    console.log("Successful id fetch!");
    return proposalId;
  };

  // now the person can accept the HON just proposed
  const acceptHON = async () => {
    setLoading(true);
    const id = await getProposalId();
    console.log("The id is: ", id);
    if (id) {
      setProposalId(id);
    }
    setLoading(false);
  };

  // use the neat SE2 hooks for the actual write, having fetched the correct ID
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "Honour",
    functionName: "honour",
    args: [proposer, proposalId],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  // we're useEffect'ing here due to the async nature of state updates in react components :(
  useEffect(() => {
    if (proposalId) {
      writeAsync();
      onClose();
    }
  }, [proposalId, writeAsync, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10 backdrop-filter backdrop-blur-md">
      <div className="w-full md:w-1/2 h-full md:h-1/2 pt-40 md:pt-0 rounded-2xl bg-blue-300 mx-auto mt-250 flex flex-col relative">
        <button className="absolute top-20 md:top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="text-center md:text-xl md:p-20 p-10">
          The honour system is consensual, which means you can only get it by accepting someone else&apos;s proposal. In
          order to give you access to this content, you will needto click twice to create and accept your new HON. We
          trust that your willing consent is worth one extra click.
        </p>
        {askSuccess ? (
          <button
            className={`btn btn-secondary md:w-1/2 md:mx-auto px-10 rounded-full ${
              loading ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
            }`}
            onClick={acceptHON}
          >
            {loading ? "" : "Accept HON"}
          </button>
        ) : (
          <button
            className={`btn btn-secondary md:w-1/2 md:mx-auto px-10 rounded-full ${
              loading ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
            }`}
            onClick={requestHON}
          >
            {loading ? "" : "Request HON"}
          </button>
        )}
      </div>
    </div>
  );
};
