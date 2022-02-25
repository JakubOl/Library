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
let book;
let deleteBtn;
let read = false;
let library = [];
let localStorage;

class Book {
  constructor(author, title, pages, read) {
    this.id = library.length + 1;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
  bookTemplate() {
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
  }
  toggleRead() {
    this.read = !this.read;
  }
}

if (window.localStorage.library) {
  localStorage = JSON.parse(window.localStorage.library);
  localStorage.forEach((book) => {
    let { id, author, title, pages, read } = book;
    library[library.length] = new Book(author, title, pages, read);
  });
}
updateLibrary();

readBtn.addEventListener("click", function () {
  readBtn.classList.toggle("not-read");
  read = !read;
  read ? (readBtn.textContent = "Read") : (readBtn.textContent = "Not Read");
});

function toggleWindow() {
  newBookWindow.classList.toggle("hidden");
}

submitBtn.addEventListener("click", function () {
  createBook();
  updateLibrary();
  toggleWindow();
});

addBtn.addEventListener("click", toggleWindow);
xButton.addEventListener("click", toggleWindow);

function createBook() {
  [author, title, pages, read] = [
    document.querySelector("#author").value,
    document.querySelector("#title").value,
    document.querySelector("#pages").value,
    read,
  ];
  if ([author, title, pages, read].includes("")) return;
  console.log([author, title, pages, read]);
  library[library.length] = new Book(author, title, pages, read);
  (document.querySelector("#author").value = ""),
    (document.querySelector("#title").value = ""),
    (document.querySelector("#pages").value = ""),
    (read = false);
}
function updateLibrary() {
  books.innerHTML = "";
  library.forEach((book) => {
    book.id = library.indexOf(book);
  });
  library.forEach((book) => {
    books.innerHTML += book.bookTemplate();
  });
  book = document.querySelectorAll(".book");
  bookEvent(book);
  window.localStorage.library = JSON.stringify(library);
}

function bookEvent(books) {
  books.forEach((book) => {
    book.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete")) {
        library.splice(e.target.parentElement.id, 1);
        updateLibrary();
      }
      if (e.target.classList.contains("read")) {
        const bookId = e.target.parentElement.id;
        library[bookId].read = !library[bookId].read;
        updateLibrary();
      }
    });
  });
}
if (library.length < 1) {
  library[0] = new Book("Tolkien", "Hobbit", 1, true);
  library[1] = new Book("kook", "Star Wars", 2, false);
  library[2] = new Book("kook", "Star Wars", 3, false);
  library[3] = new Book("kook", "Star Wars", 4, false);
  updateLibrary();
}
