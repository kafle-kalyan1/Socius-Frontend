
import DynamicLogo from "/src/DynamicLogo";
import { Modal } from "antd";
const TermsModal = (props) => {
  let {isShown, setIsShown, terms, change} = props
  return (
    <Modal
      title="Terms and Conditions"
      open={isShown}
      onOk={() =>{ setIsShown(false); change("terms", !terms)}}
      onCancel={() => setIsShown(false)}
      footer={null}
      width={1000}
      centered
    >
    bla bla
    </Modal>
  )
}

export default TermsModal