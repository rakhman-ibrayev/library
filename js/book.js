function Book (title = "x", author = "x", numPages = 0, isRead = "false") {
    let bookTitle = title;
    let bookAuthor = author;
    let bookNumPages = numPages;
    let isBookRead = isRead;

    function setTitle (title) {
        bookTitle = title;
    }

    function getTitle () {
        return bookTitle;
    }

    function setAuthor(author) {
        bookAuthor = author;
    }

    function getAuthor() {
        return bookAuthor;
    }

    function setNumPages(numPages) {
        bookNumPages = numPages;
    }

    function getNumPages() {
        return bookNumPages;
    }

    function setIsRead(isRead) {
        isBookRead = isRead;
    }

    function getIsRead() {
        return isBookRead;
    }

    return {
        setTitle,
        getTitle,
        setAuthor,
        getAuthor,
        setNumPages,
        getNumPages,
        setIsRead,
        getIsRead
    }
}