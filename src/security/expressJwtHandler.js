import expressJwt from "express-jwt";

// Middleware para validar que el token de las peticiones
// se haya firmado con el secret correcto
export const expressJwtHandler = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}).unless({
  path: ["/login"],
});
