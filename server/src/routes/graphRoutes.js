import { Router } from "express";
import { invokeGraph } from "../controllers/graphController.js";

const router = Router();

router.post("/", invokeGraph);

export default router;
