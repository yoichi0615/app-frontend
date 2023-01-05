import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Day } from "../atoms/Day";
import { Modal } from "../organisms/Modal";


const ModalPortal = ({ children }) => {
  const target = document.querySelector('container.start')
  return createPortal(children, target)
}
export const Month = (props) => {
  const { month } = props
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    console.log('aa')
    setModalOpen(true)
  }

  return (
    <>
      <div className="container start"></div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} onClick={() => openModal}/>
            ))}
          </React.Fragment>
        ))}
      </div>
      {modalOpen && (
        <ModalPortal>
          <Modal handleCloseClick={() => setModalOpen(false)} />
        </ModalPortal>
      )}
    </>
  );
};
