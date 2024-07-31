// Set up: npm install
var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    open = require("open"),
    ProtoBuf = require("protobufjs");

// Copy dependencies to "www/" (example specific, you usually don't have to care
var deps = [
    ["Long.min.js", "./node_modules/protobufjs/node_modules/bytebuffer/node_modules/long/dist/Long.min.js"],
    ["ByteBufferAB.min.js", "./node_modules/protobufjs/node_modules/bytebuffer/dist/ByteBufferAB.min.js"],
    ["ProtoBuf.min.js", "./node_modules/protobufjs/dist/ProtoBuf.min.js"]
];
for (var i=0, dep, data; i<deps.length; i++) {
    dep = deps[i];
    if (!fs.existsSync(path.join(__dirname, "www", dep[0]))) {
        console.log("Copying "+dep[0]+" from "+dep[1]);
        try {
            fs.writeFileSync(path.join(__dirname, "www", dep[0]), fs.readFileSync(path.join(__dirname, dep[1])));
        } catch (err) {
            console.log("Copying failed: "+err.message);
            console.log("\nDid you run `npm install` ?");
            process.exit(1);
        }
    }
}

// Initialize from .proto file
var builder = ProtoBuf.loadProtoFile(path.join(__dirname, "www", "HomePageMessage.proto")),
    Message = builder.build("O2OHomePageRequest");

// HTTP server
var server = http.createServer(function(req, res) {
    if (path.normalize(decodeURI(req.url)) !== decodeURI(req.url)) {
        res.statusCode = 403;
        res.end();
        return;
    }
        var file = null,
            type = "text/html";
        var url = req.url.split("?")[0];
        if (url == "/") {
            file = "index.html";
        } else if (/\/([\w.-]+(?:\.min)?\.(?:js|css|html|proto|woff|woff2|ttf|txt))$/.test(url)) {
            file = url.substring(1);
            if (/\.js$/.test(file)) {
                type = "text/javascript";
            } else if (/\.css$/.test(file)) {
                type = "text/css";
            } else if (/\.txt$/.test(file)) {
                type = "application/x-protobuf";
            }
        }
        console.log(url);
        if (file) {
            fs.readFile(path.join(__dirname, "www", file), function(err, data) {
                if (err) {
                    res.writeHead(500, {"Content-Type": type});
                    res.end("Internal Server Error: "+err);
                } else {
                    res.writeHead(200, {"Content-Type": type});
                    res.write(data);
                    res.end();
                    console.log("Served www/"+file);
                }
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("Not Found");
        }
    });
server.listen(8080);
server.on("listening", function() {
    console.log("Server started");
    open("http://127.0.0.1:8080/");
});
server.on("error", function(err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});