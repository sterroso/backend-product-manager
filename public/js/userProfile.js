const createCartButton = document.getElementById("createCartButton");
const userIdSpan = document.getElementById("userId");

createCartButton.addEventListener("click", async (event) => {
  const userId = userIdSpan.innerText;

  try {
    const newCart = await fetch(`/api/users/${userId}/cart`, {
      method: "POST",
    });

    // TODO: Cómo crear nuevo carrito?
  } catch (error) {
    console.error(error.message);
  }
});
