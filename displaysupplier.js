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
