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
if (idUser == null){
    window.alert("Đăng nhập để xem giỏ hàng")
    location.replace("/InternetAndWeb/login.html");

}
let getdata = query(collection(db, "carts"), where("userID", "==", idUser));
const querySnapshot = await getDocs(getdata);
let listID = [];
await querySnapshot.docs.map(function (ele) {
  listID.push(ele._document.data.value.mapValue.fields.productID.stringValue);
});
let listData = [];

for (var i = 0; i < listID.length; i++) {
  await $.ajax({
    url: "https://api.jsonbin.io/b/" + listID[i] + "/latest",
    method: "GET",
    headers: {
      "secret-key":
        "$2b$10$FylrR.yMvOFqIRfe2p8uGOkHAT19.v3Ex2bZBz9feDPpFyEcKSULO",
    },
    success: async function (res) {
      // renderDataSomeProduct(res);
      await listData.push(res);
    },
    error: function (err) {
      console.log(err);
    },
  });
}
renderDataSomeProduct(listData);

// function GetURLParameter(sParam) {
//   var sPageURL = window.location.search.substring(1);
//   var sURLVariables = sPageURL.split("&");
//   for (var i = 0; i < sURLVariables.length; i++) {
//     var sParameterName = sURLVariables[i].split("=");
//     if (sParameterName[0] == sParam) {
//       return sParameterName[1];
//     }
//   }
// }

function renderDataSomeProduct(data) {
  var html1 = "";
  for (i = 0; i < data.length; i++) {
    html1 +=
      '<div class="product_" id="pr0">' +
      '<div div class="wrap-img-product" >' +
      '<img src = "' +
      data[i][0]["img-url-1"] +
      '" class="image-shoes" />' +
      "</div>" +
      '<div class="info-product">' +
      '<div class="name">' +
      data[i][0]["name"] +
      "</div>" +
      '<div class="size"> Size: <span style="color:rgb(0, 183, 255)"> &ensp;32</span></ >' +
      '<div class="size">Color: <span style="color:rgb(0, 183, 255)">White</span></div>' +
      '<div class="price_">Price: <span style="color:rgb(224, 0, 0)">599.000đ</span></div>' +
      '<div class="more-action"><span class="del" id="del0">Xoá</span><span>Để mua sau</span></div>' +
      "</div>" +
      '<div class="price-quantity">' +
      '<div style="margin-right: 5px">' +
      '<div style="color: rgb(255, 0, 0)">599.000đ</div>' +
      '<div style="font-size: 15px"><del style="color:rgb(187, 187, 187)">799.000đ</del> | -14%</div>' +
      "</div>" +
      '<div style="margin-top: 10px" class="count-product-cart">' +
      '<button class="bt0 bt-0">-</button>' +
      '<input class="quantity quantity0" value="1" />' +
      '<button class="bt0 bt0_">+</button>' +
      "</div>" +
      "</div>" +
      "</div>"+
      "</div>";
  }
  $(".wrap-list-chosed").html(html1);
  let toalPrice = data.length * 599000;
  console.log(toalPrice)
  $(".total-cost").html(toalPrice + " VND");
 
}
 $(".btt-pay").click(function(){
   window.alert("Đặt hàng thành công")
 });
// $(".bt-0").click(function () {
//   if ($(".quantity0").val() > 0) {
//     let temp = $(".quantity0").val();
//     $(".quantity0").val(Number(temp) - 1);
//     calculating();
//   }
// });
// $(".bt0_").click(function () {
//   let temp = $(".quantity0").val();
//   $(".quantity0").val(Number(temp) + 1);
//   $(".total-cost").html(
//     String(
//       Number($(".quantity0").val()) * 599000 +
//         Number($(".quantity1").val()) * 599000 +
//         Number($(".quantity2").val()) * 599000 +
//         Number($(".quantity3").val()) * 599000
//     ) + "đ"
//   );
// });
// $(".bt-1").click(function () {
//   if ($(".quantity1").val() > 0) {
//     let temp = $(".quantity1").val();
//     $(".quantity1").val(Number(temp) - 1);
//     $(".total-cost").html(
//       String(
//         Number($(".quantity0").val()) * 599000 +
//           Number($(".quantity1").val()) * 599000 +
//           Number($(".quantity2").val()) * 599000 +
//           Number($(".quantity3").val()) * 599000
//       ) + "đ"
//     );
//   }
// });
// $(".bt1_").click(function () {
//   let temp = $(".quantity1").val();
//   $(".quantity1").val(Number(temp) + 1);
//   $(".total-cost").html(
//     String(
//       Number($(".quantity0").val()) * 599000 +
//         Number($(".quantity1").val()) * 599000 +
//         Number($(".quantity2").val()) * 599000 +
//         Number($(".quantity3").val()) * 599000
//     ) + "đ"
//   );
// });
// $(".bt-2").click(function () {
//   if ($(".quantity2").val() > 0) {
//     let temp = $(".quantity2").val();
//     $(".quantity2").val(Number(temp) - 1);
//     $(".total-cost").html(
//       String(
//         Number($(".quantity0").val()) * 599000 +
//           Number($(".quantity1").val()) * 599000 +
//           Number($(".quantity2").val()) * 599000 +
//           Number($(".quantity3").val()) * 599000
//       ) + "đ"
//     );
//   }
// });
// $(".bt2_").click(function () {
//   let temp = $(".quantity2").val();
//   $(".quantity2").val(Number(temp) + 1);
//   $(".total-cost").html(
//     String(
//       Number($(".quantity0").val()) * 599000 +
//         Number($(".quantity1").val()) * 599000 +
//         Number($(".quantity2").val()) * 599000 +
//         Number($(".quantity3").val()) * 599000
//     ) + "đ"
//   );
// });
// $(".bt-3").click(function () {
//   if ($(".quantity3").val() > 0) {
//     let temp = $(".quantity3").val();
//     $(".quantity3").val(Number(temp) - 1);
//     $(".total-cost").html(
//       String(
//         Number($(".quantity0").val()) * 599000 +
//           Number($(".quantity1").val()) * 599000 +
//           Number($(".quantity2").val()) * 599000 +
//           Number($(".quantity3").val()) * 599000
//       ) + "đ"
//     );
//   }
// });
// $(".bt3_").click(function () {
//   let temp = $(".quantity3").val();
//   $(".quantity3").val(Number(temp) + 1);
//   $(".total-cost").html(
//     String(
//       Number($(".quantity0").val()) * 599000 +
//         Number($(".quantity1").val()) * 599000 +
//         Number($(".quantity2").val()) * 599000 +
//         Number($(".quantity3").val()) * 599000
//     ) + "đ"
//   );
// });
// let temp = String(
//   Number($(".quantity0").val()) * 599000 +
//     Number($(".quantity1").val()) * 599000 +
//     Number($(".quantity2").val()) * 599000 +
//     Number($(".quantity3").val()) * 599000
// );
// $(".total-cost").html(temp + "đ");

// $("#del0").click(function () {
//   $("#pr0").css("display", "none");
//   $(".quantity0").val(0);
//   calculating();
// });
// $("#del1").click(function () {
//   $("#pr1").css("display", "none");
//   $(".quantity1").val(0);
//   calculating();
// });
// $("#del2").click(function () {
//   $("#pr2").css("display", "none");
//   $(".quantity2").val(0);
//   calculating();
// });
// $("#del3").click(function () {
//   $("#pr3").css("display", "none");
//   $(".quantity3").val(0);
//   calculating();
// });
