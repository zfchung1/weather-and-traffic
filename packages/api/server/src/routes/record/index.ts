import express from "express";
import asyncHandler from "express-async-handler";
import { getRecentSearchRequestHandler } from "./requestHandlers";

export default express
	.Router()
	.get("/", asyncHandler(getRecentSearchRequestHandler));
