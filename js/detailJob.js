let jobs = []
let listCV = []
let cvChoose = 0
let user = {}
function loadData() {
    jobs = loadJobLocal()
    showJobViewMuch()
    getListCVOfUser()
}
function loadJobLocal() {
    return JSON.parse(localStorage.getItem("jobs"))
}
function showJobViewMuch() {
    let temp = shuffle(jobs);
    let inner = "";
    for (let index = 0; index < 3; index++) {
        inner+= `
        <div class="col-md-12 col-lg-12 job-over-item">
        <div class="row job-item">
            <p class="j-title-text-ellipsis">
                <a href="https://mywork.com.vn/tuyen-dung/viec-lam/1173882/chuyen-vien-tai-chinh-bao-hiem-toan-quoc-ngan-hang-vietinbank.html"
                    id="tuyendunghapdan" data-toggle="tooltip"
                    target="_blank" class="el-tooltip item">
                    <span>
                        <strong>${temp[index]["nameJob"]}
                        </strong>
                    </span>
                </a>
            </p>
            <div class="j-company">
                <div class="name">
                    <a href="https://mywork.com.vn/tuyen-dung/nha-tuyen-dung/313041/cong-ty-tnhh-bao-hiem-nhan-tho-aviva-viet-nam.html"
                        target="_blank"
                        title="Công Ty TNHH Bảo Hiểm Nhân Thọ Aviva Việt Nam">
                        <span>${temp[index]["nameCompany"]}
                        </span>
                    </a>
                </div>
            </div>
            <div class="table-item">
                <div class="dollar">
                    <svg width="1em" height="1em" viewBox="0 0 16 16"
                        class="bi bi-cash" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M15 4H1v8h14V4zM1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1z" />
                        <path
                            d="M13 4a2 2 0 0 0 2 2V4h-2zM3 4a2 2 0 0 1-2 2V4h2zm10 8a2 2 0 0 1 2-2v2h-2zM3 12a2 2 0 0 0-2-2v2h2zm7-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                    </svg> &nbsp; ${temp[index]["salary"]}
                </div>
                <div class="deadline">
                    <svg width="1em" height="1em" viewBox="0 0 16 16"
                        class="bi bi-alarm" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                    </svg> &nbsp;  ${temp[index]["datePost"]}
                </div>
            </div>
        </div>
    </div>
        `;
    }
    document.getElementById("jobViewMuch").innerHTML = inner;
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function getListCVOfUser() {
    user = JSON.parse(sessionStorage.getItem("userLogin"))
    let temp = JSON.parse(localStorage.getItem("listCV"))
    listCV = temp.filter(element => element["idUser"] == user["id"])
    info.phone.value = user["phone"]
    info.email.value = user["email"]
    document.getElementById("listCV").innerHTML =  listCV.map((element,index)=> {
        return `
        <div class="col-4">
            <div class="col-12 items d-flex justify-content-center align-items-center" name="itemCV"
            onclick="chooseCVSent(${index})"
            >
                <img src="${element["cvImage"]}">
                <svg id="checkCV" name="checkCV" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
        </div>
        `
    }).join("")

    document.getElementsByName("itemCV")[0].style.borderColor = "#009ce0"
    document.getElementsByName("checkCV")[0].style.display = "block"

}
function chooseCVSent(index) {
    cvChoose = index
    for (var i = 0; i < listCV.length; i++) {
        document.getElementsByName("itemCV")[i].style.borderColor = i == index ? "#009ce0" : "#e1e1e1"
        document.getElementsByName("checkCV")[i].style.display = i == index ? "block" : "none"
    }
}
function senttCVToEmployer() {
    let phone = info.phone.value;
    let email = info.email.value;
    let cv = listCV[cvChoose];
    let name = user["name"];

    let cvSent = {
        phone : phone,
        email : email,
        cvImage : cv["cvImage"],
        idUser : user["id"],
        idEmployer : "U000",
        name: name
    }

    let cvSents = JSON.parse(localStorage.getItem("cvSent"));
    if (cvSents == null) {
        cvSent["id"] = `CV1`
        localStorage.setItem("cvSent",JSON.stringify([cvSent]));
    } else {
        cvSent["id"] = `CV${cvSents.length+1}`;
        cvSents.push(cvSent);
        localStorage.setItem("cvSent",JSON.stringify(cvSents));
    }
    window.location.href = "http://127.0.0.1:5502/html/home.html";
}