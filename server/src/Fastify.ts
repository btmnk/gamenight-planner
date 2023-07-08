import fastify from "fastify";

export const Fastify = fastify({
  maxParamLength: 5000,
});
