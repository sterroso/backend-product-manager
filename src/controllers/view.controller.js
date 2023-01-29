import * as ProductProvider from "../dao/product.mongo-dao.js";
import * as CartProvider from "../dao/cart.mongo-dao.js";
import { CustomProductPaginationLabels } from "../constants/constants.js";

export const getHomeView = (req, res) => {
  res.render("home", { title: "Inicio" });
};

export const getProductsView = async (req, res) => {
  const { categoryId, status, priceSort, limit, page } = req.query;

  const filter = {};

  const options = {};

  options.customLabels = CustomProductPaginationLabels;

  options.sort = {};

  if (categoryId) filter.category = categoryId;

  if (["true", "false"].includes(status)) filter.status = status;

  if (["asc", "desc"].includes(priceSort))
    options.sort.price = priceSort === "asc" ? 1 : -1;

  if (limit) options.limit = limit;

  if (page) options.page = page;

  try {
    const result = await ProductProvider.getProducts(filter, options);

    if (result.payload.length > 0) {
      res.render("products", {
        title: "Explorador de Productos",
        products: result,
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

  try {
    const product = await ProductProvider.getProduct(productId);

    if (product) {
      res.render("productDetail", { title: "Detalle de Producto", product });
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
    const result = await CartProvider.getCart(cartId);
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
