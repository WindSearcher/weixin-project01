function getDate() {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let weeks = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let dt = new Date();
  let y = dt.getFullYear();
  let m = dt.getMonth();
  let d = dt.getDate();
  console.log("year:" + y + "month:" + m + "day:" + d);

  let temp = "";
  temp += " " + months[m];
  temp += " " + d + " " + y + " ";
  m += 1; // 因为坐标从0开始
  if (m == 1 || m == 2) {
    y--;
    m += 12;
  }
  let index = parseInt((d + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400) % 7);

  temp += weeks[index];
  console.log("time:" + temp);
  return temp;
}

function getDateActually(){
  let dt = new Date();
  let y = dt.getFullYear();
  let m = dt.getMonth() + 1;
  let d = dt.getDate();
  let h = dt.getHours();
  let s = dt.getSeconds();
  let temp = "";
  temp += y+"-"+m+"-"+d+" "+h+":"+s;
  return temp;
}

function getDate(){
  let dt = new Date();
  let y = dt.getFullYear();
  let m = dt.getMonth() + 1;
  let d = dt.getDate();
  var temp = "";
  if(m > 0 && m <= 9){
    m = "0" + m;
  }
  if (d > 0 && d <= 9){
    d = "0" + d;
  }
  temp += y + "-" + m + "-" + d;
  return temp;
}

module.exports = {
  getDate: getDate,
  getDateActually: getDateActually,
};