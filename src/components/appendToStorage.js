export function appendToStorage(name, data){
    var old =JSON.parse(localStorage.getItem(name));
    if(old === null) old = [];
    old.push(data);
    localStorage.setItem(name,JSON.stringify(old));
}
