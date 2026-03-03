import express from "express"
import dotenv, { parse } from "dotenv"
dotenv.config()
import connectdb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import shopRouter from "./routes/shop.routes.js"
import itemRouter from "./routes/item.routes.js"
import helmet from "helmet" 
import bodyParser from "body-parser"
import compression from "compression"
import cartRoute from "./routes/cart.route.js"

const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true 
}))
app.use((express.json()))
app.use(cookieParser())

//Routes
app.use("/api/auth",authRouter)
app.use("/api/user/",userRouter)
app.use("/api/shop/",shopRouter)
app.use("/api/item/",itemRouter)
app.use("api/cart/",cartRoute)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(helmet());
app.use(compression)

const port = process.env.PORT || 3000

app.listen(port,() =>{
    connectdb() 
    console.log("server Started at",port)
}
)