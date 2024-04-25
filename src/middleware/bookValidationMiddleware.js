const { z } = require("zod");

const authorSchema = z.object({
    author: z.string().min(1).max(255),
});

const publicationYearSchema = z.object({
    publicationYear: z.coerce.number().int().min(1000).max(9999),
});

const bookSchema = z.object({
    title: z.string().min(1).max(255),
    author: z.string().min(1).max(255),
    publicationYear: z.number().int().min(1000).max(9999),
});

const idParamSchema = z.object({
  id: z.string().length(24),
});

const validateAuthorBody = (req, res, next) => {
    try {
        authorSchema.parse(req.query);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid request body", error: error.errors });
    }
};

const validatePublicationYearBody = (req, res, next) => {
    try {
        publicationYearSchema.parse(req.query);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid request body", error: error.errors });
    }
};

const validateBookBody = (req, res, next) => {
    try {
        bookSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid request body", error: error.errors });
    }
};

const validateIdParam = (req, res, next) => {
  try {

    
      idParamSchema.parse(req.params);
      next();
  } catch (error) {
      res.status(400).json({ success: false, message: "Invalid ID parameter", error: error.errors });
  }
};

module.exports = {
    validateAuthorBody,
    validatePublicationYearBody,
    validateBookBody,
    validateIdParam
};
