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
let HtmlDom = document.getElementById('container-product')
let getdata = query(collection(db, "product"));
const querySnapshot = await getDocs(getdata);
let html = "<div class='container'><div class='row'>"
querySnapshot.docs.map(item=>{
    html += '<div class="card col-4"><img src="' 
    html += item._document.data.value.mapValue.fields.img.stringValue
    html += '" class="card-img-top" style="height: 350px!important"><div class="card-body"><h5 class="card-title">'
    html += item._document.data.value.mapValue.fields.name.stringValue
    html += '</h5><p class="card-text">'
    html += 'Đơn giá: '
    html += item._document.data.value.mapValue.fields.price.integerValue
    html += ' đ</p>'
    html += '<p class="card-text">'
    html += 'Hàng trong kho: '
    html += item._document.data.value.mapValue.fields.stock.integerValue
    html += ' đôi</p>'
    html += '<div style="display: flex">'
    html += '<a href="#" class="btn btn-danger" id="'+item._document.key.path.segments[6]+'" name="delete">Xóa sản phẩm</a>'
    html += '<a href="./edit_product.html?id='+item.id+'" class="btn btn-warning" style="margin-left: 10px">Sửa thông tin</a></div></div>'
    html += '</div>'
    // console.log(item._document.key.path.segments[6])
})
html += "</div></div>"
HtmlDom.innerHTML = html
let btn = document.getElementsByName("delete")
async function test(data){
    const ref = doc(db, "product", data)
    deleteDoc(ref).then(()=>{document.location.reload(true)});
    // console.log(cityRef)
}
for (let i=0; i<btn.length; i++){
    btn[i].onclick = ()=>test(btn[i].id)   
}
// btn.onclick = ()=>test(btn.value);
// let container_product = document.getElementById("container-product");
// let listData = [];
