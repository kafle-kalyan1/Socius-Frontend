/* eslint-disable react/prop-types */
import ReactDOM from "react-dom/client";

const Loading = () => {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster left-0 top-0 flex justify-center items-center  outline-none focus:outline-none bg-no-repeat bg-center bg-cover bg-opacity-10 fixed inset-0 bg-black backdrop-blur-sm z-50"
      id="modal-id"
    >
      <div className="w-screen h-screen flex justify-center align-middle content-center items-center">
      <div
  aria-label="Loading..."
  role="status"
  className="flex items-center space-x-2"
>
  <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
    <line
      x1={128}
      y1={32}
      x2={128}
      y2={64}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1="195.9"
      y1="60.1"
      x2="173.3"
      y2="82.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1={224}
      y1={128}
      x2={192}
      y2={128}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    ></line>
    <line
      x1="195.9"
      y1="195.9"
      x2="173.3"
      y2="173.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1={128}
      y1={224}
      x2={128}
      y2={192}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    ></line>
    <line
      x1="60.1"
      y1="195.9"
      x2="82.7"
      y2="173.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1={32}
      y1={128}
      x2={64}
      y2={128}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <line
      x1="60.1"
      y1="60.1"
      x2="82.7"
      y2="82.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    ></line>
  </svg>
  <span className="text-4xl font-medium text-gray-500">Loading...</span>
</div>
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
