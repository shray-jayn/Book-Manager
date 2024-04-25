const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.SECRET_KEY_FOR_CRYPTOJS
            ).toString(),
        });

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY_FOR_CRYPTOJS,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                ...user._doc,
                accessToken
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            const bytes = CryptoJS.AES.decrypt(
                user.password,
                process.env.SECRET_KEY_FOR_CRYPTOJS
            );
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            if (originalPassword !== password) {
                user = null;
            }
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password",
            });
        } else {
            const accessToken = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.SECRET_KEY_FOR_CRYPTOJS,
                { expiresIn: "30d" }
            );

            const { password: userPassword, ...userInfo } = user._doc;

            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: { ...userInfo, accessToken }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errorMessage: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
