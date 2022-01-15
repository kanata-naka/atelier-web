import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const server = express();

["gallery", "works"].forEach((page) => {
  server.get(`/${page}/:id`, (req, res) => {
    return app.render(req, res, `/${page}`, { id: req.params.id });
  });
});

server.get("*", (req, res) => {
  return app.getRequestHandler()(req, res);
});

app.prepare().then(() => {
  server.listen(8080, () => {
    console.log("> Ready on http://localhost:8080");
  });
});
