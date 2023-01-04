const socket = io();

const productsList = document.getElementById("products-list");

const productCode = document.getElementById("product-code");

const productCategory = document.getElementById("product-category");

const productTitle = document.getElementById("product-title");

const productDescription = document.getElementById("product-description");

const productPrice = document.getElementById("product-price");

const productStock = document.getElementById("product-stock");

const productStatus = document.getElementById("product-status");

const addProductButton = document.getElementById("add-product-button");

addProductButton.addEventListener("click", (event) => {
  const productObjectParameter = {
    productCode: productCode.value,
    productCategory: productCategory.value,
    productTitle: productTitle.value,
    productDescription: productDescription.value,
    productPrice: productPrice.value,
    productStock: productStock.value,
    productStatus: productStatus.value,
  };

  productCode.value = "";
  productCategory.value = "";
  productTitle.value = "";
  productDescription.value = "";
  productPrice.value = "";
  productStock.value = "";
  productStatus.value = true;

  productCode.focus({ focusVisible: true });

  socket.emit("addNewProduct", productObjectParameter);
});

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
  productItem.id = `product-item-${id}`;
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

socket.on("init", (data) => {
  productsList.innerHTML = "";

  const { products } = data;

  for (const product of products) {
    productsList.appendChild(getProductFragment(product));
  }
});

socket.on("addNewProduct", (data) => {
  productsList.innerHTML = "";

  const { products, newProductId, newProductTitle } = data;

  for (const product of products) {
    productsList.appendChild(getProductFragment(product));
  }

  const newItem = document.getElementById(`product-item-${newProductId}`);

  Swal.fire({
    icon: "success",
    titleText: "Nuevo producto agregado",
    text: `Se agregó el producto "${newProductTitle}" al inventario.`,
    toast: true,
    timer: 7543,
    position: "top-right",
  });

  newItem.focus({ focusVisible: true });
});

socket.on("error", (error) => {
  Swal.fire({
    icon: "error",
    titleText: "Error",
    text: `${error.message}`,
    toast: true,
    timer: 5247,
    position: "top-right",
  });
});
