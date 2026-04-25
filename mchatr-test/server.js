const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3055;

const server = http.createServer((req, res) => {
  // Главная страница
  if (req.url === "/" || req.url === "/index.html") {
    fs.readFile(path.join(__dirname, "index-all.html"), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index-all.html");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(content);
    });
  }
  // Статические файлы (.js, .css и т.д.)
  else if (req.url.endsWith(".js") || req.url.endsWith(".css")) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(req.url);
      const contentType = ext === ".js" ? "text/javascript" : "text/css";
      res.writeHead(200, { "Content-Type": `${contentType}; charset=utf-8` });
      res.end(content);
    });
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

server.listen(PORT, () => {
  console.log(
    `✅ СпектраМаяк - Комплексная диагностика (9 методик): http://localhost:${PORT}`,
  );
  console.log("Нажмите Ctrl+C для остановки");
});
