
import React from 'react';
import Button from '../Button/Button';
import { showModal } from '../Alert/Alert';
import Title from 'antd/es/skeleton/Title';

const FriendRecommendation = () => {
  return (
    <div className="w-full bg-cardBg  border border-red-400 p-4">
      <div className="flex items-center mb-4">
        <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1493612276216-ee3925520721" alt="Friend 1" />
        <div className='w-full'>
          <h4 className="text-lg font-semibold">Friend 1</h4>
          <p className="text-gray-500">Friend's From: City 1</p>
        </div>
        <div className='flex justify-end w-full'>
        <Button text="Unfriend" type="txtDanger" width={1/2} onClick={()=> showModal({type:"error",title:"Unfriend?"
        , buttons:[{title:"Yes", onclick:()=>console.log("yes")}, {title:"No", onclick:()=>console.log("no")}], message:"Are you sure you want to unfriend this person?"
        , outSideAction:true, closeButton:()=>{console.log("close")}, hideDisabled:true


        })} />
        </div>
        
      </div>
      <div className="flex items-center mb-4">
        <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1493612276216-ee3925520721" alt="Friend 1" />
        <div className='w-full'>
          <h4 className="text-lg font-semibold">Friend 1</h4>
          <p className="text-gray-500">Friend's From: City 1</p>
        </div>
        <div className='flex justify-end w-full'>
        <Button text="Unfriend" type="txtDanger" width={1/2} />
        </div>
        
      </div><div className="flex items-center mb-4">
        <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1493612276216-ee3925520721" alt="Friend 1" />
        <div className='w-full'>
          <h4 className="text-lg font-semibold">Friend 1</h4>
          <p className="text-gray-500">Friend's From: City 1</p>
        </div>
        <div className='flex justify-end w-full'>
        <Button text="Unfriend" type="txtDanger" width={1/2} />
        </div>
        
      </div><div className="flex items-center mb-4">
        <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1493612276216-ee3925520721" alt="Friend 1" />
        <div className='w-full'>
          <h4 className="text-lg font-semibold">Friend 1</h4>
          <p className="text-gray-500">Friend's From: City 1</p>
        </div>
        <div className='flex justify-end w-full'>
        <Button text="Unfriend" type="txtDanger" width={1/2} />
        </div>
        
      </div><div className="flex items-center mb-4">
        <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1493612276216-ee3925520721" alt="Friend 1" />
        <div className='w-full'>
          <h4 className="text-lg font-semibold">Friend 1</h4>
          <p className="text-gray-500">Friend's From: City 1</p>
        </div>
        <div className='flex justify-end w-full'>
        <Button text="Unfriend" type="txtDanger" width={1/2} />
        </div>
        
      </div><div className="flex items-center mb-4">
        <img className="w-10 h-10 rounded-full mr-4" src="https://images.unsplash.com/photo-1493612276216-ee3925520721" alt="Friend 1" />
        <div className='w-full'>
          <h4 className="text-lg font-semibold">Friend 1</h4>
          <p className="text-gray-500">Friend's From: City 1</p>
        </div>
        <div className='flex justify-end w-full'>
        <Button text="Unfriend" type="txtDanger" width={1/2} />
        </div>
        
      </div>
    </div>
  );
};

export default FriendRecommendation;
