const books = require('./books.json');
console.log(books);

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
