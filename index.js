import express from "express"
import dbConnect from "./db.js"
import config from "./config.js"
import morgan from "morgan"
import cors from "cors"

const app= express()
const port = config.PORT

app.set("trust proxy",true)

morgan.token("remote-addr", function (req) {

    return req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  });
  
morgan.token("remote-addr",function (req){
    return req.headers["x"]
})

  morgan.token("url", (req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    return req.originalUrl;
  });

  
  app.use(
    morgan(
      ":remote-addr :method :url :status :res[content-length] - :response-time ms"
    )
  );
//middleware
app.use(express.json());


//not found
app.use("*",(req,res)=>{
    res.status(403).json({
        message:"forbidden"
    })
})
 
//server connecting
dbConnect().then(()=>{
    app.listen(port,()=>{
        console.log(`server listening at ${port} `)
    })
}).catch((error)=>{
    console.log("error connecting server",error)
})