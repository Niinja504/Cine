// Importo todo lo de la libreria de Express
import express from "express";
import MoviesRoutes from "./src/routes/MovieRoute.js";
import registerEmployeesRoutes from "./src/routes/RegisterEmployeeRoute.js";
import loginRoutes from "./src/routes/LoginRoute.js";
import cookieParser from "cookie-parser";
import logoutRoutes from "./src/routes/LogoutRoute.js";
import registerClients from "./src/routes/RegisterClientsRoute.js";
import passwordRecoveryRoutes from "./src/routes/PasswordRecovery.js";
import blogRoutes from "./src/routes/BlogRoute.js";

// Creo una constante que es igual a la libreria que importé
const app = express();

// Que acepte datos en json
app.use(express.json());
// Que acepte cookies
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/movie", MoviesRoutes);

app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/registerClients", registerClients);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

app.use("/api/blog", blogRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
