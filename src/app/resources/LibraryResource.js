const { getFullUrl } = require('../../utils/urlHelper');
const BaseResource = require('./BaseResource');

class LibraryResource {
    static format(book) {
        if (!book) return null;
        return {
            id: book.id,
            title: book.title,
            author: book.author,
            language: book.language,
            file_url: getFullUrl(book.file_url),
            cover_url: getFullUrl(book.cover_url),
            created_at: book.created_at
        };
    }

    static collection(data) {
        return BaseResource.collection(data, this.format);
    }
}

module.exports = LibraryResource;