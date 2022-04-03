/* eslint-disable default-case */
import React, { useState } from "react";
import { storage } from "./../Firebase";
import db from "./../Firebase";
import { ref , uploadBytesResumable , getDownloadURL} from "firebase/storage";
import {doc, updateDoc, arrayUnion , setDoc} from "firebase/firestore";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [name, setname] = useState("");
  const [dis_price, setdis_price] = useState(0);
  const [org_price, setorg_price] = useState(0);
  const [prog, setprog] = useState(0);
  const [orderupdated, setorderupdated] = useState('');
  if(orderupdated === 'updated the order')
    {
        window.location.reload();
    }
  const onclickbtn =async () =>
  {
    const ref = doc(db, 'cakes', 'cakes');
    if(name === "" || url === "" || dis_price === 0 || org_price === 0)
    {
        alert("please check the values and check if image is loaded or not;");
    }
    else{
  // setDoc(ref,[{name : name,image : url , dis_price : dis_price , org_price :org_price}],{merge:true});
    await updateDoc(ref, {
        item: arrayUnion({name : name,image : url , dis_price : dis_price , org_price :org_price})
    }); 
}
    
  }

  const metadata = {
    contentType: 'image/jpeg'
  };
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const ref1 = ref(storage,`/images/${file.name}`);
    const uploadTask = uploadBytesResumable(ref1, file, metadata);
    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setprog(progress);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setURL(downloadURL);
    });
  }
);

  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>{ prog < 100 ? `upload ${prog} % done` :
      <img src={url} alt="" style={{width : '300px' , height : '300px'}} /> }
      <div>
      <input type="text" placeholder="name" onChange={(e)=>setname(e.target.value)} />
      <input type="text" placeholder="dis_price" onChange={(e)=>setdis_price(e.target.value)}/>
      <input type="text" placeholder = "org_price" onChange={(e)=>setorg_price(e.target.value)}/>
      </div>
      <button onClick={onclickbtn}>Submit</button>
    </div>
  );
}