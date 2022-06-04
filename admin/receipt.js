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
let getdata = query(collection(db, "receipt"));
const querySnapshot_user = await getDocs(getdata);

let getdata_cart = query(collection(db, "receipt"));
const querySnapshot_cart = await getDocs(getdata_cart);

let all_html = '<thead><tr><th scope="col" style="width: 3%">#</th><th scope="col" style="width: 10%">Name</th><th scope="col" style="width: 10%">PhoneNumber</th><th scope="col" style="width: 20%">Address</th><th scope="col" style="width: 10%">Price</th><th scope="col" style="width: 20%">Detail</th><th scope="col" style="width: 20%">Action</th></tr></thead>'
let my_html = '<tbody>'
for(let i=0; i<querySnapshot_user.docs.length; i++){
    let html = '<tr><th scope="row">'+i+'</th><td><div class="name_user">'
    html += querySnapshot_user.docs[i]._document.data.value.mapValue.fields.user_name.stringValue + '</div></td><td><span class="name_user">'
    html += querySnapshot_user.docs[i]._document.data.value.mapValue.fields.phonenumber.stringValue + '</span></td><td><div class="name_user">'
    html += querySnapshot_user.docs[i]._document.data.value.mapValue.fields.address.stringValue +'</div></td><td><span class="name_user">'
    html += querySnapshot_user.docs[i]._document.data.value.mapValue.fields.total_value.integerValue +'</div></td>'
    html += '<td><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Products</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">'
    for(let j = 0; j<querySnapshot_user.docs[i]._document.data.value.mapValue.fields.detail.arrayValue.values.length; j++){
        html += '<a class="dropdown-item" href="#">'
        html += querySnapshot_user.docs[i]._document.data.value.mapValue.fields.detail.arrayValue.values[j].mapValue.fields.product.stringValue + ": " + querySnapshot_user.docs[i]._document.data.value.mapValue.fields.detail.arrayValue.values[j].mapValue.fields.quantity.integerValue + " đôi"
        html += '</a>'
    }
    html += '</div>'
    html += '</div>'
    html += '</td>'
    html += '<td>'
    html += '<button type="button" class="btn btn-danger" name="accept" id="' +querySnapshot_user.docs[i].id + '">Reject</button>'
    html += '<button type="button" class="btn btn-success" name="accept" id="' +querySnapshot_user.docs[i].id +'" style="margin-left: 20px">Accept</button>'
    html += '</div>'
    html += '</tr>'
    my_html += html
}
async function test(data){
    const ref = doc(db, "receipt", data)
    deleteDoc(ref).then(()=>{document.location.reload(true)});
}

my_html += '</tbody>'
all_html += my_html
HtmlDom.innerHTML = all_html

let btn_accept = document.getElementsByName("accept")
for (let i = 0; i< btn_accept.length; i++){
    btn_accept[i].onclick = ()=>{
        test(btn_accept[i].id)
    }
}




