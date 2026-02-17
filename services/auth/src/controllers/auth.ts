import { Request, Response } from 'express';
import { User } from '../model/User.js';
import jwt from 'jsonwebtoken';
import TryCatch from '../middleware/TryCatch.js';
import { AuthenticatedRequest } from '../middleware/isAuth.js';

export const loginUser = TryCatch(async (req, res) => {
    const { email, name, picture = "" } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({
            email,
            name,
            image: picture
        })
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
        expiresIn: '15d'
    })
    res.status(200).json({ token, user });
})

const allowedRoles = ['customer', 'rider', 'seller'] as const;
type Role = (typeof allowedRoles)[number];

export const addUserRole = TryCatch(async (req: AuthenticatedRequest, res) => {
    const { user } = req;
    if (!user || !user._id) {
        return res.status(400).json({ message: "User not authenticated" });
    }
    const { role } = req.body as { role: Role };
    if (!allowedRoles.includes(role as Role)) {
        return res.status(400).json({ message: "Invalid role" });
    }
    const updatedUser = await User.findByIdAndUpdate(user?._id, { role }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ user: updatedUser }, process.env.JWT_SECRET!, {
        expiresIn: '15d'
    })
    res.status(200).json({ message: "Role added successfully", user: updatedUser, token });
})

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
    const { user } = req;
    return res.status(200).json({ user })
})