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
  $(".total-cost").html(toalPrice + " VND");
  $(".btt-pay").click(async function () {
    let bill_dom = document.getElementById("bill");
    let name_dom = document.getElementById("name");
    let phone_dom = document.getElementById("phone");
    let address_dom = document.getElementById("address");
    bill_dom.style.display = 'block';
    let html = "<div class='wrap-bill'>"
    html += "<div class='bill-title'> Hóa đơn thanh toán của bạn: </div>"
    html += "<div>Họ Tên: "+name_dom.value+"</div>"
    html += "<div>Số điện thoại: " 
    html += phone_dom.value 
    html += "</div>"
    html += "<div>Địa chỉ: " 
    html += address_dom.value 
    html += "</div>"
    html += "<div>Chi tiết đơn hàng: </div>"
    for (let i = 0; i < data.length; i++) {
      html += "<div>       " + data[i].name + " - " + data[i].quantity + " đôi </div>"
    }
    html += "<div> Tổng thanh toán: " + toalPrice +"đ</div>"
    html += "<button class='btn btn-success' style='padding-top: 10px' id='confirm-info'> Xác nhận </button>"
    html += "</div>"
    bill_dom.innerHTML = html
    let confirm_dom = document.getElementById("confirm-info")

    let all_product = query(collection(db, "product"));
    const all_product_result = await getDocs(all_product);
    let processed_data = []
    all_product_result.docs.map(item=>{
      processed_data.push([item.id, item._document.data.value.mapValue.fields.stock.integerValue])
    })
    confirm_dom.onclick = async()=>{
      for(let j=0; j<data.length;j++){
        for(let i=0; i<listID.length;i++){
          if(listID[i] == data[j].id){
            var ref = doc(db, "carts", listDB[i]);
            await deleteDoc(ref)
          }
        }
      }
      let temp = []
      for (let index = 0; index<data.length; index++){
        for (let j = 0; j<processed_data.length; j++){
          if (processed_data[j][0] == data[index].id){
            let ref = doc(db, 'product', data[index].id)
            await updateDoc(ref,{
              stock: parseInt(parseInt(processed_data[j][1])-parseInt(data[index].quantity))}
            )
          }
        }
        temp.push({
          product: data[index].id,
          quantity: data[index].quantity
        })
      }
      let my_data = {
        user_id: localStorage.getItem("id"),
        user_name: name_dom.value,
        phonenumber: phone_dom.value,
        address: address_dom.value,
        total_value: toalPrice,
        detail: temp
      }
      addDoc(collection(getFirestore(), "receipt"), my_data);
      location.reload();
    }
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
