`use strict`;
const addBtn = document.querySelector(".add");
const readBtn = document.querySelector(".read");
const submitBtn = document.querySelector(".submit");
const newBookWindow = document.querySelector(".book-window");
const newAuthor = document.querySelector("#author");
const newTitle = document.querySelector("#title");
const newPages = document.querySelector("#pages");
const books = document.querySelector(".books");
const readBook = document.querySelectorAll(".readBook");
const xButton = document.querySelector(".x");

class Book {
  constructor(author, title, pages, read = false, library) {
    this.id = library.length + 1;
    this.author = author;
    this.title = title;
    this.pages = +pages;
    this.read = read;
  }
  createTemplate = function () {
    let template = `
        <div class="book" id="${this.id}">
          <div>${this.author}</div>
          <div>${this.title}</div>
          <div>${this.pages}</div>
          <button class="read ${this.read ? "" : "not-read"}" >${
      this.read ? "Read" : "Not Read"
    }</button>
          <button class="delete" id="${this.id}">Delete</button>
        </div>
        `;
    return template;
  };
  toggleRead = function () {
    this.read = !this.read;
  };
}

class Library {
  constructor() {
    this.book;
    this.deleteBtn;
    this.read = false;
    this.library = [];
    this.localStorage;
  }

  init = function () {
    this.checkLocalStorage();
    this.checkIfEmpty();
  };

  checkLocalStorage = function () {
    if (window.localStorage[this.library]) {
      this.localStorage = JSON.parse(window.localStorage[this]);
      this.localStorage.forEach((book) => {
        let { author, title, pages, read } = book;
        this.library[this.library.length] = new Book(
          author,
          title,
          pages,
          read,
          this
        );
      });
      this.updateLibrary();
    }
  };
  checkIfEmpty = function () {
    if (this.library.length < 1) {
      this.library[0] = new Book("Tolkien", "Hobbit", 1, true, this);
      this.library[1] = new Book("kook", "Star Wars", 2, false, this);
      this.library[2] = new Book("kook", "Star Wars", 3, false, this);
      this.library[3] = new Book("kook", "Star Wars", 4, false, this);
      this.updateLibrary();
    }
  };
  toggleWindow = function () {
    newBookWindow.classList.toggle("hidden");
  };
  createBook = function () {
    let [author, title, pages, isRead] = [
      document.querySelector("#author").value,
      document.querySelector("#title").value,
      document.querySelector("#pages").value,
      this.read,
    ];
    if ([author, title, pages, isRead].includes("")) return;
    this.library[this.library.length] = new Book(
      author,
      title,
      pages,
      isRead,
      this
    );
    (document.querySelector("#author").value = ""),
      (document.querySelector("#title").value = ""),
      (document.querySelector("#pages").value = ""),
      (this.read = false);
  };
  updateLibrary = function () {
    books.innerHTML = "";
    this.library.forEach((book) => {
      book.id = this.library.indexOf(book);
    });
    this.library.forEach((book) => {
      books.innerHTML += book.createTemplate();
    });
    this.book = document.querySelectorAll(".book");
    window.localStorage[this] = JSON.stringify(this.library);
  };

  bookEvent = function (e) {
    if (e.target.classList.contains("delete")) {
      this.library.splice(e.target.parentElement.id, 1);
      this.updateLibrary();
    }
    if (e.target.classList.contains("read")) {
      const bookId = e.target.parentElement.id;
      this.library[bookId].read = !this.library[bookId].read;
      this.updateLibrary();
    }
  };
}

(function () {
  const mylibrary = new Library();
  mylibrary.init();
  mylibrary.updateLibrary();
  readBtn.addEventListener("click", function () {
    readBtn.classList.toggle("not-read");
    mylibrary.read = !mylibrary.read;
    mylibrary.read
      ? (readBtn.textContent = "Read")
      : (readBtn.textContent = "Not Read");
  });
  submitBtn.addEventListener("click", function () {
    mylibrary.createBook();
    mylibrary.updateLibrary();
    mylibrary.toggleWindow();
  });
  addBtn.addEventListener("click", mylibrary.toggleWindow);
  xButton.addEventListener("click", mylibrary.toggleWindow);
  books.addEventListener("click", function (e) {
    mylibrary.bookEvent(e);
  });
})();
