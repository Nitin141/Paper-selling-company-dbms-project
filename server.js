const express=require("express");
// const http=require("http");
// const fs=require("fs")
const db=require("./db");
const app=express();
const cors=require("cors");
app.use(
    cors()
)
app.use(
    express.json({
        extended:false,
    }
    )
);

app.get("/get",(req,res)=>{
    res.json({"Hello":"Hello"});

})
app.post("/login",async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    let query=`select * from admin`;
    let query2='select count(*) as count from admin';
    let result=await db.query(query);
    let count=await db.query(query2);
    // console.log(count[0][0].count);
    let i,c=0;
    for(i=0;i<count[0][0].count;i++)
    {
        if((`${password}`==result[0][i].password)&&(`${username}`==result[0][i].username))
        {   
            c++;
        }
    }
    if(c!=0)
        res.status(200).json({});
       else {
        res.status(500).json({"error":"Wrong password"});
         }
})
app.post("/signup",async(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;
    var cpassword=req.body.cpassword;
    let query=`select * from admin`;
    let query2='select count(*) as count from admin';
    let result=await db.query(query);
    let count=await db.query(query2);
    let c=0;
    // var dateformat=`Select DATE_FORMAT("${birthdate}","%Y-%m-%d");`
    // birthdate=await db.query(dateformat);
    if(`${password}`==`${cpassword}`){
        for(i=0;i<count[0][0].count;i++)
        {
            if((`${password}`==result[0][i].password)||(`${username}`==result[0][i].username))
            {   
                c++;
            }
        }
        if(c==0)
         {      let query3=`insert into admin values("${username}","${password}")`;
                let result1=await db.query(query3);
        // console.log(result);
                res.json({"msg":"data inserted"});
            }
            else{
                res.status(400).json({"error":"username or password already exists"});
            }
        }
else
    {
        res.status(500).json({"error":"Wrong password"});
    }

})


const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})