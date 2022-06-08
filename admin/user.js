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
// let idUser = localStorage.getItem("id");
// var actionFilter = document.getElementById('filter');
let HtmlDom = document.getElementById('my_table')
let getdata = query(collection(db, "users"));
const querySnapshot_user = await getDocs(getdata);

let getdata_cart = query(collection(db, "carts"));
const querySnapshot_cart = await getDocs(getdata_cart);

console.log(querySnapshot_cart.docs)
console.log(querySnapshot_user.docs)
let all_html = '<thead><tr><th scope="col" style="width: 3%">#</th><th scope="col" style="width: 10%">Avatar</th><th scope="col" style="width: 10%">Name</th><th scope="col" style="width: 20%">E-Mail</th><th scope="col" style="width: 20%">Password</th><th scope="col" style="width: 20%">Cart</th></tr></thead>'
let my_html = '<tbody>'
for(let i=0; i<querySnapshot_user.docs.length; i++){
    let html = '<tr><th scope="row">'+i+'</th><td><img src="https://www.interlinecenter.com/wp-content/uploads/2016/10/dummy-user-img.png" class="avatar-user"/></td><td><div class="name_user">'
    html += querySnapshot_user.docs[i]._document.data.value.mapValue.fields.fullname.stringValue + '</div></td><td><span class="name_user">'
    html += querySnapshot_user.docs[i]._document.data.value.mapValue.fields.email.stringValue + '</span></td><td><div class="name_user">'
    html += '******' +'</div></td>'
    html += '<td><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Product id</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    for(let j = 0; j<querySnapshot_cart.docs.length; j++){
        if(querySnapshot_cart.docs[j]._document.data.value.mapValue.fields.userID.stringValue == querySnapshot_user.docs[i].id){
            html += '<a class="dropdown-item" href="#">'
            html += querySnapshot_cart.docs[j]._document.data.value.mapValue.fields.productID.stringValue
            html += '</a>'
        }
    }
    html += '</div>'
    html += '</div>'
    html += '</td>'
    html += '</tr>'
    my_html += html
}
my_html += '</tbody>'
all_html += my_html
HtmlDom.innerHTML = all_html






