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
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const JWT_SECRET = "DARKSIDE";
mongoose_1.default.connect('mongodb+srv://admin:g!VQGQn7tqB*82P@cluster0.ekkva.mongodb.net/feedback');
const userSchema = new Schema({
    //@ts-ignore
    username: { type: "string", require: true, unique: true },
    //@ts-ignore
    password: { type: "string", require: true, unique: true }
});
const userModel = mongoose_1.default.model("users", userSchema);
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
                }, JWT_SECRET);
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
app.listen(3000);
