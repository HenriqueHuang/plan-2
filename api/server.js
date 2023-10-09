const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Henrique:7539518462@cluster0.60sf1.mongodb.net/ChuteSal?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB connected")).catch(console.error)

const Quadra = require("./models/Quadra")

app.get("/quadra",async(req,res)=>{
    const quadras = await Quadra.find()
    console.log(quadras)
    res.json(quadras)
})

app.get("/quadra/new",(req,res)=>{
    const {cod_Quadra,nome,letra,cod_Unidade} = req.body

    const quadra = new Quadra({
        cod_Quadra:"0",
        nome:"0",
        letra:"0",
        cod_Unidade:"0"
    })
    quadra.save()

    res.json(quadra)
})

app.listen(3000,()=> console.log("Server start"))