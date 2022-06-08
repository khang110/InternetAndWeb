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
let id = GetURLParameter("id")
let HtmlDom = document.getElementById('detail-container')
// let getdata = query(collection(db, "product").doc("cEXyfguicsJwbDLrrgoE").get());
let ref = doc(db, 'product', id)
const querySnapshot = await getDoc(ref);
let my_data = querySnapshot._document.data.value.mapValue.fields
let data = [1]
var temp = ""
var html1 =
    '<div class="col-lg-6 col-md-12 col-sm-12">' +
    '<div class="slider-for">' +
    '<div class="item">' +
    '<img src="' + my_data.img.stringValue + '" style="height: 480px" alt="">' +
    '</div>'+
    '</div>' +
    '<div class="slider-nav">' +
    '<div class="item margin-right">' +
    '<img class="img-child" src="' + data[0]["img-url-1"] + '" alt="">' +
    '</div>' +
    '<div class="item margin-right">' +
    '<img class="img-child" src="' + data[0]["img-url-2"] + '" alt="">' +
    '</div>' +
    '<div class="item margin-right">' +
    '<img class="img-child" src="' + data[0]["img-url-3"] + '" alt="">' +
    '</div>' +
    '<div class="item margin-right">' +
    '<img class="img-child" src="' + data[0]["img-url-4"] + '" alt="">' +
    '</div>' +
    '<div class="item margin-right">' +
    '<img class="img-child" src="' + data[0]["img-url-5"] + '" alt="">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="col-lg-6 col-md-12 col-sm-12">' +
    '<div class="product-info">' +
    '<h1 class="info-header">' + my_data.name.stringValue + '</h1>' +
    '<p class="product-category">' +
    'Mã SP: ' +
    '<strong>' + id + '</strong>' +
    '<h3 class="product-price">'+ my_data.price.integerValue+' VNĐ</h3>' +
    '</p>' +
    '<div class="product-size">' +
    '<span class="choose-size">+Chọn size</span>' +
    '<ul class="wraper-size">' + temp +
    // '<li class="size">N-US 7 | 40</li>'+
    // '<li class="size">N-US 9 | 42.5</li>'+
    '</ul>' +
    '</div>' +
    '<div class="amount">' +
    '<div class="block-amount">' +
    '<input id="sub" type="button" value="-">' +
    '<input id="value" value="0" style="width: 30px;padding-left: 7px;"></input>' +
    '<input id="sum" type="button" value="+">' +
    '</div>' +
    '</div>' +
    '<div class="button-buy-add">' +
    '<div class="row">' +
    '<div class="col-6">' +
    '<div class="product-shopping-add">' +
    '<button id="add-cart">Thêm vào giỏ hàng</button>' +
    '</div>' +
    '</div>' +
    '<div class="col-6">' +
    '<div class="product-shopping-buy">' +
    '<a href="Cart/index.html"><button id="buy-now">Mua ngay</button></a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="block-phone">' +
    '<span class="text">Hoặc đặt mua: </span>' +
    '<a href="tel: 0971037601" title="Tư vấn đặt hàng: 0971037601">0971037601</a>' +
    '</div>' +
    '<div class="block-phone freeship">' +
    '<strong>Freeship</strong> tại khu vực Hồ Chí Minh' +
    '</div>' +
    '</div>' +
    '</div>';
HtmlDom.innerHTML =html1
let sum_btn =  document.getElementById("sum")
let sub_btn =  document.getElementById("sub")
let value = document.getElementById("value")
console.log(my_data.stock)
sum_btn.addEventListener("click", function () {
  let current_value = parseInt(value.value)
  if(current_value < my_data.stock.integerValue){
    current_value = current_value + 1
    value.value = current_value
  }
})
sub_btn.addEventListener("click", function () {
  let current_value = parseInt(value.value)
  if(current_value !=0){
    current_value = current_value - 1
    value.value = current_value
  }
})