addSelectJobs();
addSelectLocation();
var db = firebase.firestore();
let listTemp = [];
let liststatus = [];
/* Placeholder Typewriter */
var placeholderText = [
    "Nhập tiêu đề công việc mà bạn muốn...",
    "Vị trí công việc...",
    "Địa điểm làm việc...",
    "Mức lương mong muốn..."
];
$('#search').placeholderTypewriter({
    text: placeholderText,
});

function addSelectJobs() {
    let jobs = [
        "Y tế",
        "Nông nghiệp",
        "Công nghiệp",
        "Xây dựng",
        "Khai thác",
        "Dịch vụ",
        "Văn phòng",
    ];
    let row = jobs.map((e) => {
        return `<option value="${e}">${e}</option>`;
    });
    document.getElementById("jobs").innerHTML += row.join(" ");
}

function addSelectLocation() {
    let locations = [
        "Thanh Hóa",
        "Nghệ An",
        "Hà Tĩnh",
        "Quảng Bình",
        "Quảng Trị",
        "Thừa Thiên-Huế",
        "Cần Thơ",
        "Đà Nẵng",
        "Quảng Nam",
        "Quảng Ngãi",
        "Bình Định",
        "Phú Yên",
        "Khánh Hòa",
        "Ninh Thuận",
        "Bình Thuận",
        "Kon Tum",
        "Gia Lai",
        "Đắk Lắk",
        "Đắc Nông",
        "Lâm Đồng",
        "Bình Phước",
        "Bình Dương",
        "Đồng Nai",
        "Tây Ninh",
        "Bà Rịa-Vũng Tàu",
        "Hồ Chí Minh",
        "Long An",
        "Đồng Tháp",
        "Tiền Giang",
        "An Giang",
        "Bến Tre",
        "Vĩnh Long",
        "Trà Vinh",
        "Hậu Giang",
        "Kiên Giang",
        "Sóc Trăng",
        "Bạc Liêu",
        "Cà Mau",
        "Hà Nội",
    ];
    let row = locations.map((e) => {
        return `<option value="${e}">${e}</option>`;
    });
    document.getElementById("locations").innerHTML += row.join(" ");
}

function getJob() {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs")
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary,
                        status: doc.data().status
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}

function jobSearchByStatus(status) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs").where("status", "==", status)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary,
                        status: doc.data().status
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}


function loadDataFromURL() {
    var url_string = window.location;
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    var status = url.searchParams.get("status");
    console.log(status);
    var career = url.searchParams.get("career");
    var location = url.searchParams.get("location");
    if (status != null) {
        console.log("status tồn tại")
        jobSearchByStatus(status).then(list => {
            liststatus = list;
            document.getElementById("bodyJobs").innerHTML = formatArray(liststatus).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${liststatus.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (name == "" && career == "" && location == "") {
        getJob().then(list => {
            document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (location != "" && career != "" && name != "") {
        getJob().then(list => {
            let temp = list;
            temp = temp.filter(element => {
                return element.nameJob.toLowerCase().trim().includes(name.toLowerCase().trim()) && element.career.trim() == career && element.location.trim() == location;
            })
            document.getElementById("bodyJobs").innerHTML = formatArray(temp).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${temp.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (location == "" && career == "") {
        console.log(name);
        getJob().then(list => {
            let temp = list;
            temp = temp.filter(element => {
                return element.nameJob.toLowerCase().trim().includes(name.toLowerCase().trim());
            })
            document.getElementById("bodyJobs").innerHTML = formatArray(temp).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${temp.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (name == "" && career == "") {
        jobSearchByLocation(location).then(list => {
            document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (name == "" && location == "") {
        jobSearchByCareer(career).then(list => {
            document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (name == "") {
        jobSearchByCarloca(career, location).then(list => {
            document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (career == "") {
        getJob().then(list => {
            let temp = list;
            temp = temp.filter(element => {
                return element.nameJob.toLowerCase().trim().includes(name.toLowerCase().trim()) && element.location.trim() == location;
            })
            document.getElementById("bodyJobs").innerHTML = formatArray(temp).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${temp.length} việc làm đang tuyển dụng`;
        })
        return;
    }
    if (location == "") {
        getJob().then(list => {
            let temp = list;
            temp = temp.filter(element => {
                return element.nameJob.toLowerCase().trim().includes(name.toLowerCase().trim()) && element.career.trim() == career;
            })
            document.getElementById("bodyJobs").innerHTML = formatArray(temp).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${temp.length} việc làm đang tuyển dụng`;
        })
        return;
    }
}

function searchBox(e) {
    var url_string = window.location;
    var url = new URL(url_string);
    var name = e.target.value.toLowerCase().trim();
    var status = url.searchParams.get("status");
    if (status != null) {
        jobSearchByStatus(status).then(list => {
            liststatus = list;
            liststatus = liststatus.filter(element => {
                return element.nameJob.toLowerCase().trim().includes(name) && element.status.includes(status);
            })
            document.getElementById("bodyJobs").innerHTML = formatArray(liststatus).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${liststatus.length} việc làm đang tuyển dụng`;
        })
        return;
    } else {
        getJob().then(list => {
            let temp = list
            temp = temp.filter(element => {
                return element.nameJob.toLowerCase().trim().includes(name);
            })
            document.getElementById("bodyJobs").innerHTML = formatArray(temp).join("");
            document.getElementById("countJobs").innerHTML = `Tìm thấy ${temp.length} việc làm đang tuyển dụng`;
        })
        return;
    }
}

function searchCareer() {
    var url_string = window.location;
    var url = new URL(url_string);
    var career = document.getElementById("jobs");
    var location = document.getElementById("locations");
    var status = url.searchParams.get("status");
    if (status != null) {
        if (location.options[location.selectedIndex].value == "" && career.options[career.selectedIndex].value == "") {
            console.log(" status location k co gia tri , career k co gia tri")
            jobSearchByStatus(status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (location.options[location.selectedIndex].value == "") {
            console.log("status location k co gia tri")
            SearchByCareerStatus(career.options[career.selectedIndex].text, status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (location.options[location.selectedIndex].value != "" && career.options[career.selectedIndex].value == "") {
            console.log("status location co gia tri")
            SearchByLocationStatus(location.options[location.selectedIndex].text, status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (location.options[location.selectedIndex].value != "" && career.options[career.selectedIndex].value != "") {
            console.log(" status location  co gia tri , career co gia tri")
            SearchByCarlocaStatus(career.options[career.selectedIndex].text, location.options[location.selectedIndex].text, status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }

    } else {
        if (location.options[location.selectedIndex].value == "" && career.options[career.selectedIndex].value == "") {
            console.log("location k co gia tri , career k co gia tri")
            getJob().then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;

        }
        if (location.options[location.selectedIndex].value == "") {
            console.log("location k co gia tri")
            jobSearchByCareer(career.options[career.selectedIndex].text).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (location.options[location.selectedIndex].value != "" && career.options[career.selectedIndex].value == "") {
            console.log("location co gia tri")
            jobSearchByLocation(location.options[location.selectedIndex].text).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (location.options[location.selectedIndex].value != "" && career.options[career.selectedIndex].value != "") {
            console.log("location  co gia tri , career co gia tri")
            jobSearchByCarloca(career.options[career.selectedIndex].text, location.options[location.selectedIndex].text).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
    }
}


function searchLocation() {
    var url_string = window.location;
    var url = new URL(url_string);
    var career = document.getElementById("jobs");
    var location = document.getElementById("locations");
    var status = url.searchParams.get("status");
    if (status != null) {
        if (location.options[location.selectedIndex].value == "" && career.options[career.selectedIndex].value == "") {
            console.log(" status location k co gia tri , career k co gia tri")
            jobSearchByStatus(status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (career.options[career.selectedIndex].value == "") {
            console.log(" status career k gia tri")
            SearchByLocationStatus(location.options[location.selectedIndex].text, status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (career.options[career.selectedIndex].value != "" && location.options[location.selectedIndex].value == "") {
            console.log("status career co gia tri")
            SearchByCareerStatus(career.options[career.selectedIndex].text, status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (location.options[location.selectedIndex].value != "" && career.options[career.selectedIndex].value != "") {
            console.log("status location  co gia tri , career co gia tri")
            SearchByCarlocaStatus(career.options[career.selectedIndex].text, location.options[location.selectedIndex].text, status).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
    } else {
        if (location.options[location.selectedIndex].value == "" && career.options[career.selectedIndex].value == "") {
            console.log("location k co gia tri , career k co gia tri")
            getJob().then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;

        }
        if (career.options[career.selectedIndex].value == "") {
            console.log("career k gia tri")
            console.log(listTemp);
            jobSearchByLocation(location.options[location.selectedIndex].text).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (career.options[career.selectedIndex].value != "" && location.options[location.selectedIndex].value == "") {
            console.log("career co gia tri")
            jobSearchByCareer(career.options[career.selectedIndex].text).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;
        }
        if (location.options[location.selectedIndex].value != "" && career.options[career.selectedIndex].value != "") {
            console.log("location  co gia tri , career co gia tri")
            jobSearchByCarloca(career.options[career.selectedIndex].text, location.options[location.selectedIndex].text).then(list => {
                document.getElementById("bodyJobs").innerHTML = formatArray(list).join("");
                document.getElementById("countJobs").innerHTML = `Tìm thấy ${list.length} việc làm đang tuyển dụng`;
            })
            return;

        }
    }
}


function jobSearchByCarloca(career, location) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs").where("career", "==", career).where("location", "==", location)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}

function SearchByCarlocaStatus(career, location, status) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs").where("career", "==", career).where("location", "==", location).where("status", "==", status)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}

function jobSearchByCareer(career) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs").where("career", "==", career)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}

function SearchByCareerStatus(career, status) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs").where("career", "==", career).where("status", "==", status)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}

function SearchByLocationStatus(location, status) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs").where("location", "==", location).where("status", "==", status)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}

function jobSearchByLocation(location) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("Jobs").where("location", "==", location)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let job = {
                        id: doc.id,
                        career: doc.data().career,
                        datePost: doc.data().datePost,
                        imageCompany: doc.data().imageCompany,
                        location: doc.data().location,
                        nameCompany: doc.data().nameCompany,
                        nameJob: doc.data().nameJob,
                        salary: doc.data().salary
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}


function loaddatamore() {
    var url_string = window.location;
    var url = new URL(url_string);
    var danhmuc = url.searchParams.get("danhmuc");
    if (danhmuc == "tuyengap") {
        listJobs = JSON.parse(localStorage.getItem("hurryJobs"));
        document.getElementById("bodyJobs").innerHTML = formatArray(listJobs).join("");
        document.getElementById("countJobs").innerHTML = `
       &nbsp;Việc làm tuyển gấp
        `;
    }
    if (danhmuc == "hapdan") {
        listJobs = JSON.parse(localStorage.getItem("hotJobs"));
        document.getElementById("bodyJobs").innerHTML = formatArray(listJobs).join("");
        document.getElementById("countJobs").innerHTML = `
       &nbsp;Việc làm hấp dẫn

        `;
    }
    if (danhmuc == "luongcao") {
        listJobs = JSON.parse(localStorage.getItem("hotJobs"));
        document.getElementById("bodyJobs").innerHTML = formatArray(listJobs).join("");
        document.getElementById("countJobs").innerHTML = `
       &nbsp;Việc làm lương cao

        `;
    }
}
loaddatamore();







function formatArray(arr) {
    return arr.map(item => {
        return `
        <div class="item">
        <div class="row">
            <div class="col-8">
                <a class="nameJob" href="detailjob.html?id=${item.id}">${item.nameJob}</a>
                <p class="nameCompany" >${item.nameCompany}</p>
                <div class="row d-flex justify-content-between">
                    <div class="col-3">
                        <div class="content d-flex align-items-center">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-zip-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm2.5 8.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5zm2 .938V8.5h-1v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.93-.62-.4-1.598a1 1 0 0 1-.03-.243zM7.5 3V2h-1V1H8v1h1v1H8v1h1v1H8v1h1v1H7.5V6h-1V5h1V4h-1V3h1z"/>
                              </svg>
                              <span>${item.salary}</span>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="content d-flex align-items-center">
                            <svg width="1em" height="1.0625em" viewBox="0 0 16 17" class="bi bi-compass" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                <path d="M6.94 7.44l4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                              </svg>
                              <span>${item.location}</span>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="content d-flex align-items-center">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
                                <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                              </svg>
                              <span>${item.datePost}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div    class="col-4 d-flex align-items-center justify-content-center" >
            
            <div class="avatar"   style="
                background-image: url('${item.imageCompany}');
              "></div>
            </div>
           
        </div>
       </div>
        `;
    });
}