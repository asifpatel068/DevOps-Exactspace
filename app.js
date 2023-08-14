const express= require("express")
const cors=require("cors")
require("dotenv").config()

const {connection}=require("./Config/db")
const {payload}=require("./Models/data.model")

const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome Page")
})

app.post('/data', async (req, res) => {
    const payload = req.body.data;

    try {
        const parsedData = JSON.parse(payload);
        console.log(parsedData);
        
        await payload.create({ data: payload });

        res.json(parsedData);
    } catch (error) {
        res.status(400).json({ error: 'data format in not valid' });
    }
});

app.get('/data', async (req, res) => {
    try {

        const Data = await payload.findOne().sort({ timestamp: -1 });
        if (Data) {
            res.json(JSON.parse(Data.data));
        } else {
            res.status(404).json({ message: 'data not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to Database");
    } catch (err) {
        console.log("Not connected to DB");
        console.log(err);
    }
    console.log(`Server is listening at  ${process.env.PORT}`);
});
