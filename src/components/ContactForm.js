/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import firebase from "../Firebase";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
function ContactForm() {
  const [name, setname] = useState("");
  console.log(name);
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [msg, setmsg] = useState("");
  const [delivery, setdelivery] = useState("Delivery")
  let email1 = localStorage.getItem("user") || "";
  React.useEffect(async () => {
    const q = query(collection(firebase, "contact"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.id === email1) {
        setname(doc.data().name);
        setaddress(doc.data().address);
        setmobile(doc.data().mobile);
      }
    });
  }, []);
 const  changedrop = async (e) => {
     await setdelivery(e.target.value);
  }
  onsubmit = async (e) => {
    let orders = localStorage.getItem("orders") || "";
    orders = JSON.parse(orders);
    if (
      name === "" ||
      mobile === "" ||
      address === "" ||
      msg === "" ||
      orders === "" ||
      orders.length === 0
    ) {
      alert("Please fill all the fields");
    } else {
      //let put_addres =JSON.parse({name : name, mobile : mobile,address : address,msg : msg})
      //localStorage.setItem("address", ({name : name, mobile : mobile,address : address,msg : msg}))
      const ref = doc(firebase, "contact", email1);
      // let contact = localStorage.getItem("address") || "";
      //console.log("contact",contact);
      await setDoc(
        ref,
        { name: name, mobile: mobile, address: address, msg: msg , delivery : delivery},
        { merge: true }
      );
      // const ref1 = doc(firebase, "live-orders", email1)
      // await setDoc(ref1,{name : name , mobile : mobile , address : address , msg : msg  },{merge:true})
      const ref2 = await addDoc(
        collection(firebase, "live-orders"),
        {
          name: name,
          email: email1,
          time: new Date(),
          mobile: mobile,
          address: address,
          msg: msg,
          orders: orders,
          status: "new",
          isDelivered: false,
        },
        { merge: true }
      );
      // const ref3  = doc(firebase, "
      localStorage.removeItem("orders");

      setInterval(() => (window.location.href = "/success"), 800);
    }
  };

  return (
    <div
      style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        border : '2px black solid',
        borderRadius : '0.5rem',
        width : '100%',
        height : '100%'
      }}
    >
      <form className="form-group">
      <h3 style={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
      }}>Enter your contact details</h3>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          id="name"
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />
        <label htmlFor="email">Mobile</label>
        <input
          type="mobile"
          className="form-control"
          id="email"
          value={mobile}
          placeholder="Enter your mobile"
          onChange={(e) => setmobile(e.target.value)}
        />
        <label htmlFor="message">Address</label>
        <textarea
          className="form-control"
          id="message"
          value={address}
          rows="3"
          placeholder="enter your address"
          onChange={(e) => setaddress(e.target.value)}
        ></textarea>
        <label htmlFor="message">Message on Cake</label>
        <textarea
          className="form-control"
          id="message"
          rows="3"
          placeholder="Text to be written on Cake"
          onChange={(e) => setmsg(e.target.value)}
        ></textarea>
        <form style={{padding : '1rem' }}>
          <label > Delivery Mode </label>
          <select onChange={changedrop}>
            <option value="Delivery" onClick={()=>setdelivery("Delivery")}>Delivery</option>
            <option value="Pick up from bakery" onClick={()=>setdelivery("Pick up from bakery")}> Pick up from bakery</option>
          </select>
        </form>
        <button type="button" style={{paddding : '1rem' ,margin : '1rem'}} onClick={onsubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
