import express from "express";
import aiRouter from "./routes/ai_route.js";
import userRouter from "./routes/user_route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:'https://careerparto.netlify.app',
    methods:["POST", "GET", "PUT"]
}))

app.get('/',(req,res) => {
    res.status(200).json({message:"Hello Server"});
})

app.use('/ai',aiRouter);

app.use('/user',userRouter);

export default app;