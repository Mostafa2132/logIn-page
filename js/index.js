/*
email validation : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm
pass validation : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/gm


*/

//index روح علي صفحه ال
let log = document.querySelector("#log");

//login روح علي صفحه ال
let sign = document.querySelector("#sign");

//?inputs  for log page

let nameInp = document.querySelector("#nameInp");
let EmailLogInp = document.querySelector("#EmailLogInp");
let passLogInp = document.querySelector("#passLogInp");

//? inputs for index page

let EmailInp = document.querySelector("#EmailInp");
let passInp = document.querySelector("#passInp");

//? paragraph selectors

let havAcc = document.querySelector("#havAcc");
let sucss = document.querySelector(".succ");
let exists = document.querySelector(".exists");
let dataValid = document.querySelector("p.data_vaild");

//? bottoms selectors

let btnUp = document.querySelector(".btn-up");
let logIn = document.querySelector(".btn-in");
let logOut = document.querySelector(".logOut");

//!    *************** sign in   part *********** */

//? global array
let arr = [];

//? check data in local storage

if (localStorage.getItem("user") != null) {
  arr = JSON.parse(localStorage.getItem("user"));
}

//? go to login page
if (log != null) {
  log.addEventListener("click", function () {
    log.href = "index.html";
  });
}

//? go to Sign up  page
if (sign != null) {
  sign.addEventListener("click", function () {
    sign.href = "login.html";
  });
}
//? go to  login page
if (logOut != null) {
  logOut.addEventListener("click", function () {
    logOut.href = "index.html";
  });
}

function validation(ele) {
  let regex = {
    nameInp: /^[a-z]{3,10}( )?([a-z]{3,12})?$/gm,
    EmailLogInp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm,
    passLogInp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/gm,
  };

  if (regex[ele.id].test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    ele.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

//? Sign Up لما ادوس عل زرار

if (btnUp != null) {
  btnUp.addEventListener("click", function () {
    if (
      validation(nameInp) &&
      validation(EmailLogInp) &&
      validation(passLogInp)
    ) {
      
      SignUpFun(); //call
      // clear();
    } else {
      alert("ياعم دخل الداتا زي الناس");
    }
  });
}
//? clear لو عاوز تعمل
function clear() {
  nameInp.value = "";
  EmailLogInp.value = "";
  passLogInp.value = "";
}
function SignUpFun() {
  let user = {
    name: nameInp.value,
    email: EmailLogInp.value,
    pass: passLogInp.value,
  };

  if (arr.length == 0) {
    arr.push(user);
    localStorage.setItem("user", JSON.stringify(arr));
    sucss.classList.replace("d-none", "d-block");
  }

  if (checkInp() == false) {
    sucss.classList.replace("d-none", "d-block");
    sucss.classList.replace("text-success", "text-danger");
    sucss.innerHTML = "Please fill all  inputs";
    return false;
  } else {
    sucss.classList.replace("d-block", "d-none"); // success
    sucss.classList.replace("text-danger", "text-success");
    sucss.innerHTML = "Success";
  }

  if (checkEmail() == false) {
    exists.classList.replace("d-none", "d-block");
    exists.classList.replace("text-success", "text-warning");
    sucss.classList.replace("d-block", "d-none");
  } else {
    sucss.classList.replace("d-none", "d-block");
    exists.classList.replace("d-block", "d-none");
    exists.classList.replace("text-warning", "text-success");
    arr.push(user);
    localStorage.setItem("user", JSON.stringify(arr));
  }
}


function checkEmail() {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].email.toLowerCase() == EmailLogInp.value.toLowerCase()) {
      return false;
    }
  }
}

function checkInp() {
  if (
    nameInp.value == "" ||
    EmailLogInp.value == "" ||
    passLogInp.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

//!    *************** log in   part *********** */  

let inner = document.querySelector(".addtext");
if (logIn != null) {
  logIn.addEventListener("click", function () {
    if (checkLogInps() == false) {
      document.querySelector(".reqInp").classList.replace("d-none", "d-block");
      dataValid.classList.replace("d-block", "d-none");
      return true;
    } else {
      document.querySelector(".reqInp").classList.replace("d-block", "d-none");
    }

    if (isMatced()) {
      // username matches pass
      if (logIn != null) {
        if (localStorage.getItem("username") != null) {
          // go to home page and add text

          document.body.innerHTML = `  <nav class="navbar navbar-expand-lg py-5 "> 
        <div class="container bg-transparent">
          <a class="navbar-brand text-white" href="#">Smart Login System</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
   
            <form class="d-flex ms-auto" role="search">
             
              <a id="logOut" onclick=Goback() class="logOut btn btn-outline-danger" type="submit">log out</a>
            </form>
          </div>
        </div>
      </nav> 


      <div class="container bg-transparent   position-absolute top-50 start-50 translate-middle">
            <div class="d-flex justify-content-center align-items-end  addtext ">
               <h1 class="text-danger" >Welcome ${localStorage.getItem(
                 "username"
               )}</h1>
            </div>
      </div>`;
        }
      }
    }
  });
}

function Goback() {
  history.back("index.html");
}

function checkLogInps() {
  if (EmailInp.value == "" || passInp.value == "") {
    return false;
  } else {
    console.log("logged in");

    return true;
  }
}

//? Compare email and password with email and password in local storage

function isMatced() {
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].email.toLowerCase() == EmailInp.value.toLowerCase() &&
      arr[i].pass.toLowerCase() == passInp.value.toLowerCase()
    ) {
      localStorage.setItem("username", arr[i].name);
      document.querySelector(".reqInp").classList.replace("d-block", "d-none");
      dataValid.classList.replace("d-block", "d-none");
      return true;
    } else {
      dataValid.classList.replace("d-none", "d-block");
    }
  }
}
