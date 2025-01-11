import { Request, Response } from "express";
import { assignUserToAstrologer } from "../utils/assignedUser";
import User from "../models/User";
import Astrologer from "../models/Astrologer";

export const assignUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ assignedAstrologer: { $exists: false } });

    if (!users.length) {
      res.status(200).send({ message: "No users to assign." });
      return;
    }

    const results = [];
    for (const user of users) {
      const assignedData = await assignUserToAstrologer(user);
      results.push(assignedData);
    }

    console.log("Users distributed to astrologers:", results);
    res.status(200).send({
      message: "Users distributed to astrologers successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error during user assignment:", error);
    res.status(500).send({ message: "An error occurred during user assignment", error });
  }
};

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).send({
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "An error occurred while fetching users", error });
  }
};

export const getAllAstrologer = async (req: Request, res: Response): Promise<void> => {
  try {
    const astrologers = await Astrologer.find();
    res.status(200).send({
      message: "All astrologers fetched successfully",
      data: astrologers,
    });
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    res.status(500).send({ message: "An error occurred while fetching astrologers", error });
  }
};

export const getHigherRatingAstrologer = async (req: Request, res: Response): Promise<void> => {
  try {
    const astrologer = await Astrologer.find().sort({ rating: -1 });
    res.status(200).send({
      message: "Astrologer with highest rating fetched successfully",
      data: astrologer,
    });
  } catch (error) {
    console.error("Error fetching astrologer with highest rating:", error);
    res.status(500).send({ message: "An error occurred while fetching astrologer", error });
  }
};

export const getHigherConnectionAstrologer = async (req: Request, res: Response): Promise<void> => {
  try {
    const astrologer = await Astrologer.find().sort({ connection: -1 });
    res.status(200).send({
      message: "Astrologer with highest connections fetched successfully",
      data: astrologer,
    });
  } catch (error) {
    console.error("Error fetching astrologer with highest connections:", error);
    res.status(500).send({ message: "An error occurred while fetching astrologer", error });
  }
};
