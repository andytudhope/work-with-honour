import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Balance } from "~~/components/content/Balance";

const Content: NextPage = () => {
  return (
    <>
      <MetaHeader title="Gated Content | Honour" description="Gate your content in a prosocial way" />
      <div className="flex items-center flex-col flex-grow pt-10">
        <Balance />
      </div>
    </>
  );
};

export default Content;
