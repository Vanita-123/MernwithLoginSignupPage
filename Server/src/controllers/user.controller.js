import express from "express";
import User from "../model/user.model.js";
import createtoken from "../jwt/jwtToken.js"

// Signup
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phoneNumber } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const newUser = new User({ name, 
            email,
             password,
             confirmPassword,
             phoneNumber });

        await newUser.save();

        createtoken(newUser._id, res);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber, 
            },
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login user


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        createtoken(user._id, res);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Get Users 
export const getUser = async (req, res) => {
    try {
        const users = await User.find(); 
        return res.status(200).json(users);
    } catch (error) {
        console.error("Get User Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
 
 
// Get Single User
export const singleUser = async (req, res) => {
    const { id } = req.params;  
    try {
        const singleUserData = await User.findOne({ _id: id });
        res.status(200).json(singleUserData);
    } catch (error) {
        console.error("Get Single User Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
 
// Delete User
export const deleteUser = async (req, res) => { 
    const { id } = req.params;
    try {
        const deleteUserData = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully", user: deleteUserData });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update User
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password ,confirmPassword, phoneNumber  } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password, confirmPassword, phoneNumber },
            { new: true }



        );
 
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};  