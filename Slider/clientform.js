$.fn.serializeObject = function () {
  var o = {}
  var a = this.serializeArray()
  $.each(a, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]]
      }
      o[this.name].push(this.value || '')
    } else {
      o[this.name] = this.value || ''
    }
  })
  return o
}
let log = document.getElementById('logout')
log.addEventListener('click', () => {
  localStorage.clear()
})
const client = document.getElementById('Client')
client.addEventListener('submit', (e) => {
  e.preventDefault()
  let clientData = JSON.stringify($('#Client').serializeObject())
  let clientname = document.forms['Client']['clientname'].value
  let branchname = document.forms['Client']['branchname'].value
  if (clientname == '' || branchname == '') {
    let message = document.getElementById('message')
    message.innerHTML = `<div class="alert alert-danger" role="alert">
                                    No field must be left empty
                            </div>`
    setTimeout(() => {
      message.innerHTML = ''
    }, 2000)
  } else {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4000/insertclient',
      data: clientData,
      success: function () {
        let message = document.getElementById('message')
        message.innerHTML = `<div class="alert alert-success" role="alert">
              Client data inserted
            </div>`
        setTimeout(() => {
          message.innerHTML = ''
        }, 2000)
        document.getElementById('clientname').value = ''
        document.getElementById('branchname').value = ''
      },
      error: function (data) {
        console.log(data)
        if (data.status == 400) {
          let message = document.getElementById('message')
          message.innerHTML = `<div class="alert alert-danger" role="alert">
                 Incorrect branchname
            </div>`
          setTimeout(() => {
            message.innerHTML = ''
          }, 2000)
        }
      },
      dataType: 'json',
      contentType: 'application/json',
    })
  }
})
