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
const client = document.getElementById("Client");
client.addEventListener("submit", (e) => {
  e.preventDefault();
  let clientData = JSON.stringify($("#Client").serializeObject());
  let name = document.forms["Client"]["clientname"].value;
  if (name == "") {
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
      url: "http://localhost:4000/deleteclient",
      data: clientData,
      success: function () {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-success" role="alert">
            Client data deleted
          </div>`;
        setTimeout(() => {
          message.innerHTML = "";
        }, 2000);
        document.getElementById("clientname").value = "";
      },
      error: function (data) {
        console.log(data.responseJSON);
        if (data.status == 500) {
          let message = document.getElementById("message");
          message.innerHTML = `<div class="alert alert-danger" role="alert">
          Client name is incorrect
          </div>`;
          setTimeout(() => {
            message.innerHTML = "";
          }, 2000);
          document.getElementById("clientname").value = "";
        }
      },
      dataType: "json",
      contentType: "application/json",
    });
  }
});
