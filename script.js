let myLibrary = [];
let booksContainer = document.querySelector('.books');

function Book(title = 'Default', author = 'Default', numPages = 'Default', isRead = false) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBookButtonReadStatus(book, btnReadBook) {
    if (book.isRead) {
        btnReadBook.textContent = 'Read';
        btnReadBook.classList.add('read');
    } else {
        btnReadBook.textContent = 'Not Read';
        btnReadBook.classList.remove('read');
    }
}

function readBook(book, btnReadBook) {
    book.isRead = !book.isRead;
    displayBookButtonReadStatus(book, btnReadBook);
    updateUILibrary();
}

function removeBook(book) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i] === book) {
            myLibrary.splice(i);
        }
    }
    updateUILibrary();
}

function getNewUIBook(book) {
    // create new elements
    let uiBook = document.createElement('article'),
        bookTitle = document.createElement('p'),
        bookAuthor = document.createElement('p'),
        bookPages = document.createElement('p'),
        btnReadBook = document.createElement('button'),
        btnRemoveBook = document.createElement('button');

    // Give class names to new elements
    uiBook.className = 'book';
    bookTitle.className = 'book-title';
    bookAuthor.className = 'book-author';
    bookPages.className = 'book-pages';
    btnReadBook.className = 'btn-book-read';
    btnRemoveBook.className = 'btn-book-remove';

    // Add event listeners to the new book's controls.
    // This works thanks to closures as these functions
    // still maintain reference to the exact book and btnReadBook.
    // And that is how they know which book to delete or read.
    btnReadBook.addEventListener('click', () => {
        readBook(book, btnReadBook);
    });
    btnRemoveBook.addEventListener('click', () => {
        removeBook(book);
    });

    // Add content to new elements
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.numPages;
    displayBookButtonReadStatus(book, btnReadBook);
    btnRemoveBook.textContent = 'Remove';

    uiBook.append(bookTitle, bookAuthor, bookPages, btnReadBook, btnRemoveBook);

    return uiBook;
}

function displayNewBook(book) {
    const uiBook = getNewUIBook(book);
    booksContainer.appendChild(uiBook);
}

function resetUILibrary() {
    booksContainer.innerHTML = '';
}

function updateUILibrary() {
    resetUILibrary();
    for (let i = 0; i < myLibrary.length; i++) {
        displayNewBook(myLibrary[i]);
    }
}

function openModal(modal) {
    modal.style.zIndex = '1';
}

function closeModal(modal) {
    modal.style.zIndex = '-1';
}

function bookAlreadyInLibrary(book) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === book.title || myLibrary[i].author === book.author) {
            return true;
        }
    }
    return false;
}

// Button that opens the modal
// where user can enter book info
const btnAddBook = document.querySelector('.add-book');
btnAddBook.addEventListener('click', () => {
    openModal(document.querySelector('form'));
});

// Modal controls
const btnCloseBookAlert = document.querySelector('.btn-book-alert');
const sameBookAlert = document.querySelector('.same-book-alert');
btnCloseBookAlert.addEventListener('click', () => {
    closeModal(sameBookAlert);
})

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let numPages = document.getElementById('num-pages').value;
    let isRead = document.getElementById('read-or-not').checked;
    let book = new Book(title, author, numPages, isRead);

    if (bookAlreadyInLibrary(book)) {
        openModal(sameBookAlert);
        return;
    }

    addBookToLibrary(book);
    updateUILibrary();
    closeModal(document.querySelector('form'));
});

const btnCancel = document.querySelector('.btn-cancel');
btnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(document.querySelector('form'));
});