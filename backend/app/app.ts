import express from "express"
import cors from "cors";
import router from "../routes/controller.routes";

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1", router)

app.get("/health", (req, res) => {
  res.status(200).send("ok");
});

export default app