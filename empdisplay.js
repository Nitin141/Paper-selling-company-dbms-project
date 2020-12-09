let role2 = localStorage.getItem('role')
console.log(role2)
let log = document.getElementById('logout')
log.addEventListener('click', () => {
  localStorage.clear()
})
if (role2 === 'A') {
  console.log('hello')
  let div = document.getElementById('display')
  div.innerHTML = `<button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display employee  details</button>
    <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all employee's  details</button>
    <button type="button" id="btn3" class="btn btn-primary btn-lg btn-block">Display   employee's sales record</button>
    <button type="button" id="btn4" class="btn btn-primary btn-lg btn-block">Display all employee's sales record</button>
    <button type="button" id="btn5" class="btn btn-primary btn-lg btn-block">Insert a new employee</button>
    <button type="button" id="btn6" class="btn btn-primary btn-lg btn-block">Delete an employee record</button>
    <button type="button" id="btn7" class="btn btn-primary btn-lg btn-block">Increment best employee's salary</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  let btn3 = document.getElementById('btn3')
  let btn4 = document.getElementById('btn4')
  let btn5 = document.getElementById('btn5')
  let btn6 = document.getElementById('btn6')
  let btn7 = document.getElementById('btn7')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/emptable.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/emptable2.html'
  })
  btn3.addEventListener('click', (e) => {
    window.location.href = './table/emptable3.html'
  })
  btn4.addEventListener('click', (e) => {
    window.location.href = './table/emptable4.html'
  })
  btn5.addEventListener('click', (e) => {
    window.location.href = './employeeform.html'
  })
  btn6.addEventListener('click', (e) => {
    window.location.href = './empdelete.html'
  })
  btn7.addEventListener('click', (e) => {
    window.location.href = './bestemployee.html'
  })
} else {
  let div = document.getElementById('display')
  div.innerHTML = `<button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display employee  details</button>
    <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all employee's  details</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/emptable.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/emptable2.html'
  })
}
