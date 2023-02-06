const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const loginProperties = {
    email: userEmailField.value,
    password: userPasswordField.value,
  }

  const result = await fetch("/api/users/", {});
});