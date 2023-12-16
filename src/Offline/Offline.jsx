import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

console.log("It's running")
alert("okk")
const OfflineApp = () => {
  const [db, setDb] = useState(null);

  const storeImageInIndexedDB = (imgData) => {
    const request = indexedDB.open('imageDB', 1);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = function(event) {
      setDb(event.target.result);
      const transaction = db.transaction(['images'], 'readwrite');
      const objectStore = transaction.objectStore('images');
      objectStore.add({ image: imgData });
    };

    request.onerror = function(event) {
      console.error('Database error: ', event.target.errorCode);
    };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        storeImageInIndexedDB(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundColor: '#f44336', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '2rem' }}>You&apos;re Offline</h1>
      {/* Your SVG can go here */}
      <input type="file" id="imageUploader" accept="image/*" onChange={handleFileUpload} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
<OfflineApp />
</React.StrictMode>
);