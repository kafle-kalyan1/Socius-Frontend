import React, { useState } from 'react';
import TextEditor from './TextEditor';
import Button  from '/src/components/Button/Button';
import { hideBigPopup } from '/src/components/BigPopup/BigPopup';

const CreatePost = () => {
   const [content, setContent] = useState('');

   return (
      <div className='flex flex-col m-auto w-4/5 h-4/5 bg-cardBg p-4 rounded-md'>
         <h1>Create Post</h1>
         <TextEditor
            content={content}
            setContent={setContent}
         />
         <div className='flex gap-3 justify-evenly'>
           <Button onClick={()=>{}} text={`<u>P</u>ost`} type='primary' />
           <Button onClick={()=>{}} text={`Preview`} type='txtPrimary' />
           <Button onClick={()=>{}} text={`Add Image`} type='secondary' />
           <Button onClick={()=>{hideBigPopup()}} text='Cancel' type='danger' />
         </div>
      </div>
   );
};

export default CreatePost;
