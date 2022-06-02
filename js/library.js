let library = (function() {
    // Init private properties
    let books = []; // Array that stores all books' info

    // Cache the DOM elements
    let booksContainer = document.querySelector('.books'); // UI grid that displays all books
    let form = document.querySelector('form'); // Form that takes input information for a new book
    const btnCancel = document.querySelector('.btn-cancel'); // Button that closes the @code{form} modal
    const btnAddBook = document.querySelector('.add-book'); // Button on the main screen that invokes the @code{form} modal
    const btnCloseBookAlert = document.querySelector('.btn-book-alert'); // Button that closes the @code{sameBookAlert} modal
    const sameBookAlert = document.querySelector('.same-book-alert'); // Modal indicating that user already has same book in library

    // Set-up events
    btnAddBook.addEventListener('click', _openForm);
    btnCancel.addEventListener('click', _closeForm);
    btnCloseBookAlert.addEventListener('click', _closeSameBookAlert);
    form.addEventListener('submit', _render);

    // INIT PRIVATE METHODS

    // Private method opens the @code{form} input form as a modal
    function _openForm() {
        openModal(form);
    }

    // Private method closes the @code{form} input form
    function _closeForm(event) {
        event.preventDefault();
        closeModal(form);
    }

    // Private method closes the @code{sameBookAlert} modal
    function _closeSameBookAlert() {
        closeModal(sameBookAlert);
    }

    // Private method adds a new book object
    // to the @code{books} array of objects
    // @param book - new book that needs to be added
    function _addBookToLibrary(book) {
        books.push(book);
    }
    
    // Private method displays the current status of a book by
    // changing the color and text content of @code{btnReadBook}
    // @param book - book whose status will be displayed
    // @param btnReadBook - button that will display the status
    function _displayBookButtonReadStatus(book, btnReadBook) {
        if (book.isRead) {
            btnReadBook.textContent = 'Read';
            btnReadBook.classList.add('read');
        } else {
            btnReadBook.textContent = 'Not Read';
            btnReadBook.classList.remove('read');
        }
    }
    
    // Private method toggles the boolean @code{isRead} property of a book
    // and depending on that property, changes the @code{btnReadBook}
    // @param book - book whose read status property will be toggled
    // @param btnReadBook - button that will display the status
    function _readBook(book, btnReadBook) {
        let bookReadStatus = book.isRead;
        bookReadStatus = !bookReadStatus;
        book.isRead = bookReadStatus;
        _displayBookButtonReadStatus(book, btnReadBook);
        _updateUILibrary();
    }
    
    // Private method remove a book from the UI
    // @param book - book that needs to be removed
    function _removeBook(book) {
        for (let i = 0; i < books.length; i++) {
            if (books[i] === book) {
                books.splice(i, 1);
            }
        }
        _updateUILibrary();
    }
    
    // Private method creates a new book card for the UI
    // @param book - book whose card needs to be created
    // @return uiBook - new book card made out of @param book
    function _getNewUIBook(book) {
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
            _readBook(book, btnReadBook);
        });
        btnRemoveBook.addEventListener('click', () => {
            _removeBook(book);
        });
    
        // Add content to new elements
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.numPages;
        _displayBookButtonReadStatus(book, btnReadBook);
        btnRemoveBook.textContent = 'Remove';
    
        // Add new elements to the new book
        uiBook.append(bookTitle, bookAuthor, bookPages, btnReadBook, btnRemoveBook);

        return uiBook;
    }

    // Private method displays a new book to the grid of books
    // @param book - book that needs to be displayed
    function _displayNewBook(book) {
        const uiBook = _getNewUIBook(book);
        booksContainer.appendChild(uiBook);
    }
    
    // Private method removes all the content from the grid of books 
    function _resetUILibrary() {
        booksContainer.innerHTML = '';
    }

    // Private method updates the grid of books
    function _updateUILibrary() {
        _resetUILibrary();
        for (let i = 0; i < books.length; i++) {
            _displayNewBook(books[i]);
        }
    }
    
    // Private method takes the book info from the input form,
    // creates a new book object with that info and displays new book
    function _render(event) {
        event.preventDefault();
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let numPages = document.getElementById('num-pages').value;
        let isRead = document.getElementById('read-or-not').checked;
        let book = new Book(title, author, numPages, isRead);
    
        if (bookAlreadyInLibrary(book)) {
            openModal(sameBookAlert);
            return;
        }
    
        _addBookToLibrary(book);
        _updateUILibrary();
        closeModal(document.querySelector('form'));
    }


    // INIT PUBLIC METHODS

    // Unhides a modal
    // @param modal - modal that needs to be unhidden
    function openModal(modal) {
        modal.style.zIndex = '1';
    }
    
    // Hides a modal
    // @param modal - modal that needs to be hidden
    function closeModal(modal) {
        modal.style.zIndex = '-1';
    }

    // Checks if a book is already in the library
    // @param book - book that needs to be checked
    function bookAlreadyInLibrary(book) {
        for (let i = 0; i < books.length; i++) {
            if (books[i].title === book.title || books[i].author === book.author) {
                return true;
            }
        }
        return false;
    }

    // return public methods following
    // the Revealing Module Pattern rules
    return {
        openModal,
        closeModal,
        bookAlreadyInLibrary
    }
})();