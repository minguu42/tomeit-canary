import { User } from "@firebase/auth-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const postData = async (
  path = "/",
  data = {},
  currentUser: User | null
): Promise<any> => {
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

export const fetchData = async (
  path = "/",
  currentUser: User | null
): Promise<any> => {
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

export const putData = async (
  path = "/",
  data = {},
  currentUser: User | null
): Promise<any> => {
  if (currentUser === null) {
    return;
  }
  const idToken = await currentUser.getIdToken(true);
  const response = await window.fetch(API_URL + path, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
