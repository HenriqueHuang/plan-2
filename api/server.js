const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes/routes.js");

const app = express()

app.use(express.json())
app.use(cors())
app.use("/", routes);

mongoose.connect("mongodb+srv://Henrique:7539518462@cluster0.60sf1.mongodb.net/ChuteSal?retryWrites=true&w=majority",{
    useNewUrlParser:true,
}).then(()=>console.log("DB connected")).catch(console.error)

app.listen(3000,()=> console.log("Server start"))