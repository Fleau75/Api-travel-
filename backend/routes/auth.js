import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();
const router = express.Router();

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

router.post("/register", async (req, res) => {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
        return res
            .status(400)
            .json({ message: "Invalid data", errors: validation.error.errors });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User registered successfully!",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

router.post("/login", async (req, res) => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        return res
            .status(400)
            .json({ message: "Invalid data", errors: validation.error.errors });
    }

    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (
            !user ||
            !(await bcrypt.compare(req.body.password, user.password))
        ) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Login successful!", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

router.get("/me", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            attributes: ["id", "email"],
        });
        res.json(user);
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});

export default router;
