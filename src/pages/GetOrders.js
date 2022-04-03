/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  query,
  where,
  orderBy,
  doc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Firebase from "../Firebase";

function GetOrders() {
  const [orders, setorders] = React.useState([]);

  React.useEffect(async () => {
    const q = query(
      collection(Firebase, "live-orders"),
      where("status", "==", "new")
    );
    const querySnapshot = await getDocs(q);
    let da = [];
    querySnapshot.forEach((doc) => {
      da.push({ id: doc.id, item: doc.data() });
    });
    setorders(da);
  }, []);
  console.log(orders);
  return (
    <div>
      {orders.length}
      {orders.length > 0 &&
        orders.map((order, index) => {
          return (
            <div key={index}>
              {order.id}
              <div>
                {order.item.orders.map((i, index) => {
                  return (
                    <div>
                      <div><b >Name:</b> {i.item.name}</div>
                      <div><b>Kgs:</b> {i.quantity}</div>
                      <div><b>Price per 1/2 kg:</b> {i.item.dis_price} </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default GetOrders;
