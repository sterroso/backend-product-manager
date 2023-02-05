import * as ProductProvider from "../dao/product.mongo-dao.js";
import * as CartProvider from "../dao/cart.mongo-dao.js";
import { CustomProductPaginationLabels } from "../constants/constants.js";

export const getHomeView = (req, res) => {
  res.render("home", { title: "Inicio" });
};

export const getProductsView = async (req, res) => {
  const { categoryId, status, priceSort, limit, page } = req.query;

  const query = {};

  const options = {};

  options.lean = true;

  options.customLabels = CustomProductPaginationLabels;

  if (priceSort) {
    options.sort = {};
    if (["asc", "desc"].includes(priceSort))
      options.sort.price = priceSort === "asc" ? 1 : -1;
  }

  if (limit) {
    options.limit = limit;
  }

  if (page) {
    options.page = page;
  }

  if (categoryId) {
    query.category = categoryId;
  }

  if (status) {
    if (["true", "false"].includes(status)) query.status = status;
  }

  try {
    const result = await ProductProvider.getProducts(query, options);

    if (result.payload.length > 0) {
      let linkBuilder = null;

      if (query?.category) {
        linkBuilder = `${
          linkBuilder ? `${linkBuilder ?? ""}&` : "?"
        }categoryId=${categoryId}`;
      }

      if (query?.status) {
        linkBuilder = `${
          linkBuilder ? `${linkBuilder ?? ""}&` : "?"
        }status=${status}`;
      }

      if (options?.sort?.price) {
        linkBuilder = `${
          linkBuilder ? `${linkBuilder ?? ""}&` : "?"
        }priceSort=${priceSort}`;
      }

      if (options?.limit) {
        linkBuilder = `${
          linkBuilder ? `${linkBuilder ?? ""}&` : "?"
        }limit=${limit}`;
      }

      if (result.hasPrevPage) {
        result.prevLink = `${req.baseUrl}${req.path}${
          linkBuilder ? `${linkBuilder}&` : "?"
        }page=${result.prevPage}`;
      }

      if (result.hasNextPage) {
        result.nextLink = `${req.baseUrl}${req.path}${
          linkBuilder ? `${linkBuilder}&` : "?"
        }page=${result.nextPage}`;
      }

      res.render("products", {
        ...result,
        title: "Explorador de Productos",
      });
    } else {
      console.error(
        "No se pudieron recuperar los productos de la Base de Datos."
      );
    }
  } catch (error) {
    console.error("getProductsView", error);
  }
};

export const getProductDetailView = async (req, res) => {
  const { productId } = req.params;

  const { Referer } = req;

  try {
    const product = await ProductProvider.getProduct(productId);

    if (product) {
      res.render("productDetail", {
        title: "Detalle de Producto",
        goBackLink: Referer,
        product,
      });
    } else {
      console.error(`No se encontró producto con Id "${productId}".`);
    }
  } catch (error) {
    console.error("getProductDetailView", error);
  }
};

export const getCartView = async (req, res) => {
  const { cartId } = req.params;

  try {
    const result = await CartProvider.getCartById(cartId);
    const cart = result.toJSON();

    if (cart) {
      res.render("cart", { title: "Carrito de Compras", cart });
    } else {
      console.error(`No se encontró carrito con Id "${cartId}".`);
    }
  } catch (error) {
    console.error("getCartView", error);
  }
};

export const addCartItem = async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const productToBeAdded = await ProductProvider.getProduct(productId);

    const updatedCart = await CartProvider.addCartItem(cartId, {
      productId: productToBeAdded._id,
      salesPrice: productToBeAdded.price,
      quantity: 1,
    });

    res.render("cart", { cart: updatedCart });
  } catch (error) {
    console.error("Product could not be added to specified cart.");
  }
};

export const updateCartItem = async (req, res) => {
  const { cartId, productId } = req.params;

  const { body } = req;

  try {
    const updatedCart = await CartProvider.updateCartItem();
  } catch (error) {
    console.error("Cart Item could not be updated.");
  }
};

export const userSignup = (req, res) => {
  res.render("signup", { title: "Registrar Nuevo Usuario" });
};

export const userLogin = (req, res) => {
  res.render("login", { title: "Entrar" });
};

export const userLogout = (req, res) => {};
