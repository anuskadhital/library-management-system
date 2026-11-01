
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State for available and checked-out books
  const [books, setBooks] = useState([]);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  // State for the Add New Book form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");

  // Fetch available and checked-out books
  async function fetchAllBooks() {
    try {
      const availableResponse = await fetch(
        "/api/books/available"
      );

      const checkedOutResponse = await fetch(
        "/api/books/checked-out"
      );

      if (!availableResponse.ok || !checkedOutResponse.ok) {
        throw new Error("Failed to fetch books");
      }

      const availableData = await availableResponse.json();
      const checkedOutData = await checkedOutResponse.json();

      setBooks(availableData);
      setCheckedOutBooks(checkedOutData);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert(error.message);
    }
  }

  // Load books when the page opens
  useEffect(() => {
    fetchAllBooks();
  }, []);

  // Check out a book
  async function handleCheckout(bookId) {
    const borrower = prompt("Enter your name:");

    if (!borrower || !borrower.trim()) {
      return;
    }

    const dueDate = prompt("Enter due date (YYYY-MM-DD):");

    if (!dueDate) {
      return;
    }

    try {
      const response = await fetch(
        `/api/books/${bookId}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            checkedOutBy: borrower.trim(),
            dueDate: dueDate
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      alert("Book checked out successfully!");
      await fetchAllBooks();
    } catch (error) {
      alert(error.message);
    }
  }

  // Return a book
  async function handleReturn(bookId) {
    try {
      const response = await fetch(
        `/api/books/${bookId}/checkin`,
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Return failed");
      }

      alert("Book returned successfully!");
      await fetchAllBooks();
    } catch (error) {
      alert(error.message);
    }
  }

  // Add a new book
  async function handleAddBook(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          publisher: publisher.trim(),
          isbn: isbn.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add book");
      }

      alert("Book added successfully!");

      // Clear the form
      setTitle("");
      setAuthor("");
      setPublisher("");
      setIsbn("");

      await fetchAllBooks();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>Library Management System</h1>
      <p>Welcome to our library!</p>

      {/* Add New Book Form */}
      <h2>Add New Book</h2>

      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <button type="submit">
          Add Book
        </button>
      </form>

      {/* Available Books */}
      <h2>Available Books ({books.length})</h2>

      {books.length === 0 ? (
        <p>No available books found.</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Publisher: {book.publisher}</p>
              <p>ISBN: {book.isbn}</p>

              <button
                onClick={() => handleCheckout(book._id)}
              >
                Check Out
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Checked-Out Books */}
      <h2>Checked-Out Books ({checkedOutBooks.length})</h2>

      {checkedOutBooks.length === 0 ? (
        <p>No checked-out books found.</p>
      ) : (
        <div className="book-grid">
          {checkedOutBooks.map((book) => (
            <div className="book-card" key={book._id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Checked out by: {book.checkedOutBy}</p>
              <p>
                Due date:{" "}
                {book.dueDate
                  ? new Date(book.dueDate).toLocaleDateString()
                  : "Not set"}
              </p>

              <button
                onClick={() => handleReturn(book._id)}
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
