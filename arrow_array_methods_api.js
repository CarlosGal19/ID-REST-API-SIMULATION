let books = require("./books.json");

const sendReponse = (code, body = null) => {
  const response = {
    code,
    body,
  };

  switch (code) {
    case 200:
      response.msg = "Ok";
      break;
    case 400:
      response.msg = "Endpoint not valid";
      break;
    case 401:
      response.msg = "The book already exists";
      break;
    case 404:
      response.msg = "Not found";
      break;
    case 500:
      response.msg = "Internal Server Error";
      break;
    default:
      response.msg = "Unknown status code";
  }

  return response;
}

const getBookProperty = (property, endpoint) => {
  for (const book of books) {
    if (book[property] === endpoint) {
      return `Found by ${property}.`;
    }
  }
  return false;
}

// It takes one book title OR ISBN and return it if exists.
const getBook = (endpoint) => {
  try {
    if (!endpoint) {
      return sendReponse(400);
    }

    const isbn = parseInt(endpoint);
    let result = false;

    if (!isbn) {
      result = getBookProperty("title", endpoint);
    } else {
      result = getBookProperty("ISBN", endpoint);
    }

    if (result) {
      return sendReponse(200, result);
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// It returns all existing books.
const getBooks = () => {
  try {
    if (!books) {
      return sendReponse(404, "There´s no books");
    }
    return sendReponse(200, books);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// It adds a new book to the books array and return the book created, and the new array, including the new book.
const addBook = (newBook) => {
  try {
    if (!newBook) {
      return sendReponse(400);
    }

    for (const key in newBook) {
      if (!newBook[key]) {
        return sendReponse(400, "All fields are required");
      }
    }

    const repeat = books.some((book) => book.ISBN === newBook.ISBN);

    if (repeat) {
      return sendReponse(401);
    }

    books.push(newBook);
    return sendReponse(
      200,
      "The book " + newBook.title + " was appended to books. " + books
    );
  } catch (error) {
    return sendReponse(500, error);
  }
}

const removeBook = (property, endpoint) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i][property] === endpoint) {
      const deleted = books.splice(i, 1)[0];
      return `The book ${deleted.title} was deleted by ${property}. ${books}`;
    }
  }
  return false;
}

// It takes a title OR ISBN and, if found, removes the element from the array, it returns the deleted element and the new array.
const removeBookByTitleOrISBN = (endpoint) => {
  try {
    if (!endpoint) {
      return sendReponse(400);
    }

    const isbn = parseInt(endpoint);
    let result = false;

    if (!isbn) {
      result = removeBook("title", endpoint);
    } else {
      result = removeBook("ISBN", endpoint);
    }

    if (result) {
      return sendReponse(200, result);
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// The first param will be the filtering property (genre, author, or publisher), the second will be the string that is being searched. It returns all books that match the condition.
const filterBy = (property, type) => {
  try {
    if (
      !property ||
      !type ||
      (property !== "genre" &&
        property !== "author" &&
        property !== "publisher")
    ) {
      return sendReponse(400);
    }

    const booksBy = books.filter((book) => book[property] === type);

    if (booksBy.length > 0) {
      return sendReponse(200, booksBy);
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// It returns a list of all the books in the next format: Title - Author - Year.
const listBooks = () => {
  try {
    if (!books || books.length === 0) {
      sendReponse(404, "There´s no books");
    }

    const arrayBooks = [];

    for (const book of books) {
      const string = `${book.title} - ${book.author} - ${book.year}`;
      arrayBooks.push(string);
    }

    return sendReponse(200, arrayBooks);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// It returns all books for a given year.
const getBooksByYear = (year) => {
  try {
    if (!year) {
      return sendReponse(400);
    }

    const booksByYear = books.filter((book) => book.year === year);

    if (booksByYear.length > 0) {
      return sendReponse(200, booksByYear);
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// It returns true or false if all books from a given genre have stock available.
const genreFullAvailability = (genre) => {
  try {
    if (!genre) {
      return sendReponse(400);
    }

    const booksGenre = books.filter((book) => book.genre === genre);
    const result = booksGenre.every((book) => book.stock > 0);

    if (result) {
      return sendReponse(200, true);
    }

    return sendReponse(404, false);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// It returns true or false if at least ONE book from a given genre has stock availability.
const genrePartialAvailability = (genre) => {
  try {
    if (!genre) {
      return sendReponse(400);
    }

    const booksGenre = books.filter((book) => book.genre === genre);
    const result = booksGenre.some((book) => book.stock > 0);

    if (result) {
      return sendReponse(200, true);
    }

    return sendReponse(404, false);
  } catch (error) {
    return sendReponse(500, error);
  }
}

// The first param will be the counting property (genre, author, or publisher), the second will be the string that is being searched. It returns a new object with the name of the property that is being counted and the counter.
const getCountBy = (property, type) => {
  try {
    if (
      !property ||
      !type ||
      (property !== "genre" &&
        property !== "author" &&
        property !== "publisher")
    ) {
      return sendReponse(400);
    }

    const objCounter = {
      property,
      value: 0,
    };

    for (const book of books) {
      if (book[property] === type) {
        objCounter.value++;
      }
    }

    if (objCounter.value > 0) {
      const { property, value } = objCounter;
      return sendReponse(
        200,
        `The amount of boos with with the ${property}: ${type} is ${value}`
      );
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
}

console.log(getBook("9780399590504"));
console.log(getBook("Educated"));

console.log(getBooks());

const objBook = {
  "title": "Calculus",
  "ISBN": "9686034927",
  "year": 1987,
  "genre": "Math",
  "author": "Louis Leithold",
  "stock": 1,
  "publisher": "Harla"
}

console.log(addBook(objBook));

console.log(removeBookByTitleOrISBN('9780984782857'));
console.log(removeBookByTitleOrISBN('The Alchemist'));

console.log(filterBy('genre', 'Fiction'));

console.log(listBooks());

console.log(getBooksByYear(2011));

console.log(genreFullAvailability('Fiction'));
console.log(genreFullAvailability('Business'));

console.log(genrePartialAvailability('Fiction'));

console.log(getCountBy("genre", "Fiction"));
