import React, { useState } from "react";
import i18n from "../i18n";

const languages: string[] = ["English", "Chinese"];

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (language: string) => {
    setSelectedLanguage(language);
    toggleLang()
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleLang = async ()=>{
    if(i18n.language === 'en'){
       i18n.changeLanguage("zh");
    }else{
       i18n.changeLanguage("en");
    }
  }

  // Filter out the selected rank from the dropdown list
  const filteredRanks = languages.filter((language) => language !== selectedLanguage);

  return (
    <div className="flex items-center w-full rounded-xl relative">
      <div className="w-full flex flex-row-reverse gap-3 justify-between items-center px-4 py-2 border border-[#000807] bg-[#EB8A90] rounded-xl"
      onClick={toggleDropdown}>
        <div className="flex items-center cursor-pointer space-x-3">
          <svg
            className={`w-4 h-4 transform transition-transform duration-150 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="flex items-center gap-1">
          <img src="/translate.svg" alt="translate" className="w-5 h-auto" />
          <span className="font-bold">{selectedLanguage}</span>
        </div>
      </div>
      <div
        className={`absolute w-full top-0 left-0 right-0 mt-0 border border-[#000807] bg-[#EB8A90] rounded-xl transition duration-150 ${
          isOpen ? "max-h-max opacity-100" : "max-h-0 p-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="w-full flex flex-row-reverse gap-3 justify-between items-center px-4 pt-2"
          onClick={toggleDropdown}>
          <div className="flex items-center cursor-pointer">
            <svg
              className={`w-4 h-4 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center justify-between w-5 h-auto gap-1">
            <img src="/translate.svg" alt="translate" className="w-5 h-auto" />
            <span className="flex font-bold">{selectedLanguage}</span>
          </div>
          </div>
          {filteredRanks.map((language, id) => (
          <div
            key={id}
            className="flex justify-start py-2 px-4 mt-1 cursor-pointer"
            onClick={() => handleSelect(language)}
          >
            {language}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;