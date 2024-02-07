import { useContext } from "react";
import DynamicLogo from "/src/DynamicLogo";
import { Modal } from "antd";
import { ThemeContext } from "../../context/ThemeContext/Index";
const TermsModal = (props) => {
  const { isDarkTheme } = useContext(ThemeContext);
  let { isShown, setIsShown, terms, change } = props;
  return (
    <Modal
      open={isShown}
      onOk={() => {
        setIsShown(false);
        change("terms", !terms);
      }}
      className="top-10 m-auto h-2/3 bg-cardBg dark:bg-darkcardBg overflow-auto scroll-bar"
      onCancel={() => setIsShown(false)}
      footer={
        <div className="flex justify-center">
          <button
            className=" bg-primary_btn_dark text-white p-2 rounded-md"
            onClick={() => {
              setIsShown(false);
              change("terms", !terms);
            }}
          >
            Agree
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md ml-2"
            onClick={() => setIsShown(false)}
          >
            Cancel
          </button>
        </div>

      }
      width={"auto"}

      centered
    >
      <div className="bg-cardBg dark:bg-darkcardBg p-8 rounded-lg">
        <h1 className="text-gray-800 dark:text-gray-100 text-3xl font-bold text-center">
          Socius - Terms and Conditions
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg mt-4">
          By using the Socius platform and services, you agree to the following
          terms and conditions:
        </p>

        <h2 className="text-gray-700 dark:text-gray-200 text-2xl font-bold mt-8">Account Terms</h2>

        <ul className="list-disc text-gray-600 dark:text-gray-300 text-lg ml-8 mt-4">
          <li>You must be 13 years or older to create an account.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>
            You are solely responsible for all activities associated with your
            account.
          </li>
        </ul>

        <h2 className="text-gray-700 dark:text-gray-200 text-2xl font-bold mt-8">Content Terms</h2>

        <ul className="list-disc text-gray-600 dark:text-gray-300 text-lg ml-8 mt-4">
          <li>
            You retain ownership of the content you post, but grant us a license
            to use it.
          </li>
          <li>
            You agree not to post illegal, offensive or infringing content.
          </li>
          <li>We reserve the right to remove any content at our discretion.</li>
        </ul>

        <h2 className="text-gray-700 dark:text-gray-200 text-2xl font-bold mt-8">Service Terms</h2>

        <ul className="list-disc text-gray-600 dark:text-gray-300 text-lg ml-8 mt-4">
          <li>
            We may modify, suspend or discontinue any part of the service.
          </li>
          <li>
            We are not liable for any damages as a result of using Socius.
          </li>
          <li>Your use of Socius is at your own risk.</li>
        </ul>

      </div>
    </Modal>
  );
};

export default TermsModal;
