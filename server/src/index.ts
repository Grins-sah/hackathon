import express from 'express'
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {JWT_SECRET} from './keys'
import { key } from './keys';
import z, { optional, string } from 'zod'
import mongoose from 'mongoose';
import cors from 'cors'
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://admin:g!VQGQn7tqB*82P@cluster0.ekkva.mongodb.net/feedback');
const userSchema = new Schema({
    //@ts-ignore
    username:{type:"string" ,require:true,unique:true},
    //@ts-ignore
    password:{type:"string" ,require:true,unique:true},
    Admin:{type:'boolean'}
    
})
const teacherSchema = new Schema({
    teacherName:{type:"string",require:true},
    session:{type:"string",require:true},
    dept:{type:"string",require:true},
    classArr:{type:[],require:true},
    subject:{type:"string",require:true}
})
const userModel   = mongoose.model("users",userSchema);
const teacherModel = mongoose.model("teacher",teacherSchema);
const app  = express();
app.use(express.json());
app.use(cors());
interface User{
    username: string;
    password:string;
    Admin?:boolean;
}
//@ts-ignore
app.post('/signup',async function (req:Request<{} ,{},User> ,res:Response<{},json,{
    msg:string
}>){
    const username = req.body.username;
    const password = req.body.password;
    const hashedpass = await bcrypt.hash(password,5);
    try{
        await userModel.create({
            username:username,
            password:hashedpass
        })
        res.json({
            msg:"you have signed in"
        })
    }catch(err:any){
        res.json({
            msg:err.errmsg
        })
    }
})
//@ts-ignore
app.post('/signin',async function (req:Request<{} ,{},User> ,res:Response<{},json,{
    msg:string
}>){
    const username = req.body.username;
    const password = req.body.password;
    try{
        //@ts-ignore
        const found:User = await userModel.findOne({username});
        if(found){
            const result = await bcrypt.compare(password,found.password)
            const token = Jwt.sign({
                username:username
            },JWT_SECRET);
            res.json({
                token:token
            })
        }
        else{
            res.json({
                msg:"user not found"
            })
        }
    }catch(err:any){
        res.json({
            msg:err.errmsg
        })
    }
})
app.post('/adminSignup',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const keyAdmin = req.body.key;
    const hashedpass = await bcrypt.hash(password,5);
    if(key === keyAdmin){
        try{
        await userModel.create({
            username,password:hashedpass,Admin:true
        })
        res.json({
            msg:"admin created"
        })
        }catch(err:any){
            res.json({
                msg:err.errmsg
            })
        }

    }
    else{
        res.status(404).json({
            msg:"User is not allowed to be admin"
        })
    }



})
app.post('/adminSignin',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const keyAdmin = req.body.key;
    if(key === keyAdmin){
        try{
            const found = await userModel.findOne({
                username:username
            });
            console.log(found);
            if(found){
                //@ts-ignore
                const result = await bcrypt.compare(password,found.password)
                const token  = Jwt.sign({
                    username:username
                },JWT_SECRET);
                console.log(token);
                res.json({
                    token:token
                })

            }else{
                res.json({
                    msg:"User not found"
                })
            }
        }catch(err:any){
            res.json({
                msg:err.errmsg
            })
        }

    }
    else{
        res.status(404).json({
            msg:"User is not allowed to access"
        })
    }



})
app.post('/create',async (req,res)=>{
    const teacherName = req.body.teacherName;
    const session = req.body.session;
    const deptName = req.body.deptName;
    const classArr = req.body.classArr;
    const subject = req.body.subject;
    try{
        const result = await teacherModel.create({teacherName,session,deptName,classArr,subject});
        console.log(result); 
        res.json({
            msg:"success"
        })
    }catch(e:any){
        res.json({
            msg:e.errmsg
        })
    }
});
app.get('/teachers',async (req,res)=>{
    const data = await teacherModel.find();
    res.json({
        msg:data
    })
})

app.post('/teacher/:id',async (req,res)=>{
    const id = req.params.id
    const teacherName = req.body.teacherName;
    const session = req.body.session;
    const deptName = req.body.deptName;
    const classArr = req.body.classArr;
    const subject = req.body.subject;
    try{
        const found = teacherModel.findById(id);
        await found.updateMany({teacherName,session,deptName,classArr,subject});
        res.json({
            msg:"Teacher Updated"
        })
    }
    catch(e:any){
        res.json({
            msg:e.errmsg
        })
    }
    
})

app.listen(3000);
// dashbord teacherid daashBoard profile pages
// shareLink teacheradd 