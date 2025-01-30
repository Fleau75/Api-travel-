import express from "express";
import { Item } from "../models/index.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { z } from "zod";

const router = express.Router();

const itemSchema = z.object({
    name: z.string().min(2, "Item name must be at least 2 characters long"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    status: z.enum(["not taken", "taken"]),
});

router.get("/:tripId", authenticateToken, async (req, res) => {
    const items = await Item.findAll({ where: { TripId: req.params.tripId } });
    res.json(items);
});

router.post("/:tripId", authenticateToken, async (req, res) => {
    const validation = itemSchema.safeParse(req.body);
    if (!validation.success) {
        return res
            .status(400)
            .json({ message: "Invalid data", errors: validation.error.errors });
    }

    try {
        const item = await Item.create({
            ...req.body,
            TripId: req.params.tripId,
        });
        res.status(201).json({ message: "Item created successfully!", item });
    } catch (error) {
        res.status(500).json({ message: "Error creating item", error });
    }
});

router.put("/:itemId", authenticateToken, async (req, res) => {
    const validation = itemSchema.safeParse(req.body);
    if (!validation.success) {
        return res
            .status(400)
            .json({ message: "Invalid data", errors: validation.error.errors });
    }

    try {
        const item = await Item.findByPk(req.params.itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        await item.update(req.body);
        res.json({ message: "Item updated successfully!", item });
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error });
    }
});

router.delete("/:itemId", authenticateToken, async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        await item.destroy();
        res.json({ message: "Item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error });
    }
});

router.patch("/:itemId/toggle", authenticateToken, async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.status = item.status === "taken" ? "not taken" : "taken";
        await item.save();

        res.json({ message: "Item status toggled!", item });
    } catch (error) {
        res.status(500).json({ message: "Error toggling item status", error });
    }
});

export default router;
