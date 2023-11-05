/* eslint-disable react/prop-types */

const Input = (props) => {
  const { formik, Icon, title, type, otherState, btn1, btn2, name, ref_ } =
    props;
 

  if (otherState) {
    var { state, setState } = otherState;
  }
  if (btn1) {
    var { icon1, text1, action1 } = btn1;
  }
  if (btn2) {
    var { icon2, text2, action2 } = btn2;
  }
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
      <span className="w-full">
        <input
          type={type}
          name={name}
          ref={ref_}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={
            formik.touched[name] && formik.errors[name]
              ? `${title} is required`
              : `${title}`
          }
          className={`flex w-full px-4 py-2 mt-2 text-textPrimary dark:text-dark_textPrimary bg-background dark:bg-dark_background border-2 rounded-md font-mono  focus:outline-primary border-cardBorder dark:border-dark_cardBorder hover:border-primary flex
   ${
     formik.touched[name] && formik.errors[name]
       ? " border-error_red placeholder-error_red"
       : "outline-cardBorder dark:outline-dark_cardBorder"
   }`}
        />

        {btn1 || btn2 ? (
          <span
            className="w-6 h-7 cursor-pointer -mt-8 ml-1 transition block float-right duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => action1()}
            title={!state ? text1 : text2}
          >
            {!state ? icon1 : icon2}
          </span>
        ) : null}
      </span>
      {formik.touched[name] &&
      formik.errors[name] &&
      formik.values[name] != "" ? (
        <h3 className="text-xs text-error_red">{formik.errors[name]}</h3>
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
