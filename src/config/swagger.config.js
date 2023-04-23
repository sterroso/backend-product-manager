export default {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Manager API",
      author: "Sergio Terroso Cabrera <sergio.terroso@gmail.com>",
      version: "1.0.0",
      description: "An e-commerce product manager API.",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: [
    "./src/routes/carts.router.js",
    "./src/routes/category.router.js",
    "./src/routes/products.router.js",
    "./src/routes/users.router.js",
  ],
};
