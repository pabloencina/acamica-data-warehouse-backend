import compression from "compression";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import expressRateLimit from "express-rate-limit";
import expressJwt from "express-jwt";
import morgan from "morgan";


import loginRoutes from "./src/routes/loginRoutes"


//2- Crear la instancia de Express.
const server = express();

// 3.1- Definir constantes.
const PORT = 3000;

//module.exports = require('./lib/sequelize');
//server.set('port', process.env.PORT || 3000)
server.set('port', PORT);
//localhost -> 127.0.0.1:3000

//3- Agregar Middleware(vigilantes ante de llegar a la ruta es es middleware) globales.
server.use(express.json());// este middleware nos convierte el json del body en objeto.
server.use(compression());
server.use(helmet());
//server.use(jsonwebtoken());
//server.use(sequelize());
server.use(expressRateLimit());
server.use(morgan("dev"))// nos indica mensajes en la consola.


let secretJWT = "ponerAlgoSuperComplicadoConNumuerosYCaracteres1234"

export const expressJwtHandler = expressJwt({
    secret: secretJWT,
    algorithms: ["HS256"],
}).unless({
    path: ["/login"]
});

server.use(
    expressJwtHandler
);

server.use(
    rateLimit({
        message: "Try later please",
        max: 10,
        windowMs: 60 * 1000
    })
)

//server.use(productRoutes);
//server.use(customerRoutes);
//server.use(administratorRoutes);
server.use(loginRoutes);
//server.use(orderRoutes);
server.listen(server.get("port"))
console.log(`Se ha iniciado el servidor en el puerto ${PORT}`);

