import React, { useState } from 'react';
import { Image, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPopUp = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiSelect = (emojiData) => {
        onSelect(emojiData?.emoji || "");
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
        
            <div onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <span className="text-2xl">{icon}</span>
                    ) : (
                        <Image />
                    )}
                </div>
                <p className="text-sm text-gray-600">
                    {icon ? "Change icon" : "Pick icon"}
                </p>
            </div>

            {isOpen && (
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10"
                    >
                    <X size={14} />
                    </button>

                    <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </div>
            )}
        </div>
    );
};

export default EmojiPopUp;