import { Request, Response } from "express";
import { getAllContests } from "../services/getContests";

export const getContests = async (req: Request, res: Response) => {
    try {
        const contests = await getAllContests();

        if (!contests) {
            return res.status(400).json({
                success: false,
                message: "Unable to get the contests",
            });
        }

        return res.status(200).json({
            success: true,
            contests,
        });

    } catch (err) {
        console.error("Error fetching contests:", err);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching contests",
        });
    }
};