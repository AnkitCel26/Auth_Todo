export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUser = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || {};
};

export const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
