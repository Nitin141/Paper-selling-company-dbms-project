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
