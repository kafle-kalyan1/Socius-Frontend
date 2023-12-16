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
     <div className="relative flex flex-col justify-center min-h-screen overflow-x-hidden max-sm:block">
     
       <Card className="w-full p-6 m-auto bg-white rounded-md shadow-xl sm:max-w-xl">
 
 
         <Form layout="vertical">
         <Form.Item>
           <Skeleton avatar active />
             <TextArea size="large"  disabled />
           </Form.Item> 
 
           <Form.Item>
             <Input size="large"  disabled />
           </Form.Item>
           <Form.Item>
             <Input size="large"  disabled />
           </Form.Item>

           <Form.Item>
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