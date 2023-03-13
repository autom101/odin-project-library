let myLibrary = [];

function Book(title, author, pages, readingStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readingStatus = readingStatus;
}

function displayNewBook(book) {
  newBook = document.createElement("div");
  newBook.append("Title: " + book.title + "\n");
  newBook.append("Author: " + book.author + "\n");
  newBook.append("Number of Pages: " + book.pages + "\n");
  newBook.append("Reading Status: " + book.readingStatus);

  newBook.classList.add("book");
  bookContainer.appendChild(newBook);
}

function addBookToLibrary() {
  let book = new Book(
    prompt("What is the title of the book?", "Unknown Name"),
    prompt("Who is the author of the book?", "Unknown Author"),
    prompt("How many pages are in the book?", "Unknown"),
    prompt("Have you read this book?", "Unread")
  );

  // Store location of book inside the myLibrary array inside the book object itself
  if (myLibrary.length == 0) {
    book.locationInLibrary = 0;
  } else {
    // As we have no pushed the book object to myLibrary yet, the book's location is going to by myLibrary.length
    book.locationInLibrary = myLibrary.length;
  }

  myLibrary.push(book);
  displayNewBook(book);
}

// To-do List:
// Create functions to display books in myLibrary array
// Create simple UI to let user input books that isn't prompt

btn = document.querySelector(".btn");
bookContainer = document.querySelector(".book-container");

btn.addEventListener(
  "click",
  () => {
    addBookToLibrary();
  },
  false
);
