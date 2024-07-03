const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./db/conn");
const app = express();
const userRouter = require("./routes/userRouter");
const cors=require('cors')
const dataRouter=require("./routes/displayData")

dotenv.config({ path: "./config/config.env" });
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };
  
app.use(cors(corsOptions));
  
dbConnection();
app.use(express.json()); 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/data", dataRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening at port ${process.env.PORT}`);
});
