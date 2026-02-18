import { httpRouter } from "convex/server";
import { authKit } from "./auth";
import { createUserFromCallback } from "./callbackCreateUser";

const http = httpRouter();

http.route({
  path: "/create-user-from-callback",
  method: "POST",
  handler: createUserFromCallback,
});

authKit.registerRoutes(http);
export default http;