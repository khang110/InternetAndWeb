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
    var productId = GetURLParameter("id"); // id produdct
    var dataCart = {
      userID: idUser,
      productID: productId,
    };
    await addDoc(ref, dataCart)
      .then(() => {
        window.alert("Thêm vào giỏ hàng thành công");
      })
      .catch((error) => {
        window.alert("errors" + error);
      });
  });
};
