let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  let information =
    this.title +
    " by " +
    this.author +
    ", " +
    this.pages +
    " pages" +
    ", " +
    this.read +
    ".";
  return information;
};

function displayNewBook(book) {
  bookContainer = document.createElement("div");
}

function addBookToLibrary() {
  let book = new Book(
    prompt("What is the title of the book?", "Unknown Name"),
    prompt("Who is the author of the book?", "Unknown Author"),
    prompt("How many pages are in the book?", "unknown"),
    prompt("Have you read this book?", "which I have not read yet")
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

btn.addEventListener(
  "click",
  () => {
    addBookToLibrary();
  },
  false
);
