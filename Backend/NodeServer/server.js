let express = require("express");
const { init } = require("express/lib/application");
let app = express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let fs = require("fs");

io.on("connect", (socket) => {
  console.log(socket.id + " has connected");

  fs.readFile('dataURL.txt', 'utf8' , (err, imgURL) => {
    if (err) {
      console.error(err)
      return
    }
    io.to(socket.id).emit("load", imgURL);
    console.log("load")
  })

  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " has disconnected");
  });

  socket.on("save", (imgURL) => {
    fs.writeFile("dataURL.txt", imgURL, (err) => {
      if (err) console.log(err);
    });
    console.log("saved")
  });
});

app.use(express.static("public"));

let PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log("Server started on port : " + PORT));