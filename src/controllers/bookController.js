const Book = require("../models/Book");

// Controller function to create a new book entry
const createBook = async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;
        const newBook = await Book.create({ title, author, publicationYear });
        res.status(201).json(
            {   
                message:"Book created successfully",
                success: true, 
                book: newBook 
            });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", errorMessage: error.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", errorMessage: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.status(200).json({ success: true, book });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", errorMessage: error.message });
    }
};

const updateBookById = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.status(200).json({ success: true, book: updatedBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", errorMessage: error.message });
    }
};


const deleteBookById = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", errorMessage: error.message });
    }
};


const filterBooksByAuthor = async (req, res) => {
    try {
        const { author } = req.query;
        const books = await Book.find({ author });
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", errorMessage: error.message });
    }
};

const filterBooksByPublicationYear = async (req, res) => {
    try {
        const { publicationYear } = req.query;
        const books = await Book.find({ publicationYear });
        res.status(200).json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", errorMessage: error.message });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
    filterBooksByAuthor,
    filterBooksByPublicationYear
};
