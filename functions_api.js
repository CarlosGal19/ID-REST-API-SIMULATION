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
      case 401:
        response.msg = "The user already exists";
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

function getUsers(){
    try {
        return sendReponse(200, users);
    } catch (error) {
        return sendReponse(500, error);
    }
}

function addUser(newUser){
    try {
        if (!newUser) {
            return sendReponse(400);
        }

        if (users.includes(newUser)) {
            return sendReponse(401)
        }

        users.push(newUser);
        return sendReponse(200, `User ${newUser} added successfully. The new array of users is: ${users} `);
    } catch (error) {
        return sendReponse(500, error);
    }
}

function removeUserByIndex(index) {
    try {
        if (index<0) {
            return sendReponse(400);
        }

        const user=users.at(index);

        if (!user) {
            return sendReponse(404);
        }

        users.splice(index, 1)
        return sendReponse(200, `${user} removed successfully. The new array is ${users}`);
    } catch (error) {
        return sendReponse(500, error)
    }

}

console.log(getUser('Carlos'));

console.log(getUsers());

console.log(addUser('Jacob'));

console.log(removeUserByIndex(0));
