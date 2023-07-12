import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "../Spinner";
import { Modal } from "./Modal";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Balance = () => {
  const connectedAccount = useAccount();
  const {
    data: balance,
    isLoading,
    refetch,
  } = useScaffoldContractRead({
    contractName: "Honour",
    functionName: "balanceOf",
    args: [connectedAccount.address],
  });

  const formattedBalance = balance ? formatEther(balance) : 0;
  const check = balance ? balance : 0;

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal) {
      refetch();
    }
  }, [showModal, refetch]);

  return (
    <>
      <p className="text-4xl">Your balance is:</p>
      {isLoading ? <Spinner width="80px" height="80px" /> : <p className="text-2xl">{formattedBalance}</p>}
      {check > 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-2xl">Tada! This is your gated content. Let&apos;s co:operate...</p>
          <div className="flex items-center justify-center">
            <div className="max-w-full">
              <Image src="/assets/cat.jpg" alt="Sati-AI" width={400} height={600} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col flex-grow pt-10">
          <p className="w-full md:w-1/2 text-center">
            You need to accept some tokens to access the rest of this page. HON is free, because it does not represent
            an asset: it is a promise to pay back the community who has produced what you are about to see.
          </p>
          <button className="btn btn-primary px-10 rounded-full space-x-3" onClick={handleButtonClick}>
            Get some Hon
          </button>
        </div>
      )}
      {showModal && <Modal onClose={handleCloseModal} />}
    </>
  );
};
