const express = require('express')
const route = require("./src/routes");
const app = express();


app.use(express.json());
app.use("/", route);

app.listen(8000,()=>console.log("Server listening to port 8000"))