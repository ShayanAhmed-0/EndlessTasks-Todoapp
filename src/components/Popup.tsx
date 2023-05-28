import React, { useEffect, useState } from 'react';
import { TextareaHTMLAttributes } from 'react';
import editicon from "../../public/edit.png"
import Image from 'next/image';
import { Todo } from '@/lib/drizzle';

interface Todos {
  compid: number;
  comptask: string;
  refresh:()=>void
}



const PopupScreen = (props:Todos) => {
  const {refresh,comptask,compid}=props
  const [isOpen, setIsOpen] = useState(false);
  const [input1, setInput1] = useState(comptask);
  const [input2, setInput2] = useState(comptask);

  const handlePATCH = async () => {
    try {
      const res = await fetch(`/api/Todo/${compid}`, {
        method: 'PATCH',
        body: JSON.stringify({
          task: input2
        }),
      });
      const data = await res.json();
      refresh(); // Call the refreshList function to update the list
    } catch (error) {
      console.log("Delete handle");
    }
  }


  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput1(event.target.value);
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput2(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePATCH()
    closePopup();
  };

  return (
    <div>
      <button
        onClick={openPopup}
        className="pt-1"
      >
        <Image src={editicon} alt="edit icon"/>
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-8 bg-white rounded w-96">
            <button
              onClick={closePopup}
              className="absolute mb-2 font-bold text-red-600 duration-500 top-2 right-5 hover:text-red-800 hover:scale-150"
            >
              X
            </button>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  value={input1}
                  onChange={handleInputChange1}
                  placeholder="Input 1"
                  className="w-full p-2 border border-gray-300"
                />
              </div>
              <div>
                <textarea
                  value={input2}
                  onChange={handleInputChange2}
                  placeholder="Input 2"
                  className="w-full h-32 p-2 border border-gray-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupScreen;
