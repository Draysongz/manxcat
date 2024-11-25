// Updated IdModalProps type to match onClose signature


import React from "react";
import CustomDropdown from "./Dropdown";
import { Icon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAudio } from "../context/AudioContext";
import { GoMute } from "react-icons/go";

type IdModalProps = {
  isOpen: boolean;
  isClosed: (e: React.MouseEvent) => void;
};




const IdModal: React.FC<IdModalProps> = ({ isOpen, isClosed }) => {
  const {
    toggleMute,
    getRandomTrack,
    isMuted,
  } = useAudio();




  return !isOpen ? null : (
    <div className="fixed inset-0 bg-[#EFD0CA] bg-opacity-40 backdrop-brightness-50 flex justify-center items-center z-[999] p-5">
      <div className="flex flex-col bg-[#EFD0CA] rounded-3xl p-5 w-full">
        <div
          className="flex justify-end"
          onClick={(e: React.MouseEvent) => isClosed(e)}
        >
          <Icon as={CloseIcon} boxSize={4} />
        </div>
        <div className="flex w-full justify-center items-center gap-5 mb-5">
          <div className="flex rounded-full bg-[#EB8A90] p-2">
            <img src="/headercat-modal.svg" alt="header cat" />
          </div>
          <p className="font-bold text-lg">ID: 1889676545</p>
        </div>
        <div className="flex justify-evenly items-center">
          <div className="flex gap-2">
            <div
              className="rounded-full p-2 bg-[#EB8A90]"
              onClick={toggleMute}
            >
             {!isMuted && <img
                src="/volume.svg"
                alt="volume button"
                className="w-6 h-auto"
              />}
             {isMuted && <Icon as={GoMute} color={'white'} boxSize={6} />}
            </div>
            <div
              className="rounded-full p-2 bg-[#EB8A90]"
              onClick={()=>getRandomTrack()}
            >
              <img
                src="/music-note.svg"
                alt="music note button"
                className="w-6 h-auto"
              />
            </div>
          </div>
          <div>
            <CustomDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdModal;
