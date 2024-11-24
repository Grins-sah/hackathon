"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const keys_1 = require("./keys");
const keys_2 = require("./keys");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Schema = mongoose_1.default.Schema;
mongoose_1.default.connect('mongodb+srv://admin:g!VQGQn7tqB*82P@cluster0.ekkva.mongodb.net/feedback');
const userSchema = new Schema({
    //@ts-ignore
    username: { type: "string", require: true, unique: true },
    //@ts-ignore
    password: { type: "string", require: true, unique: true },
    Admin: { type: 'boolean' }
});
const teacherSchema = new Schema({
    teacherName: { type: "string", require: true },
    session: { type: "string", require: true },
    dept: { type: "string", require: true },
    classArr: { type: [], require: true },
    subject: { type: "string", require: true }
});
const userModel = mongoose_1.default.model("users", userSchema);
const teacherModel = mongoose_1.default.model("teacher", teacherSchema);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//@ts-ignore
app.post('/signup', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const hashedpass = yield bcrypt_1.default.hash(password, 5);
        try {
            yield userModel.create({
                username: username,
                password: hashedpass
            });
            res.json({
                msg: "you have signed in"
            });
        }
        catch (err) {
            res.json({
                msg: err.errmsg
            });
        }
    });
});
//@ts-ignore
app.post('/signin', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        try {
            //@ts-ignore
            const found = yield userModel.findOne({ username });
            if (found) {
                const result = yield bcrypt_1.default.compare(password, found.password);
                const token = jsonwebtoken_1.default.sign({
                    username: username
                }, keys_1.JWT_SECRET);
                res.json({
                    token: token
                });
            }
            else {
                res.json({
                    msg: "user not found"
                });
            }
        }
        catch (err) {
            res.json({
                msg: err.errmsg
            });
        }
    });
});
app.post('/adminSignup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const keyAdmin = req.body.key;
    const hashedpass = yield bcrypt_1.default.hash(password, 5);
    if (keys_2.key === keyAdmin) {
        try {
            yield userModel.create({
                username, password: hashedpass, Admin: true
            });
            res.json({
                msg: "admin created"
            });
        }
        catch (err) {
            res.json({
                msg: err.errmsg
            });
        }
    }
    else {
        res.status(404).json({
            msg: "User is not allowed to be admin"
        });
    }
}));
app.post('/adminSignin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const keyAdmin = req.body.key;
    if (keys_2.key === keyAdmin) {
        try {
            const found = yield userModel.findOne({
                username: username
            });
            console.log(found);
            if (found) {
                //@ts-ignore
                const result = yield bcrypt_1.default.compare(password, found.password);
                const token = jsonwebtoken_1.default.sign({
                    username: username
                }, keys_1.JWT_SECRET);
                console.log(token);
                res.json({
                    token: token
                });
            }
            else {
                res.json({
                    msg: "User not found"
                });
            }
        }
        catch (err) {
            res.json({
                msg: err.errmsg
            });
        }
    }
    else {
        res.status(404).json({
            msg: "User is not allowed to access"
        });
    }
}));
app.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherName = req.body.teacherName;
    const session = req.body.session;
    const deptName = req.body.deptName;
    const classArr = req.body.classArr;
    const subject = req.body.subject;
    try {
        const result = yield teacherModel.create({ teacherName, session, deptName, classArr, subject });
        console.log(result);
        res.json({
            msg: "success"
        });
    }
    catch (e) {
        res.json({
            msg: e.errmsg
        });
    }
}));
app.get('/teachers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield teacherModel.find();
    res.json({
        msg: data
    });
}));
app.post('/teacher/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const teacherName = req.body.teacherName;
    const session = req.body.session;
    const deptName = req.body.deptName;
    const classArr = req.body.classArr;
    const subject = req.body.subject;
    try {
        const found = teacherModel.findById(id);
        yield found.updateMany({ teacherName, session, deptName, classArr, subject });
        res.json({
            msg: "Teacher Updated"
        });
    }
    catch (e) {
        res.json({
            msg: e.errmsg
        });
    }
}));
app.listen(3000);
// dashbord teacherid daashBoard profile pages
// shareLink teacheradd 
