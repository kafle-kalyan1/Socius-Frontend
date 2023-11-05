/* eslint-disable react/prop-types */
import ReactDOM from "react-dom/client";
import spin  from "/src/assets/Icons/icons8-loading.gif";

const Loading = () => {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster left-0 top-0 flex justify-center items-center  outline-none focus:outline-none bg-no-repeat bg-center bg-cover bg-opacity-10 fixed inset-0 bg-black backdrop-blur-xs z-50"
      id="modal-id"
    >
      <div className="w-screen h-screen flex justify-center align-middle content-center items-center">
      <h1 className="">loading...</h1>
        {/* <img src={spin} alt="loading..." className="w-10 h-10 flex justify-center align-middle" /> */}
      </div>
    </div>
  );
};
export function showLoading(bool) {
  const modalContainer = document.getElementById("modal");
if (bool) {
   ReactDOM.createRoot(modalContainer).render(<Loading />); 
   document.getElementById("modal").style.display = "block";
}
else{
   document.getElementById("modal").style.display = "none";
}
}

export default Loading;
