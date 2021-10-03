import { UserState } from "lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const postData = async (
  path = "/",
  data = {},
  currentUser: UserState
): Promise<unknown> => {
  if (currentUser === null) {
    return;
  }
  const idToken = await currentUser.getIdToken(true);
  const response = await window.fetch(API_URL + path, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const getData = async (
  path = "/",
  currentUser: UserState
): Promise<unknown> => {
  if (currentUser === null) {
    return;
  }
  const idToken = await currentUser.getIdToken(true);
  const response = await window.fetch(API_URL + path, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
    },
  });

  return response.json();
};

export const patchData = async (
  path = "/",
  data = {},
  currentUser: UserState
): Promise<unknown> => {
  if (currentUser === null) {
    return;
  }
  const idToken = await currentUser.getIdToken(true);
  const response = await window.fetch(API_URL + path, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
