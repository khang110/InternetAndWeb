import {
  collection,
  db,
  getDocs,
  query,
  where,
} from '../config/config.js';

let register = document.getElementById("btn-dn");
register.addEventListener("click", async function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  var data = {
    email: email,
    password: password,
  };
  let q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  var allData = await querySnapshot.docs.map(function (ele) {
    return ele;
  });
  if (allData == ""){
    window.alert("Tên đăng nhập không tồn tại")
  }else{
     
    let passwordData = allData[0]._document.data.value.mapValue.fields.password.stringValue
     if (passwordData == password){
        localStorage.setItem(
          "id",
          allData[0].id
        );
        location.replace("/index.html");


        // document.cookie = allData[0]._document.data.value.mapValue.fields;
     }else{
         window.alert("Sai mật khẩu");
     }
  }
});
