const express = require('express')
const db = require('./db')
const app = express()
const cors = require('cors')
const path = require('path')
const { dirname } = require('path')
app.use(cors())
app.use(
  express.json({
    extended: false,
  })
)
app.use('/public', express.static(path.join(__dirname, 'Slider')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'slider.html'))
})
app.get('/loginp', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'login.html'))
})
app.get('/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, 'Slider', 'forgotpass.html'))
})
app.get('/addnewuser', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'signup.html'))
})
app.get('/tables', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'tables.html'))
})
app.get('/welcome', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'welcome.html'))
})
app.get('/aboutus', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'aboutus.html'))
})
app.get('/contactus', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'contactus.html'))
})
app.get('/viewfeedback', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'viewfeedback.html'))
})
app.get('/displayemployee', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'employeedisplay.html'))
})
app.get('/displaybranch', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'branchform.html'))
})
app.get('/displayclient', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'displayclient.html'))
})
app.get('/displaysupplier', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'displaysupplier.html'))
})
app.get('/branchdetail', function (req, res) {
  res.sendFile(path.join(__dirname, 'Slider', 'table', 'branchtable1.html'))
})
app.get('/get', (req, res) => {
  res.json({ Hello: 'Hello' })
})
app.post('/login', async (req, res) => {
  let username = parseInt(req.body.username)
  let password = req.body.password
  let query = `select * from admin`
  let query2 = 'select count(*) as count from admin'
  let query3 = `select role from admin where username=${username} and password='${password}'`
  let result = await db.query(query)
  let count = await db.query(query2)
  let role = await db.query(query3)
  // console.log(count[0][0].count);
  let i,
    c = 0
  for (i = 0; i < count[0][0].count; i++) {
    if (
      `${password}` == result[0][i].password &&
      username == result[0][i].username
    ) {
      c++
    }
  }
  if (c != 0) {
    res.status(200).json({ role: role[0][0], username: username })
  } else {
    res.status(500).json({ error: 'Wrong password' })
  }
})
app.post('/newpass', async (req, res) => {
  let empid = req.body.username
  let query = `select * from admin`
  let query2 = 'select count(*) as count from admin'
  let result = await db.query(query)
  let count = await db.query(query2)
  let i,
    c = 0
  for (i = 0; i < count[0][0].count; i++) {
    if (empid == result[0][i].username) {
      c++
    }
  }
  if (c != 0) {
    res.json({ msg: 'Success' })
  } else {
    res.status(400).json({ msg: 'no such username' })
  }
})
app.post('/changepass', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let query = `update admin 
  set password='${password}'
  where username=${username}`
  let result = await db.query(query)
  try {
    res.json({ msg: 'Password changed' })
  } catch (error) {
    res.json({ msg: 'Incorrect username' })
  }
})
app.post('/signup', async (req, res) => {
  console.log('hello')
  var username = parseInt(req.body.username)
  console.log(username)
  var password = req.body.password
  var cpassword = req.body.cpassword
  var role = req.body.role
  let query = `select * from admin`
  let query1 = `select emp_id from employee`
  let query2 = 'select count(*) as count from admin'
  let query3 = 'select count(*) as count from employee'
  let result = await db.query(query)
  let result1 = await db.query(query1)
  let count = await db.query(query2)
  let count1 = await db.query(query3)
  let c = 0,
    c1 = 0
  let i
  // var dateformat=`Select DATE_FORMAT("${birthdate}","%Y-%m-%d");`
  // birthdate=await db.query(dateformat);
  if (`${password}` == `${cpassword}`) {
    for (i = 0; i < count[0][0].count; i++) {
      if (
        `${password}` == result[0][i].password ||
        username == result[0][i].username
      ) {
        c++
      }
      for (i = 0; i < count1[0][0].count; i++) {
        if (username === result1[0][i].emp_id) {
          c1++
        }
      }
    }
    if (c == 0 && c1 != 0) {
      let query3 = `insert into admin values(${username},"${password}",'${role}')`
      let result1 = await db.query(query3)
      // console.log(result);
      res.json({ msg: 'data inserted' })
    } else if (c != 0) {
      res.status(400).json({ error: 'username or password already exists' })
    } else {
      res.status(404).json({ error: 'employee id doesnot exists' })
    }
  } else {
    res.status(500).json({ error: 'Wrong password' })
  }
})
app.post('/insertemployee', async (req, res) => {
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let birthdate = req.body.birthdate
  let sex = req.body.sex
  let salary = req.body.Salary
  let id
  let supervisorid = parseInt(req.body.supervisorid)
  let branchid = parseInt(req.body.branchid)
  let query = `select * from branch`
  let query1 = `select * from employee`
  let query2 = `select count(*) as count from branch`
  let query3 = `select count(*) as count from employee`
  result1 = await db.query(query)
  result2 = await db.query(query1)
  count1 = await db.query(query2)
  count2 = await db.query(query3)
  //   console.log(result1[0][0].branch_id);

  let i,
    c = 0,
    c1 = 0
  for (i = 0; i < count1[0][0].count; i++) {
    if (result1[0][i].branch_id == branchid) {
      c++
    }
  }
  for (i = 0; i < count2[0][0].count; i++) {
    if (result2[0][i].super_id == supervisorid) {
      c1++
    }
  }
  id = result2[0][i - 1].emp_id + 1
  console.log(c1)
  if (c1 != 0 && c != 0) {
    let query4 = `insert into employee values(${id},'${firstname}','${lastname}','${birthdate}','${sex}',
    ${salary},${supervisorid},${branchid})`
    try {
      empinsert = await db.query(query4)
      res.json({ msg: 'data inserted' })
    } catch (error) {
      if (error.sqlState === '22012')
        res.status(500).json({ error: 'BIRTHDAY check' })
      else if (error.sqlState === '45000') {
        res.status(400).json({ error: 'salary error' })
      }
    }
  } else {
    res.status(404).json({ error: 'Incorrect branch or supervisor' })
  }
})
app.post('/emppersonal', async (req, res) => {
  let empid = req.body.empid

  let query = ` select * from employee where emp_id=${empid};`

  try {
    var result = await db.query(query)
    console.log(result[0])
    if (result[0].length == 0)
      res.status(400).json({ msg: `wrong employee credentials` })
    else res.json(result[0])
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: `error occured ${err}` })
  }
})
app.get('/emppersonalall', async (req, res) => {
  let query = `select * from employee`

  try {
    var result = await db.query(query)
    console.log(typeof result[0][0].birth_day)
    console.log(result[0])
    res.json(result[0])
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: `error occured ${err}` })
  }
})
app.post('/empsales', async (req, res) => {
  let empid = req.body.empid
  let query = `select * from works_with
   where emp_id=${empid}`
  try {
    var result = await db.query(query)
    console.log(result[0])
    if (result[0].length == 0)
      res.status(400).json({ msg: `wrong employee credentials` })
    else res.json(result[0])
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: `error occured ${err}` })
  }
})
app.get('/empsalesall', async (req, res) => {
  let query = `select e.emp_id,first_name,last_name,sum(total_sales) as totalsales
   from employee e,works_with w
   where e.emp_id=w.emp_id
   group by w.emp_id;`
  try {
    var result = await db.query(query)
    console.log(result[0])
    res.json(result[0])
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: `error occured ${err}` })
  }
})
app.post('/insertworkswith', async (req, res) => {
  let empid = req.body.empid
  let clientid = req.body.clientid
  let totalsales = req.body.totalsales
  let query = `insert into works_with values(${empid},${clientid},${totalsales})`
  let query1 = `select branch_id from employee where emp_id=${empid}`
  let query2 = `select branch_id from client where client_id=${clientid}`
  let result1 = await db.query(query1)
  let result2 = await db.query(query2)
  // console.log(result1[0][0].branch_id);
  if (result1[0][0].branch_id == result2[0][0].branch_id) {
    try {
      let result = await db.query(query)
      res.json({ msg: 'data inserted' })
    } catch (err) {
      res.status(500).json({ error: 'Incorrect empid or clientid' })
    }
  } else {
    res.status(400).json({ error: 'error' })
  }
})
app.post('/deleteemployee', async (req, res) => {
  let empid = parseInt(req.body.empid)
  let query = `select * from employee`
  let result = await db.query(query)
  let query2 = `select * from branch`
  let result2 = await db.query(query2)
  let query3 = `select count(*) as count from branch`
  let result3 = await db.query(query3)
  let query1 = `select count(*) as count from employee`
  let result1 = await db.query(query1)
  let c = 0,
    c1 = 0
  let i
  for (i = 0; i < result1[0][0].count; i++) {
    if (result[0][i].emp_id === empid) {
      c1 = 1
      break
    }
  }
  for (i = 0; i < result3[0][0].count; i++) {
    if (result2[0][i].mgr_id === empid) {
      c = 1
      break
    }
  }

  console.log(c1)

  if (c == 0 && c1 != 0) {
    try {
      let query4 = `delete from employee where emp_id=${empid} `
      let result4 = await db.query(query4)
      res.json({ msg: 'employee data deleted' })
    } catch (err) {
      res.status(400).json({ msg: 'Incorrect employee id' })
    }
  } else if (c != 0 && c1 != 0) {
    let query5 = `delete from employee where emp_id=${empid} `
    let result5 = await db.query(query5)
    res.status(500).json({
      id: `${result2[0][i].mgr_id}`,
      name: `${result2[0][i].branch_name}`,
      branchid: `${result2[0][i].branch_id}`,
    })
  } else if (c == 0 && c1 == 0) {
    res.status(400).json({ msg: 'Incorrect employee id' })
  }
})
app.post('/newmanager', async (req, res) => {
  let mgrid = req.body.managerid
  let branchid = req.body.branchid

  let query = `CALL SetnewManager(${mgrid},${branchid})`
  try {
    let result = db.query(query)
    res.json({ msg: 'New manager appointed' })
  } catch (err) {
    res.status(400).json({ msg: 'Incorrect manager id or branchid' })
  }
})
app.post('/insertclient', async (req, res) => {
  let clientname = req.body.clientname
  let branchname = req.body.branchname
  let query = `select branch_id from branch 
  where branch_name='${branchname}'`
  let query1 = `select count(*) as count from client`
  let query2 = `select * from client`
  let count = await db.query(query1)
  let result1 = await db.query(query2)
  let result
  result = await db.query(query)
  if (result[0].length == 0)
    res.status(400).json({ msg: 'Incorrect branchname' })
  else {
    let branchid = result[0][0].branch_id
    let i
    for (i = 0; i < count[0][0].count; i++);
    console.log(i)
    let clientid = result1[0][i - 1].client_id + 1
    console.log(clientid)
    let query3 = `insert into client values(${clientid},'${clientname}',${branchid})`
    try {
      let result2 = await db.query(query3)
      res.json({ msg: 'Data inserted' })
    } catch (err) {
      res.status(500).json({ msg: 'Some error occured' })
    }
  }
})
app.post('/insertsupplier', async (req, res) => {
  let branchid = req.body.branchid
  let suppliername = req.body.suppliername
  let product = req.body.product
  let query = `select branch_name from branch where branch_id=${branchid}`
  let result = await db.query(query)
  if (result[0].length == 0) {
    res.status(400).json({ msg: 'Incorrect branch id' })
  } else {
    let query1 = `insert into branch_supplier values(${branchid},'${suppliername}','${product}')`
    try {
      let result1 = await db.query(query1)
      res.json({ msg: 'Supplier information inserted successfully' })
    } catch (err) {
      res.status(500).json({ msg: err })
    }
  }
})
app.post('/clientpersonal', async (req, res) => {
  let clientid = req.body.clientid
  let query = `select * from client where client_id='${clientid}'`
  try {
    let result = await db.query(query)
    if (result[0].length == 0) {
      res.status(400).json({ msg: 'Incorrect client name' })
    } else {
      res.json(result[0])
    }
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})
app.get('/clientall', async (req, res) => {
  let query = `select * from client`
  try {
    result = await db.query(query)
    res.json(result[0])
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})
app.post('/deleteclient', async (req, res) => {
  let clientname = req.body.clientname
  let query = `delete from client where client_name='${clientname}'`
  let query1 = `select * from client where client_name='${clientname}'`
  let result = await db.query(query1)
  if (result[0].length != 0) {
    try {
      let result1 = await db.query(query)
      res.json({ msg: 'Client data deleted' })
    } catch {
      res.status(400).json({ msg: 'Some error occured' })
    }
  } else {
    res.status(500).json({ msg: 'Incorrect client name' })
  }
})
app.post('/deletesupplier', async (req, res) => {
  let suppliername = req.body.suppliername
  let query = `delete from branch_supplier where supplier_name='${suppliername}'`
  let query1 = `select * from branch_supplier where supplier_name='${suppliername}'`
  let result = await db.query(query1)
  if (result[0].length != 0) {
    try {
      let result1 = await db.query(query)
      res.json({ msg: 'Supplier data deleted' })
    } catch {
      res.status(400).json({ msg: 'Some error occured' })
    }
  } else {
    res.status(500).json({ msg: 'Incorrect supplier name' })
  }
})
app.post('/supplierpersonal', async (req, res) => {
  let suppliername = req.body.suppliername
  let branchid = req.body.branchid
  let query = `select * from branch_supplier where supplier_name='${suppliername}'and branch_id=${branchid}`
  try {
    let result = await db.query(query)
    if (result[0].length == 0) {
      res.status(400).json({ msg: 'Incorrect supplier name' })
    } else {
      res.json(result[0])
    }
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})
app.get('/supplierall', async (req, res) => {
  let query = `select * from branch_supplier`
  try {
    result = await db.query(query)
    res.json(result[0])
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})
app.get('/branchall', async (req, res) => {
  let query = `select * from branch`
  try {
    result = await db.query(query)
    res.json(result[0])
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})
app.post('/onebranch', async (req, res) => {
  let branchid = req.body.branchid
  let query = `select * from branch where branch_id='${branchid}'`
  try {
    let result = await db.query(query)
    if (result[0].length == 0) {
      res.status(400).json({ msg: 'Incorrect branch name' })
    } else {
      res.json(result[0])
    }
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})
app.post('/bestemployee', async (req, res) => {
  let increment = req.body.increment
  let query = `CALL GetBestEmployee(${increment})`
  try {
    let result = await db.query(query)
    res.json(result[0][0])
  } catch (error) {
    res.status(500).json({ msg: err })
  }
})
app.get('/netclientsales', async (req, res) => {
  let query = `select W.client_id,client_name,SUM(total_sales) as netsales
from works_with W,client C
where W.client_id=C.client_id
GROUP BY W.client_id
ORDER BY netsales DESC`
  try {
    let result = await db.query(query)
    res.json(result[0])
  } catch (error) {
    res.status(500).json({ msg: err })
  }
})
app.post('/insertcontact', async (req, res) => {
  let emp_id = req.body.emp_id
  let date = req.body.date
  let fid = new Date().getTime() / 1000
  fid = parseInt(fid)
  let email = req.body.email
  let message = req.body.message
  console.log(message)
  let query = `insert into feedback values('${email}','${message}',${emp_id},${fid},'${date}')`
  console.log(query)
  let result = await db.query(query)
  try {
    res.json({ msg: 'Thank you for your feedback' })
  } catch (error) {
    res.status(500).json({ msg: `${error}` })
  }
})
app.post('/saleinfo', async (req, res) => {
  let emp_id = req.body.emp_id
  let query = `select e.emp_id,first_name,last_name,client_name,total_sales as totalsales
   from employee e,works_with w,client c
   where e.emp_id=w.emp_id
   and w.client_id=c.client_id
   and e.emp_id=${emp_id}`
  try {
    var result = await db.query(query)
    if (result[0].length !== 0) {
      res.json(result[0])
    } else {
      res.status(400).json({ msg: `no sales yet` })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: `error occured ${err}` })
  }
})
app.get('/getfeedback', async (req, res) => {
  let query = `select first_name,last_name,feedback,email,date
  from employee e,feedback f
  where e.emp_id=f.emp_id
  order by date desc`
  try {
    let result = await db.query(query)

    // let query1 = `delete from feedback`
    // await db.query(query1)
    if (result[0].length !== 0) res.json(result[0])
    else res.status(400).json({ msg: `no feedbacks` })
  } catch (error) {
    res.status(500).json({ msg: `Some error occured` })
  }
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
