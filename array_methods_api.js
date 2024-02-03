const books = require("./books.json");

function sendReponse(code, body = null) {
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

function getBook(endpoint) {
  try {
    if (!endpoint) {
      return sendReponse(400);
    }

    const isbn = parseInt(endpoint);

    if (!isbn) {
      for (const book of books) {
        if (book.title === endpoint) {
          return sendReponse(200, "Found by title");
        }
      }
    }

    for (const book of books) {
      if (book.ISBN == isbn) {
        return sendReponse(200, "Found by ISBN");
      }
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
}

function getBooks() {
  try {
    if (!books) {
      return sendReponse(404, 'There´s no books');
    }
    return sendReponse(200, books);
  } catch (error) {
    return sendReponse(500, error)
  }
}

function addBook(newBook) {
  try {
    if (!newBook) {
      return sendReponse(400);
    }

    for (const key in newBook) {
      if (!newBook[key]) {
        return sendReponse(400, 'All fields are required');
      }
    }

    const repeat = books.some(book => book.ISBN === newBook.ISBN);

    if (repeat) {
      return sendReponse(401);
    }

    books.push(newBook);
    return sendReponse(200, 'The book ' + newBook + ' was append to books. ' + books);

  } catch (error) {
    return sendReponse(500, error);
  }
}

console.log(getBook("9780399590504"));

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
