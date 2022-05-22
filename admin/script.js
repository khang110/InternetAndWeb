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
var actionFilter = document.getElementById('filter');
let data = []
console.log("heheh")
//Đóng form
$("#close-form").click(function () {
    $("#form-edit").hide()
})
//create product
console.log("oke")
let register = document.getElementById("addBook");
register.addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let price = parseInt(document.getElementById("price").value);
    let img = document.getElementById("img").value;
    let stock = parseInt(document.getElementById("stock").value);
    var data = {
    name: name,
    price: price,
    img: img,
    stock: stock
    };
    addDoc(collection(getFirestore(), "product"), data).then((ref) => {
    if (ref.id){
        window.alert("Bạn đã thêm giày thành công")
        location.replace("/admin/index.html");
    }
    // Added doc with ID:  ZzhIgLqELaoE3eSsOazu
    });
    // Get a list of cities from your database
});
//show product

// let container_product = document.getElementById("container-product");
// if container_product{
//     let listData = [];
//     console.log("oke")
//     for (var i = 0; i < listID.length; i++) {
//     await $.ajax({
//         url: "https://api.jsonbin.io/b/" + listID[i] + "/latest",
//         method: "GET",
//         headers: {
//         "secret-key":
//             "$2b$10$FylrR.yMvOFqIRfe2p8uGOkHAT19.v3Ex2bZBz9feDPpFyEcKSULO",
//         },
//         success: async function (res) {
//         // renderDataSomeProduct(res);
//         await listData.push(res);
//         },
//         error: function (err) {
//         console.log(err);
//         },
//     });
//     }
// }

