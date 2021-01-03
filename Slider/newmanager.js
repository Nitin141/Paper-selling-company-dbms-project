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
const manager = document.getElementById('Manager')
manager.addEventListener('submit', (e) => {
  e.preventDefault()
  let managerData = JSON.stringify($('#Manager').serializeObject())
  let managerid = document.forms['Manager']['managerid'].value

  let branchid = document.forms['Manager']['branchid'].value
  if (managerid == '' || branchid == '') {
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
      url: 'http://localhost:4000/newmanager',
      data: managerData,
      success: function () {
        let message = document.getElementById('message')
        message.innerHTML = `<div class="alert alert-success" role="alert">
            New manager appointed
          </div>`
        setTimeout(() => {
          message.innerHTML = ''
        }, 2000)
        document.getElementById('managerid').value = ''
        document.getElementById('branchid').value = ''
      },
      error: function () {
        let message = document.getElementById('message')
        message.innerHTML = `<div class="alert alert-danger" role="alert">
            Incorrect employee id or branch name
          </div>`
        setTimeout(() => {
          message.innerHTML = ''
        }, 2000)
        document.getElementById('managerid').value = ''
        document.getElementById('branchid').value = ''
      },
      dataType: 'json',
      contentType: 'application/json',
    })
  }
})
