import { Spinner } from "../Spinner";
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

  return (
    <>
      <p className="text-4xl">Your balance is:</p>
      {isLoading ? <Spinner width="80px" height="80px" /> : <p className="text-2xl">{formattedBalance}</p>}
    </>
  );
};
