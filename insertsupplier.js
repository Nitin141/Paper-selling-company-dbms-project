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
const supplier = document.getElementById('Supplier')
supplier.addEventListener('submit', (e) => {
  e.preventDefault()
  let supplierData = JSON.stringify($('#Supplier').serializeObject())
  let suppliername = document.forms['Supplier']['suppliername'].value
  let branchid = document.forms['Supplier']['branchid'].value
  let product = document.forms['Supplier']['product'].value
  if (suppliername == '' || branchid == '' || product == '') {
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
      url: 'http://localhost:4000/insertsupplier',
      data: supplierData,
      success: function () {
        let message = document.getElementById('message')
        message.innerHTML = `<div class="alert alert-success" role="alert">
                Supplier data inserted
              </div>`
        setTimeout(() => {
          message.innerHTML = ''
        }, 2000)
        document.getElementById('suppliername').value = ''
        document.getElementById('branchid').value = ''
        document.getElementById('product').value = ''
      },
      error: function (data) {
        console.log(data)
        if (data.status == 400) {
          let message = document.getElementById('message')
          message.innerHTML = `<div class="alert alert-danger" role="alert">
                   Incorrect branchid
              </div>`
          setTimeout(() => {
            message.innerHTML = ''
          }, 2000)
        } else {
          let message = document.getElementById('message')
          message.innerHTML = `<div class="alert alert-danger" role="alert">
                     Some error occured;
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
