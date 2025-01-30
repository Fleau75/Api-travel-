import express from "express";
import { Trip } from "../models/index.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { z } from "zod";

const router = express.Router();

const tripSchema = z.object({
    destination: z
        .string()
        .min(3, "Destination must be at least 3 characters long"),
    startDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
    endDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
});

router.get("/", authenticateToken, async (req, res) => {
    const trips = await Trip.findAll({ where: { UserId: req.user.id } });
    res.json(trips);
});

router.post("/", authenticateToken, async (req, res) => {
    const validation = tripSchema.safeParse(req.body);
    if (!validation.success) {
        return res
            .status(400)
            .json({ message: "Invalid data", errors: validation.error.errors });
    }

    try {
        const trip = await Trip.create({ ...req.body, UserId: req.user.id });
        res.status(201).json({ message: "Trip created successfully!", trip });
    } catch (error) {
        res.status(500).json({ message: "Error creating trip", error });
    }
});

export default router;
