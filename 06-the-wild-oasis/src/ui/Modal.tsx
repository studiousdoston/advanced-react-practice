import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

import { T } from "../libs/common.type";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalContextValue = {
  open: (name: string) => void;
  openName: string;
  close: () => void;
};
type ModalProps = {
  children: React.ReactNode;
};
type OpenProps = {
  children: React.ReactElement;
  opensWindowName?: string;
};

const ModalContext = createContext<ModalContextValue>({
  open: () => {},
  openName: "",
  close: () => {},
});

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState("");

  function close() {
    return setOpenName("");
  }
  function open(name: string) {
    return setOpenName(name);
  }
  return (
    <ModalContext.Provider value={{ open, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName!) });
  // here cloneElement is being used to attack onClick event to the child element of Open Component
}

//*--------------------------------------------------
//                   COMPONENT
//*--------------------------------------------------
function Window({ children, name }: T) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  //*--------------------------------------------------
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
        {/* here cloneElement is being used to attach the onCloseModal to the child component of Window Component */}
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
