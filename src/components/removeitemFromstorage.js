export function removeFromStorage(name, data){
    var old =JSON.parse(localStorage.getItem(name)) || [];
    console.log(old);
    old = old.filter((item) => !(item.item.name === data.item.name && item.quantity === data.quantity)  );
    console.log("data",data)
    localStorage.setItem(name,JSON.stringify(old));
    if (old.length === 0) {
        localStorage.removeItem(name);
      }
      window.location.reload();
}
