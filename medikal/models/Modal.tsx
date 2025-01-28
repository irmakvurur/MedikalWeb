import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold">{title}</h2>
                <button onClick={onClose} className="absolute top-2 right-2">X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
