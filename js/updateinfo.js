var db = firebase.firestore();
let user = {};
let id = ""
function getSessionUser() {
   getUserLogged().then(user=>{
       id = user.uid
       getDocFromCollection("Profile",user.uid)
       .then(data=>{
            
            form.date.value = data.date;
            form.month.value = data.month;
            form.year.value = data.year;
            form.country.value = data.country;
            form.city.value = data.city;
            form.district.value = data.district;
            form.address.value = data.address;
            form.gender.value = data.gender;
            form.status.value = data.status;
            console.log(data);
       })
       .catch(error=>{
        console.error("Error writing document: ", error);
       })
       
   })
}
function getUserLogged() {
   return new Promise((resove,reject)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resove(user);
        } else {
           reject("NAN");
        }
      });
   })
}
function getDocFromCollection(nameCollection,id) {
    return new Promise((resove,reject)=>{
        var ref = db.collection(nameCollection).doc(id)
    ref.get().then(function(doc) {
        if (doc.exists) {
            resove(doc.data());
        } else {
            reject("No such document!");
        }
    }).catch(function(error) {
        reject("Error getting document:", error);
    });
    })
}



function updateProfileUser() {
    
    db.collection("Profile").doc(id).update( {
        birthday: form.date.value + "/" + form.month.value + "/" + form.year.value,
        date: form.date.value,
        month: form.month.value,
        year: form.year.value,
        country: form.country.value,
        city: form.city.value,
        district: form.district.value,
        address: form.address.value,
        gender: form.gender.value,
        status: form.status.value
    })
    .then(function(){
        document.location.href = "http://127.0.0.1:5503/html/user/updateinfo.html";
    })
    .catch(function(error){
        console.error("Error writing document: ", error);
    });
    
   
}
