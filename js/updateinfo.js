let user = {};
let listProfile = [];
let indexProfile = null;
function getSessionUser() {
    user= JSON.parse(sessionStorage.getItem("userLogin"));
    getListProfile();
    if(checkId(user.id)) {
        form.fullname.value = listProfile[indexProfile].fullname;
        form.phone.value = listProfile[indexProfile].phone;
        form.date.value = listProfile[indexProfile].date;
        form.month.value = listProfile[indexProfile].month;
        form.year.value = listProfile[indexProfile].year;
        form.mail.value = listProfile[indexProfile].mail;
        form.country.value = listProfile[indexProfile].country;
        form.city.value = listProfile[indexProfile].city;
        form.district.value = listProfile[indexProfile].district;
        form.address.value = listProfile[indexProfile].address;
    }
}

 function getListProfile(){
    listProfile = JSON.parse(localStorage.getItem("listProfile"));
    if (listProfile == null) {
        listProfile = []
    }
 }   
function checkId(id){
    for(item in listProfile){
        if(listProfile[item].id == id){
            indexProfile = item
            return true;
        } 
    }
    return false;
}
function updateProfileUser() {
    
    var profileUser = {
        id:user.id,
        fullname: form.fullname.value,
        phone: form.phone.value,
        date: form.date.value,
        month: form.month.value,
        year: form.year.value,
        mail: form.mail.value,
        country: form.country.value,
        city: form.city.value,
        district: form.district.value,
        address: form.address.value
    }
    saveStorageProfile(profileUser);
   
}
function saveStorageProfile(profileUser){
    if(indexProfile ==  null){
        listProfile.push(profileUser);
    } else{
        listProfile[indexProfile] = profileUser
    }
    localStorage.setItem("listProfile", JSON.stringify(listProfile));
}