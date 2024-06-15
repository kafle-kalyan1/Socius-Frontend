import { Skeleton, Avatar, Button, Card } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";

const OurProfileSkeleton = () => {
   return (
    <div className="bg-gray-100 w-full">
    <div className="container mx-auto my-5 p-5">
      <Skeleton active paragraph={{ rows: 4 }} />

      <div className="md:flex no-wrap md:-mx-2">
        <div className="w-full md:w-6/12 md:mx-2">
          <Card>
            <Skeleton avatar active />

            <Skeleton title={{ width: '40%' }} active />

            <Skeleton paragraph={{ rows: 4 }} active />
            
            <Button type="primary" shape="round" loading>
              Edit Profile  
            </Button>
          </Card>

          <div className="my-4" />

          <Card>
            <Skeleton title={{ width: '20%' }} active />
            
            <Skeleton avatar={{ size: 40 }} paragraph={{ rows: 2 }} active />
          </Card>
        </div>

        <div className="w-full md:w-9/12 mx-2">
          <Card>
            <Skeleton avatar={{ size: 20 }} active />
            <Skeleton title={{ width: '20%' }} active />

            <Skeleton paragraph={{ rows: 4 }} active />
            
            <Button type="primary" shape="round" loading>
              Edit Details
            </Button>
          </Card>

          <div className="my-4" />

          <Card>
            <Skeleton avatar={{ size: 20 }} active />
            <Skeleton title={{ width: '20%' }} active />

            <Skeleton paragraph={{ rows: 4 }} active />

            <Skeleton avatar={{ size: 20 }} active />
            <Skeleton title={{ width: '20%' }} active />

            <Skeleton paragraph={{ rows: 4 }} active />

            <Button type="primary" shape="round" loading>
              Edit Details
            </Button>
          </Card>
        </div>
      </div>
    </div>
  </div>
   );
 };
 export default OurProfileSkeleton;