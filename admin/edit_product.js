import {
  app,
  db,
  collection,
  getDocs,
  Timestamp,
  addDoc,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "../config/config.js";
// let idUser = localStorage.getItem("id");
// var actionFilter = document.getElementById('filter');
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
let id = getUrlParameter("id")
console.log(id)
// let getdata = query(collection(db, "product").doc("cEXyfguicsJwbDLrrgoE").get());
let ref = doc(db, 'product', id)
const querySnapshot = await getDoc(ref);
let my_data = querySnapshot._document.data.value.mapValue.fields
console.log(my_data)
let name_dom = document.getElementById("name")
name_dom.value = my_data.name.stringValue
let price_dom = document.getElementById("price")
price_dom.value = my_data.price.integerValue
let img_dom = document.getElementById("img")
img_dom.value = my_data.img.stringValue
let stock_dom = document.getElementById("stock")
stock_dom.value = my_data.stock.integerValue

let confirm_dom = document.getElementById("confirm")
confirm_dom.onclick = async ()=>{
  let ref = doc(db, 'product', id)
  await updateDoc(ref,{
    name: name_dom.value,
    price: parseInt(price_dom.value),
    img: img_dom.value,
    stock: parseInt(stock_dom.value),
  })
  window.alert("Bạn đã thay đổi thành công")
  location.replace("/admin/show_product.html");
}