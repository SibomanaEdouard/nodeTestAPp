// Require the model
let books = require('../Models/BooksModel');

// This is to returns a list of all books
const getAllBooks = async (req, res) => {
    try {
        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found in the database." });
        }
        res.json({ message: "Books retrieved successfully", data: books });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books", error: error.message });
    }
};

// This is to  return details of a book by ID
const getBookById = async (req, res) => {
    try {
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book retrieved successfully", data: book });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving book", error: error.message });
    }
};

// This is to add  a new book
const addBook = async (req, res) => {
    try {
        const { title, author, year,id } = req.body;
        //this is to validate the user nput
        if (!title || !author || !year) {
            return res.status(400).json({ message: "Please provide title, author, and year for the book" });
        }
        const newBook = {
            id: books.length + 1,
            title,
            author,
            year
        };
        books.push(newBook);
        res.status(201).json({ message: "Book added successfully", data: newBook });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
};

// this is to  Update an existing book by ID
const updateBook = async (req, res) => {
    try {
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const { title, author, year } = req.body;
        if (title) book.title = title;
        if (author) book.author = author;
        if (year) book.year = year;

        res.json({ message: "Book updated successfully", data: book });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
};

// This is to delete a book by ID
const deleteBook = async (req, res) => {
    try {
        const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
        if (bookIndex === -1) {
            return res.status(404).json({ message: "The book is not found" });
        }

        const deletedBook = books.splice(bookIndex, 1);
        res.json({ message: "Book deleted successfully", data: deletedBook[0] });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
};

// Export the controllers
module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook
};