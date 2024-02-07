import React from "react";
import { DatePicker } from 'antd';

const DatePickers = (props) => {
  const { formik, title, name, Icon, minDate, maxDate } = props;

  const onChange = (value) => {
    console.log(value)
    formik.values[name] = value?.format('YYYY-MM-DD');
  }
  return (
    <div className="mb-2">
      <span className="flex text-text1 dark:text-text2 ">
        {Icon}
        <label
          htmlFor={name}
          className="block text-sm ml-3 font-semibold text-text1 dark:text-text2 "
        >
          {title}
        </label>
      </span>
      <span className="flex w-full">
        <DatePicker
          type="date"
          name={name}
          bordered={true}
          onChange={onChange}
          onBlur={formik.handleBlur}
          placeholder={title}
          min={minDate} 
          // rootClassName="border-2 rounded-md focus:ring-0 ring-0 border-cardBorder dark:border-dark_cardBorder "
          max={maxDate}
          className={`block w-full px-4 py-2 mt-2 text-text1 dark:text-text2  placeholder-bold bg-background dark:bg-darkcardBorder border-2 rounded-md focus:ring-0 ring-0 font-mono border-cardBorder dark:border-darkcardBorder 
            ${
            formik.touched[name] && formik.errors[name]
              ? "border-red_text placeholder-red_text"
              : "outline-cardBorder dark:outline-dark_cardBorder "
              }
        `}
        />
      </span>
      {formik.touched[name] && formik.errors[name] && (
        <h3 className="text-xs text-red_text">{formik.errors[name]}</h3>
      )}
    </div>
  );
};

export default DatePickers;
