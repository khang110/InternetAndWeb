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
let idUser = localStorage.getItem("id");
if (idUser == null) {
  window.alert("Đăng nhập để xem giỏ hàng");
  location.replace("/login.html");
}
class RenderItem{
  constructor(name, price, quantity, img, id){
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.img = img;
    this.id = id
  }
}
let getdata = query(collection(db, "carts"), where("userID", "==", idUser));
const querySnapshot = await getDocs(getdata);
let listID = [];
let listDB = [];
let listData = [];
await querySnapshot.docs.map(function (ele) {
  listDB.push(ele.id);
  listID.push(ele._document.data.value.mapValue.fields.productID.stringValue);
});
let myArrayWithNoDuplicates = listID.reduce(function (accumulator, element) {
  if (accumulator.indexOf(element) === -1) {
    accumulator.push(element)
  }
  return accumulator
}, [])
let getdata_all_shose = query(collection(db, "product"));
const res = await getDocs(getdata_all_shose);
let all_shose_data = res.docs
console.log(all_shose_data)
myArrayWithNoDuplicates.map(item=>{
  let count = 0
  for(let i=0; i<listID.length; i++){
    if(listID[i] == item){
      count += 1
    }
  }
  for(let i=0; i<all_shose_data.length; i++){
    if(item == all_shose_data[i].id){
      let name = all_shose_data[i]._document.data.value.mapValue.fields.name.stringValue;
      let price = all_shose_data[i]._document.data.value.mapValue.fields.price.integerValue;
      let quantity = count;
      let img = all_shose_data[i]._document.data.value.mapValue.fields.img.stringValue;
      listData.push(new RenderItem(name, price, quantity, img, all_shose_data[i].id))
    }
  }
})

// listID.map(item=>{

// })
let data_render = []
// listID.map((item)=)
renderDataSomeProduct(listData);

let btn_pay = document.getElementById("payment")
btn_pay.onclick = ()=>{console.log("oke")}

async function renderDataSomeProduct(data) {
  var html1 = "";
  for (let i = 0; i < data.length; i++) {
    html1 +=
      '<div class="product_" id="' +
      i +
      ' value="' +
      i +
      '"">' +
      '<div div class="wrap-img-product" >' +
      '<img src = "' +
      data[i].img +
      '" class="image-shoes" />' +
      "</div>" +
      '<div class="info-product">' +
      '<div class="name">' +
      data[i].name +
      "</div>" +
      '<div class="size"> Size: <span style="color:rgb(0, 183, 255)"> &ensp;32</span></div>' +
      '<div class="size">Color: <span style="color:rgb(0, 183, 255)">White</span></div>' +
      '<div class="price_">Price: <span style="color:rgb(224, 0, 0)">599.000đ</span></div>' +
      '<div class="more-action"><span class="del" id="del0" ><button class="clickMe btn-warning" id=' +
      i +
      ">Xoá sản phẩm</button></span><span>Để mua sau</span></div>" +
      "</div>" +
      '<div class="price-quantity" style="margin-top:43px">' +
      '<div style="margin-right: 5px">' +
      '<div style="color: rgb(255, 0, 0)">'+data[i].price*0.9+'đ</div>' +
      '<div style="font-size: 15px"><del style="color:rgb(187, 187, 187)">'+data[i].price+'đ</del> | -10%</div>' +
      "</div>" +
      '<div style="margin-top: 10px" class="count-product-cart">' +
      '<button class="bt0 bt-0">-</button>' +
      '<input class="quantity quantity0" value="'+data[i].quantity+'" />' +
      '<button class="bt0 bt0_">+</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  $(".wrap-list-chosed").html(html1);
  let toalPrice = 0;
  data.map(item=>{
    toalPrice += item.price*item.quantity*0.9
  })
  console.log(toalPrice);
  $(".total-cost").html(toalPrice + " VND");
  $(".btt-pay").click(async function () {
    for(let j=0; j<data.length;j++){
      for(let i=0; i<listID.length;i++){
        if(listID[i] == data[j].id){
          var ref = doc(db, "carts", listDB[i]);
          await deleteDoc(ref)
        }
      }
    }
    window.alert("Đặt hàng thành công với số tiền "+ toalPrice+"đ");
    location.reload();
  });

  $(".clickMe").click(async function () {
    console.log(this.id);
    for(let i=0; i<listID.length;i++){
      if(listID[i] == data[this.id].id){
        var ref = doc(db, "carts", listDB[i]);
        await deleteDoc(ref)
      }
    }
    location.reload();
  });
}
