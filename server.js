const express = require("express");
// const http=require("http");
// const fs=require("fs")
const db = require("./db");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(
  express.json({
    extended: false,
  })
);

app.get("/get", (req, res) => {
  res.json({ Hello: "Hello" });
});
app.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = `select * from admin`;
  let query2 = "select count(*) as count from admin";
  let result = await db.query(query);
  let count = await db.query(query2);
  // console.log(count[0][0].count);
  let i,
    c = 0;
  for (i = 0; i < count[0][0].count; i++) {
    if (
      `${password}` == result[0][i].password &&
      `${username}` == result[0][i].username
    ) {
      c++;
    }
  }
  if (c != 0) res.status(200).json({});
  else {
    res.status(500).json({ error: "Wrong password" });
  }
});
app.post("/signup", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var cpassword = req.body.cpassword;
  let query = `select * from admin`;
  let query2 = "select count(*) as count from admin";
  let result = await db.query(query);
  let count = await db.query(query2);
  let c = 0;
  let i;
  // var dateformat=`Select DATE_FORMAT("${birthdate}","%Y-%m-%d");`
  // birthdate=await db.query(dateformat);
  if (`${password}` == `${cpassword}`) {
    for (i = 0; i < count[0][0].count; i++) {
      if (
        `${password}` == result[0][i].password ||
        `${username}` == result[0][i].username
      ) {
        c++;
      }
    }
    if (c == 0) {
      let query3 = `insert into admin values("${username}","${password}")`;
      let result1 = await db.query(query3);
      // console.log(result);
      res.json({ msg: "data inserted" });
    } else {
      res.status(400).json({ error: "username or password already exists" });
    }
  } else {
    res.status(500).json({ error: "Wrong password" });
  }
});
app.post("/insertemployee", async (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let birthdate = req.body.birthdate;
  let sex = req.body.sex;
  let salary = req.body.Salary;
  let id;
  let supervisorid = req.body.supervisorid;
  let branchid = req.body.branchid;
  let query = `select * from branch`;
  let query1 = `select * from employee`;
  let query2 = `select count(*) as count from branch`;
  let query3 = `select count(*) as count from employee`;
  result1 = await db.query(query);
  result2 = await db.query(query1);
  count1 = await db.query(query2);
  count2 = await db.query(query3);
  //   console.log(result1[0][0].branch_id);

  let i,
    c = 0,
    c1 = 0;
  for (i = 0; i < count1[0][0].count; i++) {
    if (result1[0][i].branch_id == `${branchid}`) {
      c++;
    }
  }
  for (i = 0; i < count2[0][0].count; i++) {
    if (result2[0][i].super_id == `${supervisorid}`) {
      c1++;
    }
  }
  id = result2[0][i - 1].emp_id + 1;
  // console.log(id);
  if (c1 != 0 && c != 0) {
    let query4 = `insert into employee values(${id},'${firstname}','${lastname}','${birthdate}','${sex}',
    ${salary},${supervisorid},${branchid})`;
    // console.log(query4);
    empinsert = await db.query(query4);
    res.json({ msg: "data inserted" });
  } else {
    res.status(500).json({ error: "Incorrect branch or supervisor" });
  }
});
app.post("/emppersonal", async (req, res) => {
  let empid = req.body.empid;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let query = ` select * from employee where emp_id=${empid} and first_name='${firstname}' and last_name='${lastname}';`;

  try {
    var result = await db.query(query);
    console.log(result[0]);
    res.json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: `error occured ${err}` });
  }
});
app.get("/emppersonalall", async (req, res) => {
  let query = `select * from employee`;
  try {
    var result = await db.query(query);
    console.log(result[0]);
    res.json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: `error occured ${err}` });
  }
});
app.post("/empsales", async (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let query = `select * from works_with
   where emp_id=(select emp_id from employee where first_name='${firstname}' and last_name='${lastname}');`;
  try {
    var result = await db.query(query);
    console.log(result[0]);
    res.json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: `error occured ${err}` });
  }
});
app.get("/empsalesall", async (req, res) => {
  let query = `select e.emp_id,first_name,last_name,sum(total_sales) as totalsales
   from employee e,works_with w
   where e.emp_id=w.emp_id
   group by w.emp_id;`;
  try {
    var result = await db.query(query);
    console.log(result[0]);
    res.json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: `error occured ${err}` });
  }
});
app.post("/insertworkswith", async (req, res) => {
  let empid = req.body.empid;
  let clientid = req.body.clientid;
  let totalsales = req.body.totalsales;
  let query = `insert into works_with values(${empid},${clientid},${totalsales})`;
  let query1 = `select branch_id from employee where emp_id=${empid}`;
  let query2 = `select branch_id from client where client_id=${clientid}`;
  let result1 = await db.query(query1);
  let result2 = await db.query(query2);
  // console.log(result1[0][0].branch_id);
  if (result1[0][0].branch_id == result2[0][0].branch_id) {
    try {
      let result = await db.query(query);
      res.json({ msg: "data inserted" });
    } catch (err) {
      res.status(500).json({ error: "Incorrect empid or clientid" });
    }
  } else {
    res.status(400).json({ error: "error" });
  }
});
app.post("/deleteemployee", async (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let query1 = `select emp_id from employee where first_name='${firstname}' and last_name='${lastname}'`;
  console.log(query1);
  let result1 = await db.query(query1);
  let id = result1[0][0].emp_id;
  let query2 = `select * from branch`;
  let result2 = await db.query(query2);
  let query3 = `select count(*) as count from branch`;
  let result3 = await db.query(query3);
  let c = 0;
  let i;
  for (i = 0; i < result3[0][0].count; i++) {
    if (result2[0][i].mgr_id == `${id}`) {
      c = 1;
      break;
    }
  }
  if (c == 0) {
    try {
      let query4 = `delete from employee where first_name='${firstname}' and last_name='${lastname}'`;
      let result4 = await db.query(query4);
      res.json({ msg: "employee data deleted" });
    } catch (err) {
      res.status(400).json({ msg: "Incorrect firstname or lastname" });
    }
  } else {
    let query5 = `delete from employee where first_name='${firstname}' and last_name='${lastname}'`;
    let result5 = await db.query(query5);
    res.status(500).json({
      id: `${result2[0][i].mgr_id}`,
      name: `${result2[0][i].branch_name}`,
      branchid: `${result2[0][i].branch_id}`,
    });
  }
});
app.post("/newmanager", async (req, res) => {
  let mgrid = req.body.managerid;
  let branchid = req.body.branchid;
  let branchname = req.body.branchname;
  let query = `update branch
  set mgr_id=${mgrid}
  where branch_name='${branchname}'`;
  let query2 = ` update employee
   set super_id=${mgrid}
   where branch_id=${branchid}
   and emp_id!=${mgrid}`;
  let query3 = `update employee
   set super_id=100
   where emp_id=${mgrid}`;

  try {
    let result = await db.query(query);
    let result2 = await db.query(query2);
    let result3 = await db.query(query3);
    res.json({ msg: "New manager appointed" });
  } catch (err) {
    res.status(400).json({ msg: "Incorrect manager id or branchname" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
