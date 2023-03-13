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

// Remove provided book from dom, and also remove it from the library
function removeBookFromLibrary(book) {
  let index = book.locationInLibrary;
  bookContainer.removeChild(bookInDom[index]);

  bookContainer.splice(index, 1);
  myLibrary.splice(index, 1);
  for (let i = 0; i < myLibrary.length; i++) {
    if (i >= index) {
      myLibrary[i].locationInLibrary = locationInLibrary - 1;
    }
  }
}

// Create a div to hold new book inside bookInDom array and place it on dom
function displayNewBook(book) {
  let index = book.locationInLibrary;
  bookInDom[index] = document.createElement("div");
  for (let i = 0; i < 4; i++) {
    bookInDom[index][i] = document.createElement("p");
  }

  bookInDom[index][0].append("Title: " + book.title);
  bookInDom[index][1].append("Author: " + book.author);
  bookInDom[index][2].append("Number of Pages: " + book.pages);
  bookInDom[index][3].append("Reading Status: " + book.readingStatus);

  bookInDom[index].classList.add("book");
  bookContainer.appendChild(bookInDom[index]);

  for (let i = 0; i < 4; i++) {
    bookInDom[index].appendChild(bookInDom[index][i]);
  }
}

//Create new book object, and place it into myLibrary array
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
