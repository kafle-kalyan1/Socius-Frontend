import React from 'react';
import { Select } from 'antd';

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const Selects = (props) => {
  const {options,  formik, Icon, title, name} = props;

  const onChange = (value) => {
formik.values[name] = value;
  };

  return (
    <div className="mb-2 ">
    <span className="flex text-text1 dark:text-text2">
      {Icon}
      <label
        htmlFor={name}
        className="block ml-3 text-sm font-semibold text-text1 dark:text-text2"
      >
        {title}
      </label>
    </span>
    <span className="flex w-full">


  <Select
    showSearch
    title={title}
    optionFilterProp="children"
    onChange={onChange}
    placeholder={<b>{title}</b>}
    defaultValue={formik.values[name]}
    onBlur={formik.handleBlur}
    filterOption={filterOption}
    options={options}
    rootClassName='outline-0 border ring-0 bg-redd-200 bg-cardBorder dark:bg-darkcardBorder '
    className={`block w-full mt-2 h-[42px] text-text1 dark:text-text2 font-mono dark:bg-darkcardBorder border-0 ring-0 outline-0 rounded-md border-cardBorder dark:border-darkcardBorder bg-background`}
  />
          </span>

          {formik.touched[name] &&
      formik.errors[name] &&
      formik.values[name] != "" ? (
        <h3 className="text-xs text-red_text">{formik.errors[name]}</h3>
      ) : null}

   </div>
);
  }
export default Selects;