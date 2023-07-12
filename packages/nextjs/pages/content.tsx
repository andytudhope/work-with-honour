import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Content: NextPage = () => {
  return (
    <>
      <MetaHeader title="Gated Content | Honour" description="Gate your content in a prosocial way" />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Gated content will appear here</h1>
      </div>
    </>
  );
};

export default Content;
