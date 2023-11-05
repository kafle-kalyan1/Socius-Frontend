/* eslint-disable react/prop-types */
import ReactDOM from "react-dom/client";
import { SuccessIcon, ErrorIcon, WarningIcon, InfoIcon } from "/src/Library/Icons/ResponseIcons";

const Alert = ({title, message, type, buttons, outSideAction, closeButton, hideDisabled}) => {
   const hide = () => {
      document.getElementById('modal').style.display = 'none';
      if (outSideAction) {
        outSideAction();
      }
    };

  if (buttons) {
    var butTitle = buttons[0].title;
    var butTitle2 = buttons[1]?.title ? buttons[1].title : "Cancel"; 
    var butOnclick = buttons[0].onclick;
    var butOnclick2 = buttons[1]?.onclick ? buttons[1].onclick : hide;
  }
  var hidden = "block";
  if (hideDisabled) {
     hidden = "hidden";
  }



    
  var color;
  switch (type) {
     case "success":
       debugger
      color = "green";
      var icon = (
         <SuccessIcon/>
      );
      break;
    case "error":
      color = "red";
       icon = (
         <ErrorIcon/>
      );
      break;
    case "warning":
      color = "orange";
       icon = (
        <WarningIcon/>
      );
      break;
    case "info":
      color = "blue";
       icon = (
        <InfoIcon/>
      );
      break;
    default:
      color = "blue";
       icon = (
        <InfoIcon/>
      );
      break;
  }

  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster left-0 top-0 flex justify-center items-center  outline-none focus:outline-none bg-no-repeat bg-center bg-cover bg-opacity-60 fixed inset-0 bg-black backdrop-blur-md z-50"
      id="modal-id"
    >
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-slate-200">
      <div title="close" className="closeBTN cursor-pointer absolute right-3 top-1 bg-red-500 w-8 h-8 flex justify-center items-center rounded-full hover:bg-red-600 transition-colors duration-300 ease-in-out spin-once" onClick={hide}>
        <span className="text-white text-lg font-bold">X</span>
      </div>
        <div className="">
          <div className="text-center p-5 flex-auto justify-center">
           <div className="flex justify-center">
           {icon}
           </div>
            <h2 className={`text-xl font-bold py-4 text-${color}-500`}>
              {title}
            </h2>
            <p className="text-sm text-textSecondary px-8">{message}</p>
          </div>
          <div className="p-3 mt-2 text-center space-x-4 md:block">
            <button
              onClick={()=>{butOnclick(); hide();}}
              className={`mb-2 md:mb-0 bg-${color}-500 border border-${color}-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-${color}-600`}
            >
              {butTitle}
            </button>

            <button
              onClick={()=>butOnclick2}
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            >
              {butTitle2}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export function showModal({title, message, type, buttons, outSideAction, closeButton, hideDisabled}) {
  
  const modalContainer = document.getElementById('modal');
  console.log(modalContainer);

  ReactDOM.createRoot(modalContainer).render(
    <Alert
      title={title}
      message={message}
      type={type}
      buttons={buttons}
      outSideAction={outSideAction}
    />
  );
  document.getElementById('modal').style.display = 'block';
}


export default Alert;
