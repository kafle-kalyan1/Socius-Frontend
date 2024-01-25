import React, { useContext } from "react";
import { Button, Result } from "antd";
import Sidebar from "/src/components/Sidebar/Sidebar";
import MenuContext from "antd/es/menu/MenuContext";

const Unauthorized = () => {
  const { open, setOpen } = useContext(MenuContext);

  return (
    <div className="flex h-screen">
      <div className={` block duration-300 z-20 ${open ? "w-1/5" : " w-1/12"}`}>
        <Sidebar className="" />
      </div>
      <div
        className={`block duration-300 ${
          open ? "w-4/5" : " w-10/12"
        } ml-10 mt-5`}
      >
        <div className="w-3/4">
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
          />
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
