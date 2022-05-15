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
  getFirestore,
  onSnapshot,
  getDoc,
  doc,
} from "../config/config.js";
let getdata = query(collection(db,"products"),where("type","==","air-jodan"))
  const querySnapshot = await getDocs(getdata);
  var allData = await querySnapshot.docs.map(function (ele) {
    return ele;
  });
  renderData(allData);
 
// // let register = document.getElementById("list-products");
// const node = document.createElement("li");

// // Create a text node:
// const textnode = document.createTextNode("Water");

// // Append the text node to the "li" node:
// node.appendChild(textnode);

// // Append the "li" node to the list:
// document.getElementById("list-products").appendChild(node);

// $.ajax({
//     url: "https://api.jsonbin.io/b/5f3b62f9b88c04101cf62c5a/latest",
//     method: "GET",
//     headers: {
//       "secret-key":
//         "$2b$10$FylrR.yMvOFqIRfe2p8uGOkHAT19.v3Ex2bZBz9feDPpFyEcKSULO",
//     },
//     success: function (res) {
//       renderData(res);
//     },
//     error: function (err) {
//       console.log(err);
//     },
// });
  


function renderData(data) {
  var html = "";

  for (var i = 0; i < data.length; i++) {
    console.log(data[i].id);
    console.log(data[i]._document.data.value.mapValue.fields.img_url.stringValue)
    console.log(data[i]._document.data.value.mapValue.fields.name.stringValue);
    console.log(data[i]._document.data.value.mapValue.fields.price.stringValue);
    html +=
      '<div class="box-shoes">' +
      '<div class="shoes-picture">' +
      "<img src=" +
      data[i]._document.data.value.mapValue.fields.img_url.stringValue +
      ' alt="">' +
      "</div>" +
      '<div class="shoes-content">' +
      '<a class="ps-shoe__name" href="detail-airjordan.html?id=' +
      data[i].id +
      '">' +
      data[i]._document.data.value.mapValue.fields.name.stringValue +
      "</a>" +
      '<span class="ps-shoe__price">' +
      data[i]._document.data.value.mapValue.fields.price.stringValue +
      "</span>" +
      "</div>" +
      "</div>";
  }
  $(".left-list-jordan").html(html);
}
