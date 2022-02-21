// const fastifyJwt = require("fastify-jwt");
// const fp = require("fastify-plugin");

// async function customJwtAuth(fastify, opts, next) {
//   fastify.register(fastifyJwt, {
//     secret: "secret",
//   });
//   fastify.decorate("authenticate", async function (request, reply) {
//     try {
//       await request.jwtVerify();
//     } catch (err) {
//       reply.send(err);
//     }
//   });
// }

// module.exports = fp(customJwtAuth, { fastify: ">=1.0.0" });
