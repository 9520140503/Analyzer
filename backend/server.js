import dotenv from "dotenv"
import mongoose from "mongoose";
import app from "./src/app.js"

dotenv.config()

const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log(error))

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
});

