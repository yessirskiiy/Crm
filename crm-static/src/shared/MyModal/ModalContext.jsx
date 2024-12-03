import {createContext, useContext, useState} from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({children}) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={{modalOpen, setModalOpen}}>
            {children}
        </ModalContext.Provider>
    );
};
