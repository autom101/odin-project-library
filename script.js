let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return title + " by " + author + ", " + pages + " pages" + ", " + read + ".";
};

function addBookToLibrary() {
  let book = new Book(
    prompt("What is the title of the book?", "Unknown Name"),
    prompt("Who is the author of the book?", "Unknown Author"),
    prompt("How many pages are in the book?", "unknown"),
    prompt("Have you read this book?", "which I have not read yet")
  );

  myLibrary.push(book);
}
