import { useState } from "react";
import { Spinner } from "../Spinner";
import { Modal } from "./Modal";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const Balance = () => {
  const connectedAccount = useAccount();
  const { data: balance, isLoading } = useScaffoldContractRead({
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

  return (
    <>
      <p className="text-4xl">Your balance is:</p>
      {isLoading ? <Spinner width="80px" height="80px" /> : <p className="text-2xl">{formattedBalance}</p>}
      {check > 0 ? (
        <p className="text-2xl">Tada! This is your gated content. Let&apos;s co:operate...</p>
      ) : (
        <button className="btn btn-primary px-10 rounded-full space-x-3" onClick={handleButtonClick}>
          Get some Hon
        </button>
      )}
      {showModal && <Modal onClose={handleCloseModal} />}
    </>
  );
};
