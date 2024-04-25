const express = require("express");
const bookRouter = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {validateIdParam, validatePublicationYearBody, validateAuthorBody, validateBookBody} = require("../middleware/bookValidationMiddleware");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  filterBooksByAuthor,
  filterBooksByPublicationYear
} = require("../controllers/bookController");


bookRouter.use(verifyToken);



bookRouter.post("/",validateBookBody, createBook);
bookRouter.get("/", getAllBooks);
bookRouter.get("/:id",validateIdParam, getBookById);
bookRouter.put("/:id",validateIdParam, updateBookById);
bookRouter.delete("/:id",validateIdParam, deleteBookById);
bookRouter.get("/filter/author",  validateAuthorBody, filterBooksByAuthor);
bookRouter.get("/filter/publicationYear",validatePublicationYearBody, filterBooksByPublicationYear);

module.exports = bookRouter;
