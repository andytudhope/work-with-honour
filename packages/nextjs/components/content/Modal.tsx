import React from "react";

interface ModalProps {
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onClose }) => {
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
          HON is always consensual, which means you can only get it by accepting someone else&apos;s proposal. In order
          to give you access to this content, we have created a service which will propose HON that you can accept.
          Click the button below to begin the process, then click it again to accept your new HON. We trust that your
          willing consent is worth one extra click.
        </p>
      </div>
    </div>
  );
};
