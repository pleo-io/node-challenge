import { Router } from "express";
import { handlerFunction } from "./controllers/expense";
import { cache } from "../utility/cache";

export const router = Router();

router.get("/get-expenses-for-user", cache(10), handlerFunction);
