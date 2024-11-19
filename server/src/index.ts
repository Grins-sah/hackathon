import express from 'express'
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import z, { string } from 'zod'
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const JWT_SECRET = "DARKSIDE"
mongoose.connect('mongodb+srv://admin:g!VQGQn7tqB*82P@cluster0.ekkva.mongodb.net/feedback');
const userSchema = new Schema({
    //@ts-ignore
    username:{type:"string" ,require:true,unique:true},
    //@ts-ignore
    password:{type:"string" ,require:true,unique:true}
    
})
const userModel   = mongoose.model("users",userSchema);
const app  = express();
app.use(express.json());
interface User{
    username: string;
    password:string;
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
app.listen(3000);