const { z } = require('zod');

const registerSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const validateRegisterInput = (req, res, next) => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors });
    }
};

const validateLoginInput = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error.errors });
    }
};

module.exports = {
    validateRegisterInput,
    validateLoginInput
};
