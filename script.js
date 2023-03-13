let myLibrary = [];
let bookInDom = [];

function Book(title, author, pages, readingStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readingStatus = readingStatus;
}

Book.prototype.toggleReadingStatus = function (userInputReadingStatus) {
  this.readingStatus = userInputReadingStatus;
};

function removeBookFromLibrary(book) {
  let index = book.locationInLibrary;
  bookContainer.removeChild(bookInDom[index]);
}

function displayNewBook(book) {
  let index = book.locationInLibrary;
  bookInDom[index] = document.createElement("div");
  bookInDom[index].append("Title: " + book.title + "\n");
  bookInDom[index].append("Author: " + book.author + "\n");
  bookInDom[index].append("Number of Pages: " + book.pages + "\n");
  bookInDom[index].append("Reading Status: " + book.readingStatus);

  bookInDom[index].classList.add("book");
  bookContainer.appendChild(bookInDom[index]);
}

function addBookToLibrary() {
  let book = new Book(
    prompt("What is the title of the book?", "Unknown Name"),
    prompt("Who is the author of the book?", "Unknown Author"),
    prompt("How many pages are in the book?", "Unknown"),
    prompt("Have you read this book?", "Unread")
  );

  // Store location of book inside the myLibrary array inside the book object itself
  // As we have not pushed the book object to myLibrary yet, the book's location is going to by myLibrary.length
  book.locationInLibrary = myLibrary.length;

  myLibrary.push(book);
  displayNewBook(book);
}

btn = document.querySelector(".btn");
bookContainer = document.querySelector(".book-container");

btn.addEventListener(
  "click",
  () => {
    addBookToLibrary();
  },
  false
);
