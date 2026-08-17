import dotenv from "dotenv"
dotenv.config()

import app from "./app/app"

const PORT = process.env.PORT

app.listen(PORT, ()=> {
    console.log(`App successfully started on PORT: ${PORT}`)
})

