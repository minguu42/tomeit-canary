export const postTasks = (idToken: string) => {
  void fetch("http://localhost:8080/v0/tasks", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + idToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "タスク1",
      estimatedPomoNum: 4,
      dueOn: "2022-04-01T15:04:05Z",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const fetchTasks = (idToken: string) => {
  void fetch("http://localhost:8080/v0/tasks", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + idToken,
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
