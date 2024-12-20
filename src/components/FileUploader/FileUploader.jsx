import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const FileUploader = ({ title, action, accept, onChange, multiple, icon, description }) => {
  const props = {
    name: 'file',
    multiple: multiple,
    action: action,
    accept: accept,
    onChange: (info) => {
      if (onChange) {
        onChange(info);
      }

      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop: (e) => {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
   <div className="mb-2 ">
   <span className="flex">
     {icon}
     <label
       htmlFor={name}
       className="block ml-3 text-sm font-semibold text-textPrimary dark:text-dark_textPrimary"
     >
       {title}
     </label>
   </span>
   <span className="flex w-full">

    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        {icon || <InboxOutlined />}
      </p>
      <p className="ant-upload-text">{title || 'Click or drag file to this area to upload'}</p>
      <p className="ant-upload-hint">
        {description || 'Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.'}
      </p>
    </Dragger>
    </span>

</div>
  );
};

export default FileUploader;


{/* <FileUploader  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
multiple={false}
icon={""}
description="Upload your documents here."
/> */}