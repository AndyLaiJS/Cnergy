import { Request } from "express";
import User from "../interfaces/userInterface";

export default interface RequestWithUser extends Request {
     user: User
};