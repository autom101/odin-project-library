let myLibrary = [];
let bookInDom = [];

function Book(title, author, pages, readingStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readingStatus = readingStatus;
}

Book.prototype.toggleReadingStatus = function (index) {
  this.readingStatus =
    bookInDom[index][3].innerText === "Reading Status: Read"
      ? "Unread"
      : bookInDom[index][3].innerText === "Reading Status: Unread"
      ? "Read"
      : "Unread";
};

// Remove provided book from dom, and also remove it from the library
function removeBookFromLibrary(position) {
  bookContainer.removeChild(bookInDom[position]);

  myLibrary.splice(position, 1);
  for (let i = 0; i < myLibrary.length; i++) {
    if (i >= position) {
      myLibrary[i].locationInLibrary = myLibrary[i].locationInLibrary - 1;
    }
  }
}

function createListenerForDeletingBook(index) {
  bookInDom[index][4].addEventListener("click", (e) => {
    removeBookFromLibrary(index);
  });
}

function createReadingEventListener(index) {
  bookInDom[index][5].addEventListener("click", (e) => {
    myLibrary[index].toggleReadingStatus(index);
    bookInDom[index][3].innerText =
      "Reading Status: " + myLibrary[index].readingStatus;
  });
}

// Create a div to hold new book inside bookInDom array and place it on dom
function displayNewBook(book) {
  let index = book.locationInLibrary;
  bookInDom[index] = document.createElement("div");

  for (let i = 0; i < 4; i++) {
    bookInDom[index][i] = document.createElement("p");
  }

  bookInDom[index][0].innerText = "Title: " + book.title;
  bookInDom[index][1].innerText = "Author: " + book.author;
  bookInDom[index][2].innerText = "Number of Pages: " + book.pages;
  bookInDom[index][3].innerText = "Reading Status: " + book.readingStatus;

  // Did not copy the closeIcon image directly as it let to a lot of bugs, using setAttribute to match the src and alt attributes instead fixed those bugs
  bookInDom[index][4] = document.createElement("img");
  bookInDom[index][4].setAttribute("src", closeIcon.getAttribute("src"));
  bookInDom[index][4].setAttribute("alt", closeIcon.getAttribute("alt"));

  bookInDom[index][5] = document.createElement("img");
  bookInDom[index][5].setAttribute("src", checkmarkIcon.getAttribute("src"));
  bookInDom[index][5].setAttribute("alt", checkmarkIcon.getAttribute("alt"));

  bookInDom[index].classList.add("book");
  bookContainer.appendChild(bookInDom[index]);

  bookInDom[index].append(bookInDom[index][4]);
  for (let i = 0; i < 4; i++) {
    bookInDom[index].appendChild(bookInDom[index][i]);
  }
  bookInDom[index].appendChild(bookInDom[index][5]);
  createListenerForDeletingBook(index);
  createReadingEventListener(index);
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

//Take form data and pass it to addBookToLibrary function
function readFormData() {
  let formData = new FormData(form);

  let title = formData.get("book-title");
  let author = formData.get("book-author");
  let pages = formData.get("book-pages");
  let readingStatus = formData.get("book-readingStatus");
  formData = "";
  addBookToLibrary(title, author, pages, readingStatus);
}

// Select certain elements from document
const newBook = document.querySelector(".newBook");
const bookContainer = document.querySelector(".book-container");
const form = document.querySelector("form");
const closeIcon = document.querySelector(".close-icon");
const checkmarkIcon = document.querySelector(".checkmark");

// Event Listeners
newBook.addEventListener(
  "click",
  () => {
    form.classList.toggle("hide");
  },
  false
);

form.addEventListener("reset", (e) => {
  form.classList.toggle("hide");
});

form.addEventListener("submit", (e) => {
  // the preventDefault method stops the form from submitting to a server
  e.preventDefault();
  readFormData();
  form.classList.toggle("hide");
});
