addSelectJobs();
addSelectLocation();

var db = firebase.firestore();
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
    ];
    let row = locations.map((e) => {
        return `<option value="${e}">${e}</option>`;
    });
    document.getElementById("locations").innerHTML += row.join(" ");
}



function showdata() {
    formatArray(listhurryJobs);
    formatArray2(listhotJobs, "hotjobs");
    formatArray2(listhurryJobs, "salaryjobs")

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
                        salary: doc.data().salary
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}

var List = [];

function loadPage() {
    getJob().then(list => {
        formatArray(list)
    })
}

function formatArray(arr) {
    let inner = "";
    for (let i = 0; i < 8; i++) {
        inner += `                      
        <div class="col-md-6 col-lg-6 job-over-item">
        <div class="row job-itemnow">
            <div class="col-md-12 col-lg-12 job_info">
                <div class="company_logo">
                    <a href="detailjob.html?id=${arr[i]["id"]}" class title="" target="_blank">
                        <div class="logo_box">
                            <img class="lazy-load" src="${arr[i]["imageCompany"]}" lazy="error">
                        </div>
                    </a>
                </div>
                <div class="company_name">
                    <p class="j_title text_ellipsis">
                        <a href="detailjob.html?id=${arr[i]["id"]}" id="vieclamtuyengap" class="el-tooltip item" title="">
                            <span>
                                  <strong>${arr[i]["nameJob"]}</strong>
                              </span>
                        </a>
                    </p>
                    <div class="j_company">
                        <div class="name">
                            <a href="detailjob.html?id=${arr[i]["id"]}" target="_blank" title="${arr[i]["nameCompany"]}">
                                <span>
                                     ${arr[i]["nameCompany"]}
                                  </span>
                            </a>
                        </div>
                        <div class="viewed">
                        </div>
                    </div>
                    <div class="table-item">
                        <div class="dollar">
                            <i class="li-cash-dollar">
                              </i> &nbsp;${arr[i]["salary"]}
                        </div>
                        <div title="${arr[i]["location"]}" class="location text_ellipsis" style="padding-left: 90px;">
                            <i class="li-map-marker">
                              </i> &nbsp;${arr[i]["location"]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="mt-n mb-20 maker-none">
    </div>
    `;
    }
    document.getElementById("hurryjobs").innerHTML = inner;
}
loadPage();

function formatArray2(arr, ele) {
    let inner = "";
    for (let i = 0; i < 8; i++) {
        inner += `                      
        <div class="col-md-6 col-lg-6 job-over-item" style="height: 80px ;">
                                    <div class="row job-item">
                                        <div class="col-md-12 col-lg-12 job_info">
                                            <div class="company_logo">
                                                <a href="detailjob.html">
                                                    <div class="logo_box">
                                                        <img class="lazy-load" src="${arr[i]["imageCompany"]}" lazy="loaded">
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="company_namehot">
                                                <div class="content">
                                                    <p class="j_title text_ellipsis">
                                                        <a href="detailjob.html?name=${arr[i]["id"]}" class="el-tooltip item" id="vieclamhapdan" title="Chuyên Viên Kinh Doanh BĐS Có Lương Cứng" target="_blank">
                                                            <span>
                                                                        <strong>${arr[i]["nameJob"]}</strong>
                                                                    </span>
                                                        </a>
                                                    </p>
                                                    <div class="j_company">
                                                        <div class="name">
                                                            <a href="login.html" title="${arr[i]["nameCompany"]}">
                                                                <span>${arr[i]["nameCompany"]}</span>
                                                            </a>
                                                        </div>
                                                        <div class="viewed"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="extra-info">
                                                <div class="table-item">
                                                    <div class="dollar">
                                                        <i class="li-cash-dollar">
                                                                    
                                                                </i> &nbsp;${arr[i]["salary"]}
                                                    </div>
                                                    <div title="Hà Nội" class="location text_ellipsis">
                                                        <i class="li-map-marker">
                                                                </i>&nbsp;${arr[i]["location"]}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    `;
    }
    document.getElementById(ele).innerHTML = inner;
}



function searchWork() {
    let name = form.search.value;
    let career = form.jobs.value;
    let location = form.locations.value;

    window.location.href = `
                http://127.0.0.1:5503/html/result.html?name=${name}&career=${career}&location=${location}`;
}

function More1() {
    window.location.href = `
                http://127.0.0.1:5502/html/result.html?danhmuc=tuyengap`;
}

function More2() {
    window.location.href = `
                http://127.0.0.1:5502/html/result.html?danhmuc=hapdan`;
}

function More3() {
    window.location.href = `
                http://127.0.0.1:5502/html/result.html?danhmuc=luongcao`;
}