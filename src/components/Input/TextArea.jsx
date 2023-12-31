
const TextArea = (props) => {
   const { formik, Icon, title, name, ref_, rows, cols } = props;
 
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
       <span className="flex w-full">
         <textarea
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
           rows={rows}
           cols={cols}
           className={`block w-full px-4 py-2 mt-2 text-textPrimary dark:text-dark_textPrimary bg-background dark:bg-dark_background border-2 rounded-md focus:outline-primary_text border-cardBorder dark:border-dark_cardBorder hover:border-primary_text
    ${
      formik.touched[name] && formik.errors[name]
        ? "border-red_text placeholder-red_text"
        : "outline-cardBorder dark:outline-dark_cardBorder"
    }`}
         />
       </span>
       {formik.touched[name] &&
       formik.errors[name] &&
       formik.values[name] !== "" ? (
         <h3 className="text-xs text-red_text">{formik.errors[name]}</h3>
       ) : null}
     </div>
   );
 };
 
 TextArea.defaultProps = {
   rows: 4,
   cols: 40, 
 };
 
 export default TextArea;
 