const url = "https://trello.backend.tests.nekidaem.ru/api/v1/cards/";

export const getCards = async (
  token: string
): Promise<[{ id: number; row: string; seq_num: number; text: string }]> => {
  return await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `JWT ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const addCard = async (
  token: string,
  row: string,
  text: string
): Promise<{ id: number; row: string; seq_num: number; text: string }> => {
  const request = JSON.stringify({
    row: row,
    text: text,
  });
  return await fetch(`${url}`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `JWT ${token}`,
    },
    body: request,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const deleteCard = async (token: string, id: number): Promise<void> => {
  await fetch(`${url}${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `JWT ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  });
};

export const editCard = async (
  token: string,
  id: number,
  row: string,
  text: string,
  seq_num: number
): Promise<void> => {
  const request = JSON.stringify({
    id: id,
    text: text,
    row: row,
    seq_num: seq_num,
  });
  await fetch(`${url}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `JWT ${token}`,
    },
    body: request,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
