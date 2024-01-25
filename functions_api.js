const users=['Carlos', 'Mafer', 'Maricruz', 'Brandon'];

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

function getUser(userName){
    try {

      if (!userName) {
        return sendReponse(400);
      }

      const userIndex = users.indexOf(userName);

      if (userIndex >= 0) {
        const user = users.at(userIndex);

        return sendReponse(200, user);
      }

      return sendReponse(404);
    } catch (error) {
      return sendReponse(500, error);
    }
  };

console.log(getUser('Carlos'));
