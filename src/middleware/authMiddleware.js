    const jwt = require("jsonwebtoken");
    const { z } = require("zod");

    const tokenSchema = z.object({
        token: z.string(),
    });

    const verifyToken = (req, res, next) => {
        try {

            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                throw new Error("No token provided");
            }

            const { token: parsedToken } = tokenSchema.parse({ token });

            
            jwt.verify(parsedToken, process.env.SECRET_KEY_FOR_CRYPTOJS, (err, decodedToken) => {
                if (err) {
                    throw new Error("Invalid token");
                }
            
                req.user = decodedToken;
                next();
            });
        } catch (error) {
            res.status(401).json({ success: false, message: "Unauthorized", error: error.message });
        }
    };

    module.exports = verifyToken;
