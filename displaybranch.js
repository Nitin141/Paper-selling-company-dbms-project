let role2 = localStorage.getItem('role')
console.log(role2)
let log = document.getElementById('logout')
log.addEventListener('click', () => {
  localStorage.clear()
})
if (role2 === 'A') {
  let div = document.getElementById('displaybranch')
  div.innerHTML = `<button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display particular branch's details</button>
    <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all branch details</button>
    <button type="button" id="btn3" class="btn btn-primary btn-lg btn-block">Appoint a new Manager</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  let btn3 = document.getElementById('btn3')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/branchtable1.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/branchtable2.html'
  })
  btn3.addEventListener('click', (e) => {
    window.location.href = './newbranchmanager.html'
  })
} else {
  let div = document.getElementById('displaybranch')
  div.innerHTML = `<button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display particular branch's details</button>
    <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all branch details</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/branchtable1.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/branchtable2.html'
  })
}
