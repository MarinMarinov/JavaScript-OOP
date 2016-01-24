/* Task Description */
/*
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/category has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/

function solve() {
    var library = (function () {
        var books = [],
            categories = [];

        function validateName(name){
            var isValid = true;
            if(name.length < 2 || name.length > 100){
                isValid = false;
                throw Error('Book title and category name must be between 2 and 100 characters');
            }

            return isValid;
        }

        function addBook(book) {
          /*  if(!books){
                books = [];
            }
            if(!categories){
                categories = [];
            }*/
            if(!book.title){
                throw Error('Book must have title');
            }
            if(typeof(book.author) !== 'string' || book.author === ''){
                throw Error('Author must be non-empty string')
            }
            if(book.isbn.length !== 10 && book.isbn.length !== 13){
                throw Error('Book ISBN must contains either 10 or 13 digits')
            }
            if(book.category === ''){
                book.category = 'Undefined category';
            }
            if(books.some(function(item){
                    return item.title === book.title;
                })){
                throw Error ('There is already a book with such title');
            }
            if(books.some(function(item){
                    return item.isbn === book.isbn;
                })){
                throw Error ('There is already a book with such isbn');
            }

            if(validateName(book.category)){
                var newCategory = {
                    category : book.category,
                    ID: categories.length + 1
                };
            }
            if(!categories.length){
                categories.push(newCategory);
            }
            else if(categories.length !== 0 && !categories.some(function(item){
                    return item.category === newCategory.category;
                })){
                categories.push(newCategory);
            }
            /*if(categories.indexOf(book.category) == -1){
                categories.push(book.category);
            }*/

            book.ID = books.length + 1;
            if(validateName(book.title)){
                books.push(book);
            }

            return books;
        }

        function listBooks() {
            /*if(!books){
                books = [];
            }*/
            /*var filteredBooks = books.filter(function(book){
             return book.author ===
             });*/
            var sortedBooks = books.sort(function(firstBook, secondBook){
                return firstBook.ID - secondBook.ID /*- firstBook.ID*/;
            });
            return sortedBooks;
        }

        function listCategories() {
            /*if(!categories){
                categories = [];
            }*/
            var sortedCategories = categories.sort(function(firstCategory, secondCategorie){
                return firstCategory.ID - secondCategorie.ID
            }).map(function(item){
                return item.category;
            });

            return sortedCategories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    } ());

    return library;
}
module.exports = solve;

/*var bookOne = {
    title: 'Under the Yoke',
    author: 'Ivan Vazov',
    isbn: '1234567891111',
    category: 'Historical drama'
};*/
/*var bookError = {
    title: 'BOOK #',
    isbn: '1234567890',
    author: 'John Doe',
    category: 'Book Category'
};*/
/*var bookTwo = {
    title: "Hitchhiker's guide to the galaxy",
    author: 'Douglas Adams',
    isbn: 1234567892222,
    category: 'Science fiction'
};
var bookThree = {
    title: "Epic of the Forgotten",
    author: 'Ivan Vazov',
    isbn: 1234567893333,
    category: 'Poems'
};
var bookFour = {
    title: "Fields and forests",
    author: 'Ivan Vazov',
    isbn: 1234567894444,
    category: 'Poems'
};
var bookFive = {
    title: "War and Peace",
    author: 'Lev Tolstoy',
    isbn: 1234567895555,
    category: 'Historical drama'
};*/


//var myLibrary = solve();

/*myLibrary.books.add(bookOne);
myLibrary.books.add(bookTwo);
myLibrary.books.add(bookThree);
myLibrary.books.add(bookFour);
myLibrary.books.add(bookFive);*/


/*myLibrary.books.add(bookError);

console.log(myLibrary.books.list());
console.log(myLibrary.categories.list());*/

