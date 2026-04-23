const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://dbUser:sharmapranjal99@ac-vduzoec-shard-00-00.7lhti3v.mongodb.net:27017,ac-vduzoec-shard-00-01.7lhti3v.mongodb.net:27017,ac-vduzoec-shard-00-02.7lhti3v.mongodb.net:27017/?ssl=true&replicaSet=atlas-iqv0aw-shard-0&authSource=admin&appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

app.listen(5000, ()=>console.log("Server running on 5000"));
