import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "falamais-ai API",
    version: "0.1.0",
  },
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                  },
                  required: ["status"],
                },
              },
            },
          },
        },
      },
    },
  },
};

server.get("/health", async () => ({ status: "ok" }));
server.get("/openapi.json", async () => openapiSpec);

server.setNotFoundHandler((request, reply) => {
  reply.status(404).type("application/problem+json").send({
    type: "about:blank",
    title: "Not Found",
    status: 404,
    detail: "Route not found",
    instance: request.url,
  });
});

server.setErrorHandler((error, request, reply) => {
  const status = error.statusCode ?? 500;
  reply.status(status).type("application/problem+json").send({
    type: "about:blank",
    title: status >= 500 ? "Internal Server Error" : "Request Error",
    status,
    detail: error.message,
    instance: request.url,
  });
});

const port = Number(process.env.PORT || 4000);

server.listen({ port, host: "0.0.0.0" }).catch((error) => {
  server.log.error(error, "server failed to start");
  process.exit(1);
});
