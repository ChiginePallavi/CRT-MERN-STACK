import express from "express"; 

// const express = require("express"); 
let students =[
    {
        id:101,
        studentName:"Pallavi",
        branch:"CSE-AI",
        Cgpa:8.54
    },
    {
        id:102,
        studentName:"Rohit",
        branch:"CS",
        Cgpa:8.7
    },
    {
        id:103,
        studentName:"Rohit",
        branch:"CSE",
        Cgpa:9.2
    },

]

const app = express();
//Middleware - converts json - js object
app.use(express.json());
app.get("/students",(req,res)=>{
    res.json(students);
});

app.get("/students/:id",(req,res)=>{
    const id = Number(req.params.id);
    const student = students.find((student)=>student.id==id);
    res.json(student);
});
app.post("/students",(req,res)=>{
    const student = req.body;
//this req.body consists of react form data
    students.push(student);
    res.status(201).json({
        message:"Student Added",
    })
    console.log(students);
});
console.log(students);
//Create an array named as companies
//store 2 companies
//id,name,num_of_emp
//create a route with POST
//test with POSTMAN
let companies = [
    {
        id:108,
        name:"TCS",
        num_of_emp:50000
    },
    {
        id:109,
        name:"Infosys",
        num_of_emp:30000
    }
];
app.post("/companies",(req,res)=>{
    const company = req.body;
    companies.push(company);
    res.status(201).json({
        message:"Company Added",
    });
});


//Task:when i visit homepage I should get your name 
app.get("/home",(req,res)=>{
    res.json("Pallavi");
});

app.listen(5000,()=>{
    console.log("Server is started at 5000");
});
