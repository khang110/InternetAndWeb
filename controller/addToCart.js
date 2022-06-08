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
  doc,
  updateDoc,
} from "../config/config.js";
window.onload = function () {
  let register = document.getElementById("add-cart");
  let idUser = localStorage.getItem("id");
  var ref = collection(db, "carts");
  register.addEventListener("click", async function () {
    let value = document.getElementById("value")
    let quantity = parseInt(value.value)
    for(let i=0; i<quantity; i++){
      var productId = GetURLParameter("id"); // id produdct
      var dataCart = {
        userID: idUser,
        productID: productId,
      };
      await addDoc(ref, dataCart)
        .then(() => {
        })
        .catch((error) => {
          window.alert("errors" + error);
        });
    }
    window.alert("Thêm vào giỏ hàng thành công");
  });
};
