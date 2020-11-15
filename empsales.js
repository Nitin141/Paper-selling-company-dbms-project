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
const workswith = document.getElementById("Workswith");
workswith.addEventListener("submit", (e) => {
  console.log("Hello");
  e.preventDefault();
  let salesData = JSON.stringify($("#Workswith").serializeObject());
  let empid = document.forms["Workswith"]["empid"].value;
  let clientid = document.forms["Workswith"]["clientid"].value;
  let totalsales = document.forms["Workswith"]["totalsales"].value;
  if (empid == "" || clientid == "" || totalsales == "") {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-danger" role="alert">
                                No field must be left empty
                        </div>`;
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
  } else {
    $.ajax({
      type: "POST",
      url: "http://localhost:4000/insertworkswith",
      data: salesData,
      success: function () {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-success" role="alert">
      Sales data inserted
    </div>`;
        setTimeout(() => {
          message.innerHTML = "";
        }, 2000);
        document.getElementById("empid").value = "";
        document.getElementById("clientid").value = "";
        document.getElementById("totalsales").value = "";
      },
      error: function () {
        if (status.status == 500) {
          let message = document.getElementById("message");
          message.innerHTML = `<div class="alert alert-danger" role="alert">
      Employee id or client id doesnot exists
</div>`;
          setTimeout(() => {
            message.innerHTML = "";
          }, 2000);
        } else {
          let message = document.getElementById("message");
          message.innerHTML = `<div class="alert alert-danger" role="alert">
      Employee  and client belong to different branches
</div>`;
          setTimeout(() => {
            message.innerHTML = "";
          }, 2000);
        }
      },
      dataType: "json",
      contentType: "application/json",
    });
  }
});
