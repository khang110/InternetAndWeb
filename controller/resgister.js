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
} from "../config/config.js";
let register = document.getElementById("btn-dn");
register.addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("ten").value;
  var data = {
    email: email,
    password: password,
    fullname: name,
  };
  addDoc(collection(getFirestore(), "users"), data).then((ref) => {
    if (ref.id){
        window.alert("Bạn đã đăng kí thành công")
        location.replace("/InternetAndWeb/login.html");
    }
    // Added doc with ID:  ZzhIgLqELaoE3eSsOazu
  });
  // Get a list of cities from your database
});
