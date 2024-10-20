import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { route } from "./user.bootstrap";
import { z } from "zod";

export class UserController {
    constructor(protected userRepository: UserRepository) { }

    getAllUsers = route.get('/').handler(async () => {
        return {
            data: await this.userRepository.getAllUsers(),
        };
    });

    getUser = route.get('/:id').param(z.object({
        id: z.string()
    }))
        .handler(async ({ param }) => {
            const data = await this.userRepository.getUser(param.id);
            if (!data) {
                throw new Error('User not found');
            }
            return {
                data
            };
        });

    createUser = route.
        post("/")
        .body(z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string()
        })).handler(async ({ body }) => {
            await this.userRepository.createUsers(body);
            return {
                message: "User created successfully",
                data: body
            };
        });

    updateUser = route.put('/:id')
        .param(z.object({ id: z.string() }))
        .body(z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string(),
        }))
        .handler(async ({ param, body }) => {
            const data = await this.userRepository.updateUser(param.id, body);
            return {
                message: "User updated successfully",
                data,
            };
        });

    deleteUser = route.delete('/:id').param(z.object({ id: z.string() }))
        .handler(async ({ param }) => {
            const data = await this.userRepository.delete(param.id);
            return {
                message: "User deleted successfully"
            }
        });
}
