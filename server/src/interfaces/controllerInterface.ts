import { Router } from "express";

interface Controller {
     path: string;
     context: string;
     router: Router;
}

export default Controller;