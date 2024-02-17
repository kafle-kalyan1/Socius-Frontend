
const TextArea = (props) => {
   const { formik, Icon, title, name, ref_, rows, cols,showTitle=true } = props;
 
   return (
     <div className="mb-2">
       { showTitle &&  <span className="flex text-text1 dark:text-text2">
         {Icon}
         <label
           htmlFor={name}
           className="block ml-3 text-sm font-semibold text-text1 dark:text-text2 tracking-widest"
         >
           {title}
         </label>
       </span>
       }
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
           className={`w-full px-4 py-2 mt-2 text-text1 dark:text-text2 bg-background dark:bg-darkcardBorder border-2 rounded-md font-mono  border-cardBorder dark:border-dark_cardBorder hover:border-main_text flex
    ${
      formik.touched[name] && formik.errors[name]
       ? " border-red_text placeholder-red_text"
       : "outline-cardBorder focus:outline-main_text dark:outline-dark_cardBorder"
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
 