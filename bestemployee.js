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
const empdata = document.getElementById('Bestemp')
empdata.addEventListener('submit', (e) => {
  e.preventDefault()
  tablehead.innerHTML = ''
  tablebody.innerHTML = ''
  let employeeData = JSON.stringify($('#Bestemp').serializeObject())
  var w = document.forms['Bestemp']['increment'].value
  if (w === '') {
    let message = document.getElementById('message')
    console.log(message)
    message.innerHTML = `<div class="alert alert-danger" role="alert">
        No field must be left empty
    </div>`
    setTimeout(() => {
      message.innerHTML = ''
    }, 2000)
  } else if (w > 10) {
    let message = document.getElementById('message')
    console.log(message)
    message.innerHTML = `<div class="alert alert-danger" role="alert">
        Cannot increment salary by more than 10%
    </div>`
    setTimeout(() => {
      message.innerHTML = ''
    }, 2000)
  } else {
    let myArray = []
    $.ajax({
      type: 'POST',
      url: 'http://localhost:4000/bestemployee',
      data: employeeData,
      success: function (result) {
        myArray = result
        buildTable(myArray)
        console.log(myArray)
      },
      error: function () {
        let message = document.getElementById('message')
        message.innerHTML = `<div class="alert alert-danger" role="alert">
          Some error occured
      </div>`
        setTimeout(() => {
          message.innerHTML = ''
        }, 2000)
      },
      dataType: 'json',
      contentType: 'application/json',
    })
  }
})
function buildTable(data) {
  var tablehead = document.getElementById('tablehead')
  var tablebody = document.getElementById('tablebody')
  html1 = `<tr>
            <th scope="col">Employee Id</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Birthdate</th>
            <th scope="col">Sex</th>
            <th scope="col">Salary</th>
            <th scope="col">Supervisor Id</th>
            <th scope="col">Branch Id</th>
          </tr>`
  tablehead.innerHTML = html1
  for (var i = 0; i < data.length; i++) {
    html = `<tr>
      <td>${data[i].emp_id}</td>
      <td>${data[i].first_name}</td>
      <td>${data[i].last_name}</td>
      <td>${data[i].birth_day}</td>
      <td>${data[i].sex}</td>
      <td>${data[i].salary}</td>
      <td>${data[i].super_id}</td>
      <td>${data[i].branch_id}</td>
    </tr>`
    tablebody.innerHTML += html
    html = ''
  }
}
