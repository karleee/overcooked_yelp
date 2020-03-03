export const stripGraphQLPrefix = str => {
  return str.replace("GraphQL error: Error: ", "");
}

export const saveUserToCache = (client, userInfo) => {
  const { loggedIn, _id, firstName, lastName } = userInfo;
  client.writeData({
    data: {
      isLoggedIn: loggedIn,
      currentUserId: _id,
      currentUserFirstName: firstName,
      currentUserLastName: lastName
    }
  });
}

export const saveUserToLocalStorage = userInfo => {
  const { token, _id, firstName, lastName } = userInfo;
  localStorage.setItem("auth-token", token);
  localStorage.setItem("currentUserId", _id);
  localStorage.setItem("currentUserFirstName", firstName);
  localStorage.setItem("currentUserLastName", lastName);
}


export const saveUserToCacheAndLocalStorage = (cache, userInfo) => {
  const { _id, firstName, lastName, loggedIn } = userInfo;
  localStorage.setItem("currentUserId", _id);
  localStorage.setItem("currentUserFirstName", firstName);
  localStorage.setItem("currentUserLastName", lastName);
  cache.writeData({
    data: {
      isLoggedIn: loggedIn,
      currentUserId: _id,
      currentUserFirstName: firstName,
      currentUserLastName: lastName
    }
  });
}

export const logOutUser = client => {
  localStorage.removeItem("auth-token");
  localStorage.removeItem("currentUserId");
  localStorage.removeItem("currentUserFirstName");
  localStorage.removeItem("currentUserLastName");
  client.writeData({
    data: {
      isLoggedIn: false,
      currentUserId: null,
      currentUserFirstName: null,
      currentUserLastName: null
    }
  });
};
