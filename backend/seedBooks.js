require("dotenv").config();

const mongoose = require("mongoose");
const Book = require("./models/Book");

const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", publisher: "Scribner", isbn: "9780743273565" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", publisher: "Harper Perennial", isbn: "9780061120084" },
  { title: "1984", author: "George Orwell", publisher: "Signet Classics", isbn: "9780451524935" },
  { title: "Pride and Prejudice", author: "Jane Austen", publisher: "Penguin Classics", isbn: "9780141439518" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", publisher: "Mariner Books", isbn: "9780547928227" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", publisher: "Little, Brown", isbn: "9780316769488" },
  { title: "The Alchemist", author: "Paulo Coelho", publisher: "HarperOne", isbn: "9780062315007" },
  { title: "The Book Thief", author: "Markus Zusak", publisher: "Knopf", isbn: "9780375842207" },
  { title: "The Fault in Our Stars", author: "John Green", publisher: "Dutton Books", isbn: "9780525478812" }
];
async function seedBooks() {
    try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "libraryDB"
    });

    console.log("Connected to MongoDB");

    for (const book of books) {
      await Book.updateOne(
        { isbn: book.isbn },
        { $setOnInsert: book },
        { upsert: true }
      );
    }

    console.log("Books added successfully!");

  } catch (error) {
    console.error("Error adding books:", error.message);

  } finally {
    await mongoose.disconnect();
  }
}

seedBooks();
