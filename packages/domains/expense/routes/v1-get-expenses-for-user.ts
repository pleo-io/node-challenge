import { Router } from "express";
import { handlerFunction } from "./controllers/expense";

export const router = Router();

router.get("/get-expenses-for-user", handlerFunction);
