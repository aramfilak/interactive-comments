import "./Modal.scss";
import React from "react";

interface ModalProps {
  subject: string;
  message: string;
  actionBtnText: string;
  actionBtnTextColor?: string;
  actionBtnColor: string;
  actionBtnCallback: () => void;
  closeModalBtnText: string;
  closeModalBtnTextColor?: string;
  closeModalBtnColor: string;
  setShowModal: (arg: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  subject,
  message,
  actionBtnText,
  actionBtnColor,
  actionBtnCallback,
  actionBtnTextColor,
  closeModalBtnTextColor,
  closeModalBtnText,
  closeModalBtnColor,
  setShowModal,
}) => {
  function handleActionClick() {
    actionBtnCallback();
    setShowModal(false);
  }

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="content">
        <h2 className="subject">{subject}</h2>
        <p className="message">{message}</p>
        <div className="modal-buttons">
          <button
            className="modal-close-btn"
            style={{
              backgroundColor: closeModalBtnColor,
              color: closeModalBtnTextColor,
            }}
            onClick={() => setShowModal(false)}
          >
            {closeModalBtnText}
          </button>
          <button
            className="modal-action-btn"
            style={{
              backgroundColor: actionBtnColor,
              color: actionBtnTextColor,
            }}
            onClick={handleActionClick}
          >
            {actionBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
