let role = localStorage.getItem('role')
let log = document.getElementById('logout')
log.addEventListener('click', () => {
  localStorage.clear()
})
if (role === 'A') {
  let div = document.getElementById('displaysupplier')
  div.innerHTML = ` <button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display particular supplier's  details</button>
        <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all supplier's  details</button>
        <button type="button" id="btn3" class="btn btn-primary btn-lg btn-block">Insert new supplier's  details</button>
        <button type="button" id="btn4" class="btn btn-primary btn-lg btn-block">Delete any supplier's  details</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  let btn3 = document.getElementById('btn3')
  let btn4 = document.getElementById('btn4')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/suppliertable.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/suppliertable1.html'
  })
  btn3.addEventListener('click', (e) => {
    window.location.href = './insertsupplier.html'
  })
  btn4.addEventListener('click', (e) => {
    window.location.href = './deletesupplier.html'
  })
} else {
  let div = document.getElementById('displaysupplier')
  div.innerHTML = ` <button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display particular supplier's  details</button>
        <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all supplier's  details</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/suppliertable.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/suppliertable1.html'
  })
}
