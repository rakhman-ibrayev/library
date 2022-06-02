class Book {
    #title = 'x';
    #author = 'x';
    #numPages = 0;
    #isRead = false;

    constructor(title, author, numPages, isRead) {
        this.#title = title;
        this.#author = author;
        this.#numPages = numPages;
        this.#isRead = isRead;
    }

    set title(title) {
        this.#title = title;
    }

    get title() {
        return this.#title;
    }

    set author(author) {
        this.#author = author;
    }

    get author() {
        return this.#author;
    }

    set numPages(numPages) {
        this.#numPages = numPages;
    }

    get numPages() {
        return this.#numPages
    }

    set isRead(isRead) {
        this.#isRead = isRead;
    }

    get isRead() {
        return this.#isRead;
    }
}