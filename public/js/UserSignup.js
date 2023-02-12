const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");
const userFirstNameField = document.getElementById("userFirstNameField");
const userLastNameField = document.getElementById("userLastNameField");
const userDateOfBirthField = document.getElementById("userDateOfBirthField");
const userGenderSelector = document.getElementById("userGenderSelector");
const userSignupForm = document.getElementById("userSignupForm");

userSignupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newUserData = {
    email: userEmailField.value,
    firstName: userFirstNameField.value,
    lastName: userLastNameField.value,
    dateOfBirth: userDateOfBirthField.value,
    gender: userGenderSelector.value,
    password: userPasswordField.value,
  };

  try {
    const response = await fetch("http://localhost:8080/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (response.ok) {
      window.location.href = "/wellcome";
    } else {
      console.error("User could not be created.");
    }
  } catch (error) {
    console.error(error.message);
  }
});
