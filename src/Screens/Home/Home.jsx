import Sidebar from '/src/components/Sidebar/Sidebar';
import ImageUploader from '/src/components/FileUploader/ImageUploader';
import { useFormik } from 'formik';

const Home = () => {
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  };

  const handleCameraAccess = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Handle the video stream
      })
      .catch((error) => {
        console.error("Error accessing the camera", error);
      });
  };

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='mx-3'>
        <ImageUploader formik={formik} title={"Please select Images"} name={"image"}/>
        <button className='bg-primary text-white px-4 py-2 rounded-md' onClick={formik.handleSubmit}>Upload Photo</button>
        <button className='bg-primary text-white px-4 py-2 rounded-md' onClick={handleLocation}>Get Location</button>
        <button className='bg-primary text-white px-4 py-2 rounded-md' onClick={handleCameraAccess}>Access Camera</button>
      </div>
    </div>
  );
};

export default Home;
