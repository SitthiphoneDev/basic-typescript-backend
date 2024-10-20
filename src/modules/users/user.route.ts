import express from "express";
import { userController } from "./user.bootstrap";
import { Router } from "../../core";

export default new Router().registerClassRoutes(userController).instance;
