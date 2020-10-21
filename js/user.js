addSelectDates();
addSelectMonths();
addSelectYears();
addSelectCountry();
addSelectCity();
addSelectDistrict();


function addSelectDates(){
  let dates = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];
  let row = dates.map((e) => {
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("dateinfo").innerHTML += row.join(" ");
}
function addSelectMonths(){
  let months = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
  ];
  let row = months.map((e) => {
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("monthinfo").innerHTML += row.join(" ");
}
function addSelectYears(){
  let years = [
    1971,
    1972,
    1973,
    1974,
    1975,
    1976,
    1977,
    1978,
    1979,
    1980,
    1981,
    1982,
    1983,
    1984,
    1985,
    1986,
    1987,
    1988,
    1989,
    1990,
    1991,
    1992,
    1993,
    1994,
    1995,
    1996,
    1997,
    1998,
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010
  ];
  let row = years.map((e) =>{
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("yearinfo").innerHTML += row.join(" ");
}
function addSelectCountry(){
  let countryes = [
    "Việt Nam",
    "Hàn Quốc",
    "Nhật Bản",
    "Anh",
    "Mỹ",
    "Pháp",
    "Nga",
    "Trung Quốc",
    "Thái Lan",
    "Campuchia"
  ];
  let row = countryes.map((e) => {
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("countryId").innerHTML += row.join(" ");
}
function addSelectCity(){
  let citys = [
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
    "Cà Mau"
  ];
  let row = citys.map((e) => {
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("city").innerHTML += row.join(" ");
}
function addSelectDistrict(){
  let districts = [
    "Liên Chiểu",
    "Thanh Khê",
    "Hải Châu",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Cẩm Lệ",
    "Hòa Vang"
  ];
  let row = districts.map((e) => {
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("district").innerHTML += row.join(" ");
}