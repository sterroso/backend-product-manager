const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");
const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const loginProperties = {
    email: userEmailField.value,
    password: userPasswordField.value,
  };

  const result = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginProperties),
  });

  if (result.ok) {
    const userData = await result.json();

    const nextPath = `/user/${userData.user.id}/profile`;

    window.location.href = nextPath;
  }
});
