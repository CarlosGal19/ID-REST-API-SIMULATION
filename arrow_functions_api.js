const users = ['Carlos', 'Mafer', 'Maricruz', 'Brandon'];

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

// It takes one username and return it if exists.
const getUser = (userName) => {
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
}

// It returns all existing users
const getUsers = () => {
    try {
        if (!users) {
            return sendReponse(404, 'There´s no users');
        }
        return sendReponse(200, users);
    } catch (error) {
        return sendReponse(500, error);
    }
}

// It adds a new user to the users array and return the user created, all users in new array and the user created
const addUser = (newUser) => {
    try {
        if (!newUser) {
            return sendReponse(400);
        }

        if (users.includes(newUser)) {
            return sendReponse(401);
        }

        users.push(newUser);
        return sendReponse(200, `User ${newUser} added successfully. The new array of users is: ${users} `);
    } catch (error) {
        return sendReponse(500, error);
    }
}

// It takes an index and, if found, removes the element from the array, it returns the deleted element and the new array.
const removeUserByIndex = (index) => {
    try {
        if (index < 0) {
            return sendReponse(400);
        }

        const user = users.at(index);

        if (!user) {
            return sendReponse(404);
        }

        users.splice(index, 1);
        return sendReponse(200, `${user} removed successfully. The new array is ${users}`);
    } catch (error) {
        return sendReponse(500, error);
    }
}

// It removes the last element from the array, it returns the deleted element and the new array
const removeLastUser = () => {
    try {
        const userRemoved = users.pop();
        if (!userRemoved) {
            return sendReponse(404, 'ERROR');
        }
        return sendReponse(200, `The user ${userRemoved} was removed successfully. The new array is ${users}`);
    } catch (error) {
        return sendReponse(500, error);
    }
}

// It removes the first element from the array, it returns the deleted element and the new array
const removeFirstUser = () => {
    try {
        const userRemoved = users.shift();
        if (!userRemoved) {
            return sendReponse(404, 'ERROR');
        }
        return sendReponse(200, `The user ${userRemoved} was removed successfully. The new array is ${users}`);
    } catch (error) {
        return sendReponse(500, error);
    }
}

// It takes the index and the new value, if index exists then replace the element with the new value
const updateUserByIndex = (index, userName) => {
    try {
        if (!userName) {
            return sendReponse(400, 'ERROR');
        }

        if (index < 0 || index > users.length - 1) {
            return sendReponse(404);
        }

        const userRemoved = users.at(index);
        if (!userRemoved) {
            return sendReponse(404);
        }

        users.splice(index, 1, userName)
        return sendReponse(200, `The user ${userRemoved} was replace for ${userName} successfully. The new array is ${users}`);

    } catch (error) {
        return sendReponse(500, error);
    }
}

// It return the number of users in the array
const getUsersSize = () => {
    try {
        const length = users.length;
        if (users.length < 0) {
            return sendReponse(404, 'ERROR');
        }

        return sendReponse(200, `The lenght of the array is: ${length}`);
    } catch (error) {
        return sendReponse(500, error);
    }
}

console.log(getUser('Carlos'));

console.log(getUsers());

console.log(addUser('Jacob'));
console.log(addUser('Lorena'));
console.log(addUser('Montse'));

console.log(removeUserByIndex(0));

console.log(removeLastUser());

console.log(removeFirstUser());

console.log(updateUserByIndex(1, 'Erasmo'));

console.log(getUsersSize());
