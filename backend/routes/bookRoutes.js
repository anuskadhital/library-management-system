
const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// Get all available books
router.get("/available", async (req, res) => {
  try {
    const books = await Book.find({ status: "available" });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books" });
  }
});

 // Add a new book
router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add book",
      error: error.message
    });
  }
});


 // Check out a book

router.post("/:id/checkout", async (req, res) => {
  try {
    const { checkedOutBy, dueDate } = req.body;

    if (!checkedOutBy || !dueDate) {
      return res.status(400).json({
        message: "Borrower name and due date are required"
      });
    }

    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "available"
      },
      {
        $set: {
          status: "checked out",
          checkedOutBy: checkedOutBy,
          dueDate: dueDate
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found or already checked out"
      });
    }

    res.json(book);

  } catch (error) {
    res.status(400).json({
      message: "Failed to check out book",
      error: error.message
    });
  }
});

 // Get all checked-out books
router.get("/checked-out", async (req, res) => {
  try {
    const books = await Book.find({ status: "checked out" });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve checked-out books"
    });
  }
});


 // Check in (return) a book
router.post("/:id/checkin", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "checked out"
      },
      {
        $set: {
          status: "available",
          checkedOutBy: null,
          dueDate: null
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found or already available"
      });
    }

    res.json(book);

  } catch (error) {
    res.status(400).json({
      message: "Failed to check in book",
      error: error.message
    });
  }
});

module.exports = router;
