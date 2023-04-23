import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiExpress from "swagger-ui-express";
import { engine } from "express-handlebars";

// Import Routers
import WarehouseRouter from "./src/routes/warehouse.router.js";
import ProductsRouter from "./src/routes/products.router.js";
import CartsRouter from "./src/routes/carts.router.js";
import CategoriesRouter from "./src/routes/category.router.js";
import UsersRouter from "./src/routes/users.router.js";
import AuthRouter from "./src/routes/auth.router.js";
import PassportLocalRouter from "./src/routes/passportLocal.router.js";
import PassportGithubRouter from "./src/routes/github.router.js";
import ViewsRouter from "./src/routes/views.router.js";

// Import Logger
import HttpLogger from "./src/middlewares/logger.middleware.js";

// Import Swagger Options
import swaggerConfig from "./src/config/swagger.config.js";

// Access to environment variables.
dotenv.config();

// Create an app.
const app = express();

// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      options: {
        userNewUrlParse: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // Seven days
  })
);
app.use(HttpLogger);

app.use(passport.initialize());
app.use(passport.session());

// Express-Handlebars engine setup
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "src/views");

// Setup swagger for api documentation
const swaggerSpec = swaggerJSDoc(swaggerConfig);

// App routes
app.use("/", ViewsRouter);
app.use(
  "/apidocs",
  SwaggerUiExpress.serve,
  SwaggerUiExpress.setup(swaggerSpec)
);
app.use("/api/auth/", AuthRouter);
app.use("/api/passportLocal/", PassportLocalRouter);
app.use("/api/github/", PassportGithubRouter);
app.use("/api/users/", UsersRouter);
app.use("/api/categories/", CategoriesRouter);
app.use("/api/warehouses/", WarehouseRouter);
app.use("/api/products/", ProductsRouter);
app.use("/api/carts/", CartsRouter);

// Module exports
export default app;
