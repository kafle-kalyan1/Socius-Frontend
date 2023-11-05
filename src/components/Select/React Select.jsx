import React from "react";
import Select from "react-select";

const SelectInput = (props) => {
  const { formik, title, name, options, value, Icon } = props;

  const selectedOption = options.find((option) => option.value === value);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // backgroundColor:"#faf5f5"
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#faf5f5",
      
    }),
  };
  return (
    <div className="mb-2">
      <span className="flex">
        {Icon}
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-textPrimary dark:text-dark_textPrimary"
        >
          {title}
        </label>
      </span>
      <Select
  name={name}
  options={options}
  value={selectedOption}
  onChange={(selectedOption) => formik.setFieldValue(name, selectedOption.value)}
  onBlur={() => formik.setFieldTouched(name, true)}
  theme={(theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: 'black',
      },
      
      })}
  styles={customStyles}
  className={`
    ${
      formik.touched[name] && formik.errors[name]
        ? "border-error_red placeholder-error_red"
        : "border-cardBorder dark:border-dark_cardBorder"
    }
    w-full text-textPrimary border-[1.5px] dark:text-dark_textPrimary bg-background dark:bg-dark_background duration-150 ease-in-out rounded-md focus:outline-none
  `}
  classNamePrefix="cursor-pointer"
  closeMenuOnSelect={true}
/>

      {formik.touched[name] && formik.errors[name] && (
        <h3 className="text-xs text-error_red">{formik.errors[name]}</h3>
      )}
    </div>
  );
};

// export default SelectInput;
