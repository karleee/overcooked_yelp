export const stripGraphQLPrefix = str => {
  return str.replace("GraphQL error: Error: ", "");
}

export const saveUserToCache = (client, userInfo) => {
  const { loggedIn, _id, firstName, lastName, zipCode } = userInfo;
  client.writeData({
    data: {
      isLoggedIn: loggedIn,
      currentUserId: _id,
      currentUserFirstName: firstName,
      currentUserLastName: lastName,
      currentUserZipCode: zipCode,
    }
  });
}

export const saveUserToLocalStorage = userInfo => {
  const { token, _id, firstName, lastName, zipCode } = userInfo;
  localStorage.setItem("auth-token", token);
  localStorage.setItem("currentUserId", _id);
  localStorage.setItem("currentUserFirstName", firstName);
  localStorage.setItem("currentUserLastName", lastName);
  localStorage.setItem("currentUserZipCode", zipCode);
}


export const saveUserToCacheAndLocalStorage = (cache, userInfo) => {
  const { _id, firstName, lastName, loggedIn, zipCode } = userInfo;
  localStorage.setItem("currentUserId", _id);
  localStorage.setItem("currentUserFirstName", firstName);
  localStorage.setItem("currentUserLastName", lastName);
  localStorage.setItem("currentUserZipCode", zipCode);
  cache.writeData({
    data: {
      isLoggedIn: loggedIn,
      currentUserId: _id,
      currentUserFirstName: firstName,
      currentUserLastName: lastName,
      currentUserZipCode: zipCode,
    }
  });
}

export const logOutUser = client => {
  localStorage.removeItem("auth-token");
  localStorage.removeItem("currentUserId");
  localStorage.removeItem("currentUserFirstName");
  localStorage.removeItem("currentUserLastName");
  localStorage.removeItem("currentUserZipCode");
  client.writeData({
    data: {
      isLoggedIn: false,
      currentUserId: null,
      currentUserFirstName: null,
      currentUserLastName: null,
      currentUserZipCode: null,
    }
  });
};

export const setInitialCacheState = (cache, token) => {
  // do we have stuff in localstorage?
  const currentUserId = localStorage.getItem("currentUserId");
  const currentUserFirstName = localStorage.getItem("currentUserFirstName");
  const currentUserLastName = localStorage.getItem("currentUserLastName");
  const currentUserZipCode = localStorage.getItem("currentUserZipCode");

  // whatever we found, write it to the cache
  cache.writeData({
    data: {
      isLoggedIn: Boolean(token),
      currentUserId,
      currentUserFirstName,
      currentUserLastName,
      currentUserZipCode,
    }
  });
}