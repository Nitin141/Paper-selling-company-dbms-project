$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || "");
    } else {
      o[this.name] = this.value || "";
    }
  });
  return o;
};
function validateform(
  firstname,
  lastname,
  birthdate,
  sex,
  salary,
  supervisorid,
  branchid
) {
  if (
    firstname == "" ||
    lastname == "" ||
    birthdate == "" ||
    sex == "" ||
    salary == "" ||
    supervisorid == "" ||
    branchid == ""
  ) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-danger" role="alert">
                                No field must be left empty
                        </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
    return false;
  }
  let age = new Date(new Date() - new Date(birthdate)).getFullYear() - 1970;
  if (age < 18) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-warning" role="alert">
        Employee should be more than 18 years old
      </div>>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
    return false;
  }
  if (salary < 10000) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-warning" role="alert">
        Employee's minimum salary should be 10000
      </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
    return false;
  }
  return true;
}
const employee = document.getElementById("Employee");
employee.addEventListener("submit", (e) => {
  e.preventDefault();
  let employeeData = JSON.stringify($("#Employee").serializeObject());
  // console.log(employeeData);
  let firstname = document.forms["Employee"]["firstname"].value;
  let lastname = document.forms["Employee"]["lastname"].value;
  let birthdate = document.forms["Employee"]["birthdate"].value;
  let sex = document.forms["Employee"]["sex"].value;
  let salary = document.forms["Employee"]["salary"].value;
  let supervisorid = document.forms["Employee"]["supervisorid"].value;
  let branchid = document.forms["Employee"]["branchid"].value;
  if (
    validateform(
      firstname,
      lastname,
      birthdate,
      sex,
      salary,
      supervisorid,
      branchid
    )
  ) {
    $.ajax({
      type: "POST",
      url: "http://localhost:4000/insertemployee",
      data: employeeData,
      success: function () {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-success" role="alert">
        Employee data inserted
      </div>`;
        setTimeout(() => {
          message.innerHTML = "";
        }, 2000);
        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("birthdate").value = "";
        document.getElementById("salary").value = "";
        document.getElementById("supervisorid").value = "";
        document.getElementById("branchid").value = "";
      },
      error: function () {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-danger" role="alert">
        Branchid or supervisor id is incorrect
</div>`;
        setTimeout(() => {
          message.innerHTML = "";
        }, 2000);
      },
      dataType: "json",
      contentType: "application/json",
    });
  }
});
