const productsList = document.getElementById("products-list");

const loadProductsButton = document.getElementById("load-products-button");

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);

const getProductFragment = (product) => {
  const { id, code, title, description, category, price, stock, status } =
    product;

  const productFragment = document.createDocumentFragment();

  const productItem = document.createElement("ul");
  productItem.id = `${id}`;
  productItem.classList.add("product-item");

  const productItemTitle = document.createElement("li");
  productItemTitle.classList.add("product-item-title");
  productItemTitle.textContent = `${title} (${code})`;
  productItem.appendChild(productItemTitle);

  const productItemDescription = document.createElement("li");
  productItemDescription.classList.add("product-item-description");
  productItemDescription.innerText = `${description}`;
  productItem.appendChild(productItemDescription);

  const productItemCategory = document.createElement("li");
  productItemCategory.classList.add("product-item-category");
  productItemCategory.innerText = `Categoría: ${category}`;
  productItem.appendChild(productItemCategory);

  const productItemPrice = document.createElement("li");
  productItemPrice.classList.add("product-item-price");
  productItemPrice.innerText = `Precio: ${formatCurrency(price)}`;
  productItem.appendChild(productItemPrice);

  const productItemStock = document.createElement("li");
  productItemStock.classList.add("product-item-stock");
  productItemStock.innerText = `Existencias: ${stock}`;
  productItem.appendChild(productItemStock);

  const productItemStatus = document.createElement("li");
  productItemStatus.classList.add("product-item-status");
  productItemStatus.innerText = `Disponibilidad: ${
    status ? "DISPONIBLE" : "NO DISPONIBLE"
  }`;
  productItem.appendChild(productItemStatus);

  productFragment.appendChild(productItem);

  return productFragment;
};

loadProductsButton.addEventListener("click", async (event) => {
  try {
    const productQuery = await fetch("http://localhost:8080/api/products");

    const results = await productQuery.json();

    if (results.status === "success") {
      productsList.innerHTML = "";

      for (const product of results.products) {
        productsList.appendChild(getProductFragment(product));
      }
    } else {
      Swal.fire({
        icon: "error",
        titleText: "Error",
        text: "No se encontraron productos en la Base de Datos.",
        toast: true,
        timer: 3752,
        position: "top-right",
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      titleText: "Error",
      text: `${err.message}`,
      toast: true,
      timer: 3752,
      position: "top-right",
    });
  }
});
