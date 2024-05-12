/* istanbul ignore file */
import express from "express";
import helmet from "helmet";
import locationRoute from "./routes/location";

const app = express();
app.use(helmet());


app.use(helmet())
	.use(express.urlencoded({ extended: false }))
	.use(express.json())
	.use("/locations", locationRoute);


export default app;
