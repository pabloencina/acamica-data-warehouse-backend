import jsonwebtoken from "jsonwebtoken";

export const buildToken = (user) => {
  const { name, surname, email, profile } = user;
  const payload = {
    name,
    surname,
    email,
    profile,
  };
  const secret = process.env.JWT_SECRET;
  const config = {
    expiresIn: "120m",
  };
  return jsonwebtoken.sign(payload, secret, config);
};

const userIsAdmin = (user) => {
  if (user.profile === "ADMIN") {
    return true;
  }
  return false;
};

export const authorizeAdmin = async (request, response, next) => {
  if (userIsAdmin(request.user)) {
    next();
  } else {
    response.status(403).json({
      error: "Not authorized to use this service.",
    });
  }
};
