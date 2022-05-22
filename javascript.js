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
} from "./config/config.js";
// let idUser = localStorage.getItem("id");
// var actionFilter = document.getElementById('filter');
let HtmlDom = document.getElementById('list-products')
let getdata = query(collection(db, "product"));
const querySnapshot = await getDocs(getdata);
console.log(querySnapshot)
let html = "<div class='container'><div class='row'>"
querySnapshot.docs.map(item=>{
    html +=
      '<div class="box-shoes">' +
      '<div class="shoes-picture">' +
      "<img src=" +
      item._document.data.value.mapValue.fields.img.stringValue +
      ' alt="">' +
      "</div>" +
      '<div class="shoes-content">' +
      '<a class="ps-shoe__name" href="detail-airjordan.html?id=' +
      item._document.key.path.segments[6] +
      '">' +
      item._document.data.value.mapValue.fields.name.stringValue +
      "</a>" +
      '<div class="ps-shoe__price"> Giá: ' +
      item._document.data.value.mapValue.fields.price.integerValue +" đ"+
      "</div>" + 
      '<div class="ps-shoe__price">Số lượng: ' +
      item._document.data.value.mapValue.fields.stock.integerValue +
      "</div>" + 
      "</div>" +
      "</div>";
    // console.log(item._document.key.path.segments[6])
})
html += "</div></div>"
HtmlDom.innerHTML = html