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
let role = localStorage.getItem('role')
if (role == 'A') {
  const signup = document.getElementById('Signup')
  const button = document.getElementById('btn')
  signup.addEventListener('submit', (e) => {
    e.preventDefault()
    var formData = JSON.stringify($('#Signup').serializeObject())
    console.log(formData)

    var w = document.forms['Signup']['username'].value
    var x = document.forms['Signup']['password'].value
    var y = document.forms['Signup']['cpassword'].value
    var role = document.forms['Signup']['role'].value
    if (x == '' || w == '' || y == '' || role == '') {
      let message = document.getElementById('message')
      message.innerHTML = `<div class="alert alert-danger" role="alert">
    No field must be left empty
    </div>`
      setTimeout(() => {
        message.innerHTML = ''
      }, 2000)
    } else if (role !== 'A' && role !== 'E') {
      console.log(role)
      let message = document.getElementById('message')
      message.innerHTML = `<div class="alert alert-danger" role="alert">
    Role can be either A or E
    </div>`
      setTimeout(() => {
        message.innerHTML = ''
      }, 2000)
    } else {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/signup',
        data: formData,
        success: function () {
          let message = document.getElementById('message')
          message.innerHTML = `<div class="alert alert-success" role="alert">
        New USER inserted
    </div>`
          setTimeout(() => {
            message.innerHTML = ''
          }, 2000)
          window.location.href('/loginp')
        },
        error: function (status) {
          if (status.status == 500) {
            let message = document.getElementById('message')
            message.innerHTML = `<div class="alert alert-danger" role="alert">
          Password must be same in both field;
      </div>`
            setTimeout(() => {
              message.innerHTML = ''
            }, 2000)
          } else if (status.status == 400) {
            let message = document.getElementById('message')
            message.innerHTML = `<div class="alert alert-danger" role="alert">
        Username or password already exists;
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
} else {
  let message = document.getElementById('message')
  message.innerHTML = `<div class="alert alert-danger" role="alert">
      Sorry you are not authorized to add a new user
    </div>`
  let error = document.getElementById('Error')
  error.innerHTML = `<button type="button" id="btnerror" value="Add new user">Go back home`
  error.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('hey')
    window.location.href = '/welcome'
  })
}
