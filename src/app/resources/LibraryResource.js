class LibraryResource {
    static format(book) {
        if (!book) return null;
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            language: book.language,
            file_url: process.env.BASE_URL ? `${process.env.BASE_URL}${book.file_url}` : book.file_url,
            cover_url: book.cover_url ? (process.env.BASE_URL ? `${process.env.BASE_URL}${book.cover_url}` : book.cover_url) : null,
            created_at: book.created_at
        };
    }

    static collection(books) {
        return books.map(book => this.format(book));
    }
}

module.exports = LibraryResource;