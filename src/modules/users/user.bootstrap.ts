import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { TypedRoute } from "../../core";

export const route = new TypedRoute();
const userRepository = new UserRepository();
export const userController = new UserController(userRepository);
