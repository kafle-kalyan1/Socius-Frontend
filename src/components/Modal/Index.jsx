import React, { useState } from "react";

const Modal = (props) => {

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
          {/* <FaTimes className="close" onClick={() => props.setShowModal(false)}>
            &times;
          </FaTimes> */}
        </div>
        <div className="modal-body">
          {props.data
            ? props.data.map((res) => {
                return (
                  <div
                    className="d-flex justify-content-evenly"
                    key={props.name}
                  >
                    <div className="data">{res.name}</div>
                    <div className="followers">{res.followers}</div>
                    <div className="btn btn-outline-primary">Follow</div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="modal-body">
              { props.body ? props.body : null
              }
        </div>
      </div>
    </div>
  );
};

export default Modal;
