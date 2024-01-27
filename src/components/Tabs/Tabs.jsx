export default function CustomSegmentedControl ({ options, value, onChange }) {
   return (
     <div className="flex border rounded">
       {options.map((option, index) => (
         <button
           key={index}
           className={`flex-grow p-2 ${value == option.value ? 'bg-blue-500 text-white' : ''}`}
           onClick={() => onChange(option.value)}
         >
           {option.label}
         </button>
       ))}
     </div>
   );
 };