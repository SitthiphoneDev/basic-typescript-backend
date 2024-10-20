import { PrismaClient } from "@prisma/client";
import type { Request, Response, Router } from "express";
import express from "express";
import { userRoutes } from "./modules/users";

const router: Router = express.Router();
const prisma = new PrismaClient();

router.use('/users', userRoutes);

export default router;
