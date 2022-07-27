const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { F122UDP } = require("f1-22-udp");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
// variavel global
// id do piloto
let driverID = 0;
let fiaFlags = 0;

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// arquivos estaticos
app.use("/static", express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("Front-End conectado");
  socket.on("disconnect", () => {
    console.log("Front-End Disconectado");
  });
});

function sendToFront(speed, gear, rpm, drs) {
  io.emit("dash", { speed: speed, gear: gear, rpm: rpm, drs: drs });
}

function sendToFront_lapData(position, lap, laptime) {
  console.log("udate lap data", position, lap, laptime);
  io.emit("lapdata", {
    p: position,
    l: lap,
    laptime: laptime,
    fia_flag: fiaFlags,
  });
}

const client = new F122UDP({address: "0.0.0.0", port: 20777});

client.on("motion", function (data) {
  console.log(data);
});

client.on("event", (data) => {
  console.log(data);
});

client.on("carTelemetry", function (data) {
  let speed = data.m_carTelemetryData[driverID].m_speed;
  let gear = data.m_carTelemetryData[driverID].m_gear;
  let _rpm = data.m_carTelemetryData[driverID].m_engineRPM;
  let drs = data.m_carTelemetryData[driverID].m_drs;
  let revLight = data.m_carTelemetryData[driverID].m_revLightsPercent;
  console.log(revLight);
  // console.log(rpm);
  sendToFront(speed, gear, revLight, drs);
});

client.on("lapData", function (data) {
  function millisToMinutesAndSeconds(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = minutes < 10 ? 0 + minutes : minutes;
    seconds = seconds < 10 ? 0 + seconds : seconds;

    return minutes + ":" + seconds + "." + milliseconds; 
  }

  let position = data.m_lapData[driverID].m_carPosition;
  let lap = data.m_lapData[driverID].m_currentLapNum;
  let lapTime = millisToMinutesAndSeconds(
    data.m_lapData[driverID].m_lastLapTimeInMS
  );

  sendToFront_lapData(position, lap, lapTime);
});

client.on("carStatus", function (data) {
  let carStatus = data.m_carStatusData[driverID]
  fiaFlags = carStatus.m_vehicleFiaFlags;
  io.emit("carStatus", { carStatus: carStatus });
});

client.on("participants", function (data) {
  driverID = data.m_header.m_playerCarIndex;
});

client.start();

// inicia servidor express
server.listen(3000, () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

// Print Local IP
let ifaces = require("os").networkInterfaces();
let adresses = Object.keys(ifaces).reduce(function (result, dev) {
  return result.concat(
    ifaces[dev].reduce(function (interfaces, details) {
      return interfaces.concat(
        details.family === "IPv4" && !details.internal
          ? [details.address]
          : [] + " -- "
      );
    }, [])
  );
});

console.log(`IP Local: ${adresses}`);

// const dgram = require('node:dgram');

// const serve2r = dgram.createSocket('udp4');

// serve2r.bind({port: 20777});
// serve2r.on('error', (err) => {
//   console.log(`server error:\n${err.stack}`);
//   serve2r.close();
// });

// serve2r.on('listening', () => {
//   const address = serve2r.address();
//   console.log(`server listening ${address.address}:${address.port}`);
//   serve2r.on('message', (msg, rinfo) => {
//     console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
//   });
// });
