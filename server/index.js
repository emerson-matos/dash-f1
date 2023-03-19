const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { F122UDP } = require("f1-22-udp");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origins: ["http://localhost"],
  },
});
// variavel global
let bestLap = 0;
let actualLap = 0;

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Front-End connected");
  socket.on("disconnect", () => {
    console.log("Front-End disconnected");
  });
});

function sendToFront_lapData(position, lap, laptime) {
  io.emit("lapdata", {
    p: position,
    l: lap,
    lapTime: laptime,
  });
}

const client = new F122UDP({ address: "0.0.0.0", port: 20777 });

client.on("carTelemetry", function (data) {
  let driverID = data.m_header.m_playerCarIndex;
  io.emit("carTelemetry", {
    carTelemetry: {
      ...data.m_carTelemetryData[driverID],
      gear: data.m_suggestedGear,
    },
  });
});

function millisToMinutesAndSeconds(duration) {
  let signal = duration >= 0 ? "" : "-";
  duration = Math.abs(duration);
  let milliseconds = Math.floor(duration % 1000),
    seconds = Math.floor(duration / 1000),
    minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  minutes = minutes > 0 ? minutes + ":" : "";
  return signal + minutes + seconds + "." + milliseconds;
}

client.on("lap", function (data) {
  let driverID = data.m_header.m_playerCarIndex;
  let driverData = data.m_lapData[driverID];
  let position = driverData.m_carPosition;
  let lap = driverData.m_currentLapNum;
  sendToFront_lapData(
    position,
    lap,
    millisToMinutesAndSeconds(driverData.m_currentLapTimeInMS)
  );
  io.emit("statusUpdate", { sector: driverData.m_sector });
});

client.on("carStatus", function (data) {
  let driverID = data.m_header.m_playerCarIndex;
  let carStatus = data.m_carStatusData[driverID];
  io.emit("statusUpdate", { carStatus: carStatus });
});

client.on("carDamage", function (data) {
  let driverID = data.m_header.m_playerCarIndex;
  io.emit("statusUpdate", { carDamage: data.m_carDamageData[driverID] });
});

client.on("carSetups", function (data) {
  let driverID = data.m_header.m_playerCarIndex;
  io.emit("statusUpdate", { carSetups: data.m_carSetups[driverID] });
});

// client.on("session", function (data) {
//   let driverID = data.m_header.m_playerCarIndex;
//   console.log("session", data);
// });

// client.on("participants", function (data) {
//   let driverID = data.m_header.m_playerCarIndex;
//   console.log("participants", data);
// });

// client.on("lobbyInfo", function (data) {
// let driverID = data.m_header.m_playerCarIndex;
// console.log("lobbyInfo", data);
// });

// client.on("finalClassification", function (data) {
// let driverID = data.m_header.m_playerCarIndex;
// console.log("finalClassification", data);
// });

client.on("sessionHistory", function (data) {
  let driverID = data.m_header.m_playerCarIndex;
  if (driverID === data.m_carIdx) {
    let history = data.m_lapHistoryData;
    if (bestLap >= 0 && bestLap < 100 && actualLap > -1) {
      let actual = history[actualLap];
      let lapData = {
        m_sector1: {
          time: millisToMinutesAndSeconds(actual.m_sector1TimeInMS),
          delta: millisToMinutesAndSeconds(
            actual.m_sector1TimeInMS - history[bestLap].m_sector1TimeInMS
          ),
        },
        m_sector2: {
          time: millisToMinutesAndSeconds(actual.m_sector2TimeInMS),
          delta: millisToMinutesAndSeconds(
            actual.m_sector2TimeInMS - history[bestLap].m_sector2TimeInMS
          ),
        },
        m_sector3: {
          time: millisToMinutesAndSeconds(actual.m_sector3TimeInMS),
          delta: millisToMinutesAndSeconds(
            actual.m_sector3TimeInMS - history[bestLap].m_sector3TimeInMS
          ),
        },
        m_lapTime: millisToMinutesAndSeconds(actual.m_lapTimeInMS),
      };
      bestLap = data.m_bestLapTimeLapNum - 1;
      actualLap = data.m_numLaps - 1;

      io.emit("statusUpdate", { lapData });
    }
    
    console.log(
      "lpas",
      bestLap,
      data.m_bestLapTimeLapNum - 1,
      actualLap,
      data.m_numLaps - 1
    );
  }
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
// const node_dgram_1 = require("node:dgram");
// let socket = (0, node_dgram_1.createSocket)('udp4');
// socket.bind({ port: 20777, address: "0.0.0.0" });
// socket.on('listening', () => {
//   socket.on('message', (msg, rinfo) => {
//       switch (rinfo.size) {
//           case constants_1.packetSize.Motion: {
//               const { data } = new parsers_6.PacketMotionDataParser(msg);
//               this.emit('motion', data);
//               break;
//           }
//           case constants_1.packetSize.Session:
//               {
//                   const { data } = new parsers_8.PacketSessionDataParser(msg);
//                   this.emit('session', data);
//               }
//               break;
//           case constants_1.packetSize.LapData: {
//               const { data } = new parsers_5.PacketLapDataParser(msg);
//               this.emit('lap', data);
//               break;
//           }
//           case constants_1.packetSize.Event: {
//               const { data } = new parsers_4.PacketEventDataParser(msg);
//               this.emit('event', data);
//               break;
//           }
//           case constants_1.packetSize.Participants: {
//               const { data } = new parsers_7.PacketParticipantsParser(msg);
//               this.emit('participants', data);
//               break;
//           }
//           case constants_1.packetSize.CarSetups: {
//               const { data } = new parsers_2.PacketCarSetupDataParser(msg);
//               this.emit('carSetups', data);
//               // log packet size
//               break;
//           }
//           case constants_1.packetSize.CarTelemetry: {
//               const { data } = new parsers_3.PacketCarTelemetryDataParser(msg);
//               this.emit('carTelemetry', data);
//               break;
//           }
//           case constants_1.packetSize.CarStatus: {
//               const { data } = new parsers_1.PacketCarStatusDataParser(msg);
//               this.emit('carStatus', data);
//               break;
//           }
//           case constants_1.packetSize.Finallassification: {
//               const { data } = new parsers_9.PacketFinalClassificationDataParser(msg);
//               this.emit('finallassification', data);
//               break;
//           }
//           case constants_1.packetSize.LobbyInfo:
//               {
//                   const { data } = new parsers_10.PacketLobbyInfoDataParser(msg);
//                   this.emit('lobbyInfo', data);
//               }
//               break;
//           case constants_1.packetSize.CarDamage:
//               {
//                   const { data } = new parsers_11.PacketCarDamageDataParser(msg);
//                   this.emit('carDamage', data);
//                   //12685950950652358499n
//               }
//               break;
//           case constants_1.packetSize.SessionHistory:
//               {
//                   const { data } = new parsers_12.PacketSessionHistoryDataParser(msg);
//                   this.emit('sessionHistory', data);
//               }
//               break;
//           default:
//               break;
//       }
//   });
// });
