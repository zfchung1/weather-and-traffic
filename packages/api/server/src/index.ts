/* istanbul ignore file */
import express from "express";
import helmet from "helmet";
import locationRoute from "./routes/location";
import cors from "cors";

const app = express();
app.use(helmet());


app.use(helmet())
	.use(express.urlencoded({ extended: false }))
	.use(express.json())
	.use(
		cors({
			origin: ["http://localhost:3000"],
			credentials: true
		})
	)
	.use("/locations", locationRoute);


export default app;
