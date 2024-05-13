import express from "express";
import asyncHandler from "express-async-handler";
import { getWeatherRequestHandler } from "./requestHandlers";

export default express
	.Router()
	.get("/", asyncHandler(getWeatherRequestHandler));
