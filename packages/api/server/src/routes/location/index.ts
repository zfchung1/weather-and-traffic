import express from "express";
import asyncHandler from "express-async-handler";
import { getLocationsRequestHandler } from "./requestHandlers";

export default express
	.Router()
	.get("/", asyncHandler(getLocationsRequestHandler));
