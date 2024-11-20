import express from 'express'
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {JWT_SECRET} from './keys'
import { key } from './keys';
import z, { optional, string } from 'zod'
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://admin:g!VQGQn7tqB*82P@cluster0.ekkva.mongodb.net/feedback');
const userSchema = new Schema({
    //@ts-ignore
    username:{type:"string" ,require:true,unique:true},
    //@ts-ignore
    password:{type:"string" ,require:true,unique:true},
    Admin:{type:'boolean'}
    
})
const userModel   = mongoose.model("users",userSchema);
const app  = express();
app.use(express.json());
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
app.listen(3000);