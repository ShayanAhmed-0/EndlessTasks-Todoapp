import React, { useState } from 'react';
import { TextareaHTMLAttributes } from 'react';
import editicon from "../../public/edit.png"
import Image from 'next/image';

const PopupScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

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
    // Handle form submission logic here
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
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
