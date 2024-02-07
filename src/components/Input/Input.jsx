/* eslint-disable react/prop-types */
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

// jsdox
/**
 * @param {object} props
 * @param {object} props.formik
 * @param {object} props.Icon
 * @param {string} props.title
 * @param {string} props.type
 * @param {boolean} props.haveHideView
 * @param {boolean} props.onlyHide
 * @param {string} props.name
 * @param {object} props.ref_
 */
 
const Input = (props) => {
  const { formik, Icon, title, type, haveHideView = false, onlyHide=false, default_show=false, name, ref_ } =
    props;

    const [show, setShow] = useState(true);
 
    useEffect(() => {
      if(haveHideView && default_show){
        setShow(true)
      }
      else if(haveHideView && !default_show){
        setShow(false)
      }

    }, [])
  return (
    <div className="mb-2">
      <span className="flex text-text1 dark:text-text2">
        {Icon}
        <label
          htmlFor={name}
          className="block ml-3 text-sm font-semibold text-text1 dark:text-text2 tracking-widest"
        >
          {title}
        </label>
      </span>
      <span className="w-full">
        <input
          type={onlyHide ? "password" : show ? type : "password"}
          name={name}
          ref={ref_}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete='nope'
          placeholder={
            formik.touched[name] && formik.errors[name]
              ? `${title} is required`
              : `${title}`
          }
          className={`w-full px-4 py-2 mt-2 text-text1 dark:text-text2 bg-background dark:bg-darkcardBorder border-2 rounded-md font-mono  border-cardBorder dark:border-dark_cardBorder hover:border-main_text flex
   ${
     formik.touched[name] && formik.errors[name]
       ? " border-red_text placeholder-red_text"
       : "outline-cardBorder focus:outline-main_text dark:outline-dark_cardBorder"
   }`}
        />

        {haveHideView ? (
          <span
            className="w-6 h-7 cursor-pointer -mt-8 ml-1 transition block float-right duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => {
              setShow((p)=>(!p))
              }}
            title={!show ? "Show" : "Hide"}
          >
            {show ? <EyeInvisibleOutlined/> : <EyeOutlined/>}
          </span>
        ) : null}
      </span>
      {formik.touched[name] &&
      formik.errors[name] &&
      formik.values[name] != "" ? (
        <h3 className="text-xs text-red_text">{formik.errors[name]}</h3>
      ) : null}
    </div>
  );
};
Input.defaultProps = {
  type: "text",
  otherState: null,
  btn1: null,
  btn2: null,
  name: null,
  ref_: null,
};


export default Input;
