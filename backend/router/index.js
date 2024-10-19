import { Router } from "express";
import booksRoute from "./books.route.js";

// express router
const router = Router();

// child routes
router.use("/books",booksRoute);

export default router;