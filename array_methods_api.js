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

function getBookProperty(property, endpoint){
  for (const book of books) {
    if (book[property] === endpoint) {
      return `Found by ${property}.`;
    }
  }
  return false;
}

function getBook(endpoint) {
  try {
    if (!endpoint) {
      return sendReponse(400);
    }

    const isbn = parseInt(endpoint);
    let result = false;

    if (!isbn) {
      result = getBookProperty('title', endpoint);
    }else{
      result = getBookProperty('ISBN', endpoint);
    }

    if (result) {
      return sendReponse(200, result);
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
    return sendReponse(200, 'The book ' + newBook + ' was appended to books. ' + books);

  } catch (error) {
    return sendReponse(500, error);
  }
}

function removeBook(property, endpoint) {
  for (let i = 0; i < books.length; i++) {
    if (books[i][property] === endpoint) {
      books.splice(i, 1);
      return `The book ${books[i]} was deleted by ${property}. ${books}`;
    }
  }
  return false;
}

function removeBookByTitleOrISBN(endpoint) {
  try {
    if (!endpoint) {
      return sendReponse(400);
    }

    const isbn = parseInt(endpoint);
    let result = false;

    if (!isbn) {
      result = removeBook('title', endpoint);
    }else{
      result= removeBook('ISBN', endpoint);
    }

    if (result) {
      return sendReponse(200, result);
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error)
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
