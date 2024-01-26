import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { Upload } from 'antd';

const ImageUploader = ({ formik, name,title,max, Icon }) => {
  console.log(formik.values)
  const [fileList, setFileList] = useState(
    formik.values[name] ? [...formik.values[name]] : []
  );

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  
    if (max) {
      formik.setFieldValue(name, newFileList);
    } else {
      formik.setFieldValue(name, newFileList[0]);
    }
  };

  const onPreview = async (file) => {
  
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
   <div className="mb-2">
      <span className="flex">
        {Icon}
        <label
          htmlFor={name}
          className="block ml-3 text-sm font-semibold text-textPrimary dark:text-dark_textPrimary"
        >
          {title}
        </label>
      </span>
      <span className="flex w-full justify-center">

    <ImgCrop rotationSlider>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        className="avatar-uploader"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < (max?max:1) && '+ Upload'}
      </Upload>
    </ImgCrop>
      </span>
      {formik?.touched[name] && formik?.errors[name] && (
        <h3 className="text-xs text-error_red">{formik?.errors[name]}</h3>
      )}
    </div>
  );
};

export default ImageUploader;

//<ImageUploader formik={formik} title={"Please select Images"} name={"profile_pic"}/>
