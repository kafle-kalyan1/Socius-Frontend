import React, { useState } from 'react'
import Button  from '/src/components/Button/Button';
import { hideBigPopup } from '/src/components/BigPopup/BigPopup';
import toast from 'react-hot-toast';
import APICall  from '/src/Library/API/APICall';
import { showModal } from '/src/components/Alert/Alert';

const ReportPopup = ({id}) => {
   const [reportReason, setReportReason] = useState("This Post is Spreading Hate.");
  return (
   <div className="w-[40vw] h-[40vh] text-text1 dark:text-text2 p-10">
   <h1 className=" text-xl text-center required:border-red-500">Report Post</h1>
   <text>Why are you reporting this post?</text>
   <textarea
     className="w-full min-h-32 h-32 bg-cardBg dark:bg-darkcardBg text-text1 dark:text-text2 p-2"
     placeholder="Enter your reason for reporting this post"
     value={reportReason}
     onChange={(e) => {setReportReason(e.target.value); console.log(reportReason)}}
   ></textarea>
  <div className="flex justify-center gap-10">
  <Button 
  disabled={reportReason.length < 1}
   onClick={() => showModal({
title: "Report",
type : "error",
message: `Are you sure you want to report this post?`,
buttons: [
 {
   title: "Report",
   onclick: () => {
     APICall("/api/posts/reportPost/","POST",{"post_id": id, report_reason:reportReason}).then(response => {
       if(response.status == 200){
         toast.success(`Post reported`);
         hideBigPopup("reportPost");
       }
       else{
         toast.error("something went wrong!")
       }
     })
   }
 },
 {
   title: "Cancel",
   onclick: () => {
     console.log("Cancel")
   }
 }
]
})}
   type="danger"
   text="Report"
   />
   <Button
   onClick={() => hideBigPopup("reportPost")}
   type="secondary"
   text="Cancel"
   />
  </div>
 </div>
   )
}

export default ReportPopup