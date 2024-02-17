import { 
   Skeleton,
   Card,
   Avatar,
   Form,
   Input,
   Button, 
   DatePicker
 } from 'antd';
import TextArea from 'antd/es/input/TextArea';
 
 const FormSkeleton = () => {
 
   return (
     <div className="relative flex flex-col justify-center min-h-screen overflow-x-hidden max-sm:block w-[40vw] max-md:w-full">
     
       <Card className="w-full p-6 m-auto bg-cardBg2 dark:bg-darkcardBg2 rounded-md shadow-xl sm:max-w-xl">
 
 
         <Form className='bg-cardBg2 dark:bg-darkcardBg2 text-text1 dark:text-text2' layout="vertical">
         <Form.Item className='bg-cardBg2 dark:bg-darkcardBg2 text-text1 dark:text-text2'>
           <Skeleton className='bg-cardBg2 dark:bg-darkcardBg2 text-text1 dark:text-text2' avatar active />
             <TextArea size="large"  disabled />
           </Form.Item> 
 
           <Form.Item className='bg-cardBg2 dark:bg-darkcardBg2 text-text1 dark:text-text2'>
             <Input size="large"  disabled />
           </Form.Item>
           <Form.Item className='bg-cardBg2 dark:bg-darkcardBg2 text-text1 dark:text-text2'>
             <Input size="large"  disabled />
           </Form.Item>

           <Form.Item className='bg-cardBg2 dark:bg-darkcardBg2 text-text1 dark:text-text2'>
             <Input size="large"  disabled />
           </Form.Item>
 
           <Form.Item>
             <Input size="large" disabled />
           </Form.Item>
 
           <Form.Item>  
             <DatePicker size="large" placeholder='' disabled />
           </Form.Item>
           
           <Button type="primary" shape="round" size="large" loading>
             
           </Button>
 
         </Form>
 
       </Card>
 
     </div>
   );
 }
 
 export default FormSkeleton;