let role2 = localStorage.getItem('role')
console.log(role2)
let log = document.getElementById('logout')
log.addEventListener('click', () => {
  localStorage.clear()
})
if (role2 === 'A') {
  let div = document.getElementById('displayclient')
  div.innerHTML = ` <button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display particular client's details</button>
        <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all client's  details</button>
        <button type="button" id="btn3" class="btn btn-primary btn-lg btn-block">Insert a new client</button>
        <button type="button" id="btn4" class="btn btn-primary btn-lg btn-block">Delete an existing client record</button>
        <button type="button" id="btn5" class="btn btn-primary btn-lg btn-block">Display client by their net sales amount</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  let btn3 = document.getElementById('btn3')
  let btn4 = document.getElementById('btn4')
  let btn5 = document.getElementById('btn5')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/clienttable.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/clienttable1.html'
  })
  btn3.addEventListener('click', (e) => {
    window.location.href = './insertclient.html'
  })
  btn4.addEventListener('click', (e) => {
    window.location.href = './deleteclient.html'
  })
  btn5.addEventListener('click', (e) => {
    window.location.href = './netsales.html'
  })
} else {
  let div = document.getElementById('displayclient')
  div.innerHTML = ` <button type="button" id="btn1" class="btn btn-primary btn-lg btn-block">Display particular client's details</button>
        <button type="button" id="btn2" class="btn btn-primary btn-lg btn-block">Display all client's  details</button>`
  let btn1 = document.getElementById('btn1')
  let btn2 = document.getElementById('btn2')
  btn1.addEventListener('click', (e) => {
    window.location.href = './table/clienttable.html'
  })
  btn2.addEventListener('click', (e) => {
    window.location.href = './table/clienttable1.html'
  })
}
