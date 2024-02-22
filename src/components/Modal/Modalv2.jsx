import React from "react";
import { IoMdClose } from "react-icons/io";
import './abc.css'

const Modal = ({ isModalOpen, modalContent, onClose }) => {
 if (isModalOpen !== true) {
   return null;
 }
 return (
   <section className="modal z-50">
     <article className="modal-content p-lg-4">
       <div className="exit-icon text-end">
         <IoMdClose onClick={onClose} />
       {
         modalContent
       }
       </div>
     </article>
   </section>
 );
};

export default Modal;