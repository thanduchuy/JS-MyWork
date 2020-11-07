let listJobs = [];
function saveDataToLocal() {
    localStorage.setItem("jobs",JSON.parse(listJobs));
}
function loadDataFromURL() {
    var url_string = window.location;
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    var jobs = url.searchParams.get("jobs");
    var locations = url.searchParams.get("locations");
    getDataFromLocal();
    var result = [];
    result = result.concat(searchDataByName(name));
    result = result.concat(searchDataByOptions("location",location))
    result = result.concat(searchDataByOptions("career",jobs))
    result = result.reduce((result,element) => {
        if (!checkElement(result,element)) {
            result.push(element)
        } 
        return result
    },[]);

    document.getElementById("bodyJobs").innerHTML = formatArray(result).join("");
    document.getElementById("countJobs").innerHTML = `Tìm thấy ${result.length} việc làm đang tuyển dụng`;
}
function checkElement(arr,key) {
    for (item of arr) {
        if (key["nameJob"] == item["nameJob"] && key["location"] == item["location"] && key["career"] == item["career"]) {
            return true
        }
    }
    return false
}
function searchDataByName(name) {
    return listJobs.filter(element=>element["nameJob"].toLowerCase().includes(name.toLowerCase().trim()));
}
function searchDataByOptions(field,options) {
    return listJobs.filter(element=>element[field]===options);
}
function getDataFromLocal() {
    listJobs = JSON.parse(localStorage.getItem("jobs"));
}

function formatArray(arr) {
    return arr.map(item=>{
        return `
        <div class="item">
        <div class="row">
            <div class="col-8">
                <a class="nameJob" href="#">${item.nameJob}</a>
                <p class="nameCompany">${item.nameCompany}</p>
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
            <div class="col-4 d-flex align-items-center justify-content-center" >
                <div class="avatar" style="
                background-image: url('${item.imageCompany}');
              "></div>
            </div>
        </div>
       </div>
        `;
    });
}