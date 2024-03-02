alert("Here!!!!!");
document.getElementById('uploadButton').addEventListener('click', () => {
 
   savePostOnIndexedDB();

 });
 
 function savePostOnIndexedDB() {
   // save post on indexedDB
   let db;
   let request = indexedDB.open("offlinePosts", 1);
 
   request.onupgradeneeded = function(event) {
     db = event.target.result;
     let objectStore = db.createObjectStore("posts", { autoIncrement: true });
     objectStore.createIndex("text", "text", { unique: false });
     objectStore.createIndex("image", "image", { unique: false });
     objectStore.createIndex("created", "created", { unique: false });
   };
 
   request.onsuccess = function(event) {
     db = event.target.result;
 
     let text = document.querySelector("textarea").value;
     let image = document.querySelector("input[type=file]").files[0];
     let created = new Date();
 
     let transaction = db.transaction(["posts"], "readwrite");
     let objectStore = transaction.objectStore("posts");
     let request2 = objectStore.add({ text, image, created });
 
     request2.onsuccess = function(event) {
       console.log("Post saved successfully.");
     };
   };
 }

 const self = this;