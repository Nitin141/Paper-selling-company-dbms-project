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
const employee = document.getElementById('Employee')
employee.addEventListener('submit', (e) => {
  e.preventDefault()
  let employeeData = JSON.stringify($('#Employee').serializeObject())
  let empid = document.forms['Employee']['empid'].value

  if (empid == '') {
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
      url: 'http://localhost:4000/deleteemployee',
      data: employeeData,
      success: function () {
        let message = document.getElementById('message')
        message.innerHTML = `<div class="alert alert-success" role="alert">
          Employee data deleted
        </div>`
        setTimeout(() => {
          message.innerHTML = ''
        }, 2000)
        document.getElementById('empid').value = ''
      },
      error: function (data) {
        console.log(data.responseJSON)

        if (data.status == 500) {
          let message = document.getElementById('message')
          message.innerHTML = `<div class="alert alert-warning" role="alert">
        Employee is manager of ${data.responseJSON.name} branch,branchid:${data.responseJSON.branchid} 
        and supervisor of employees there
        </div>`

          document.getElementById('empid').value = ''
          let button = document.getElementById('button')
          button.innerHTML = `<button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Appoint new manager and supervisor</button>`
          let btn2 = document.getElementById('btn2')
          console.log(btn2)
          btn2.addEventListener('click', (e) => {
            window.location.href = '/public/newbranchmanager.html'
          })
        } else {
          let message = document.getElementById('message')
          message.innerHTML = `<div class="alert alert-danger" role="alert">
             Employee id doesnot exist
        </div>`
          setTimeout(() => {
            message.innerHTML = ''
          }, 2000)
          document.getElementById('empid').value = ''
        }
      },
      dataType: 'json',
      contentType: 'application/json',
    })
  }
})
