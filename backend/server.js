const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://chiragkp07_db_user:Mayan2006@ac-ygognj8-shard-00-00.7zbocdk.mongodb.net:27017,ac-ygognj8-shard-00-01.7zbocdk.mongodb.net:27017,ac-ygognj8-shard-00-02.7zbocdk.mongodb.net:27017/?ssl=true&replicaSet=atlas-k1o2y4-shard-0&authSource=admin&appName=Cluster0")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

app.listen(5000, ()=>console.log("Server running on 5000"));