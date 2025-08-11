import express from "express";
import aiRouter from "./routes/ai_route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.status(200).json({message:"Hello Server"});
})

app.use('/ai',aiRouter);

export default app;