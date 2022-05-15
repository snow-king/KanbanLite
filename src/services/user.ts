const url = "https://trello.backend.tests.nekidaem.ru/api/v1/";

export const UserLoggedIn = async (
  username: string,
  password: string
): Promise<{
  token: string;
}> => {
  const request = JSON.stringify({
    username: username,
    password: password,
  });
  return await fetch(`${url}users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: request,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<{
  username: string;
  email: string;
  password: string;
}> => {
  const request = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });
  console.log(request);
  return await fetch(`${url}users/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: request,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
export const refreshUserToken = async (
  token: string
): Promise<{ token: string }> => {
  const request = JSON.stringify({
    token: token,
  });
  return await fetch(`${url}users/refresh_token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: request,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
