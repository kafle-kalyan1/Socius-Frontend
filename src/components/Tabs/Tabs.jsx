export default function CustomSegmentedControl ({ options, value, onChange }) {
   return (
     <div className="flex border rounded">
       {options.map((option, index) => (
         <button
           key={index}
           className={`flex gap-3 text-center justify-center flex-grow p-2 ${value == option.value ? 'bg-blue-500 text-text1 dark:text-text2' : 'text-text1 dark:text-text2'}`}
           onClick={() => onChange(option.value)}
         >
         {option?.icon}
           {option.label}
         </button>
       ))}
     </div>
   );
 };