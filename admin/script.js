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
//Đóng form
$("#close-form").click(function () {
    $("#form-edit").hide()
})
//create product
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
    addDoc(collection(getFirestore(), "receipt"), data).then((ref) => {
        if (ref.id){
            window.alert("Bạn đã thêm giày thành công")
            location.replace("/admin/index.html");
        }
    });
});