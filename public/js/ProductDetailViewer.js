const addToCartForm = document.getElementById("addToCartForm");
const productIdField = document.getElementById("productIdField");
const productSalesPriceField = document.getElementById(
  "productSalesPriceField"
);
const productStockField = document.getElementById("productStockField");
const productQuantityDecrementButton = document.getElementById(
  "productQuantityDecrementButton"
);
const productQuantityField = document.getElementById("productQuantityField");
const productQuantityIncrementButton = document.getElementById(
  "productQuantityIncrementButton"
);

addToCartForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cartId = "63cc90aa3eac6a538b1aed32";
  const productId = productIdField.value;
  const productQuantity = productQuantityField.value;
  const productSalesPrice = productSalesPriceField.value;
  const addCartItemUrl = `/api/carts/${cartId}/products/${productId}`;

  try {
    const response = await fetch(addCartItemUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity: productQuantity,
        salesPrice: productSalesPrice,
      }),
    });

    if (response.ok) {
      window.location.href = `/carts/${cartId}`;
    } else {
      console.error("Error adding product to the cart.");
    }
  } catch (error) {
    console.error(error);
  }
});

productQuantityDecrementButton.addEventListener("click", (event) => {
  let currentQuantity = Number(productQuantityField.value ?? 0);

  if (
    !isNaN(currentQuantity) &&
    currentQuantity > 1 &&
    currentQuantity % 1 === 0
  ) {
    productQuantityField.value = --currentQuantity;
  }
});

productQuantityIncrementButton.addEventListener("click", (event) => {
  let currentQuantity = Number(productQuantityField.value ?? 0);
  const maxQuantity = Number(productStockField.value ?? 1);

  if (
    !isNaN(currentQuantity) &&
    currentQuantity < maxQuantity &&
    currentQuantity % 1 === 0
  ) {
    productQuantityField.value = ++currentQuantity;
  }
});
