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
function addBookToLibrary(title, author, pages, readingStatus) {
  let book = new Book(title, author, pages, readingStatus);

  // Store location of book inside the myLibrary array inside the book object itself
  // As we have not pushed the book object to myLibrary yet, the book's location is going to by myLibrary.length
  book.locationInLibrary = myLibrary.length;

  myLibrary.push(book);
  displayNewBook(book);
}

function readFormData() {
  let formData = new FormData(form);

  let title = formData.get("book-title");
  let author = formData.get("book-author");
  let pages = formData.get("book-pages");
  let readingStatus = formData.get("book-readingStatus");

  addBookToLibrary(title, author, pages, readingStatus);
}

newBook = document.querySelector(".newBook");
form = document.querySelector("form");
closeImage = document.querySelector(".close-icon");
bookContainer = document.querySelector(".book-container");

newBook.addEventListener(
  "click",
  () => {
    form.classList.toggle("hide-form");
  },
  false
);

form.addEventListener("reset", (e) => {
  // the preventDefault method stops the form from submitting to a server
  e.preventDefault();
  form.classList.toggle("hide-form");
});

form.addEventListener("submit", (e) => {
  //do something
  e.preventDefault();
  readFormData();
  form.classList.toggle("hide-form");
});
