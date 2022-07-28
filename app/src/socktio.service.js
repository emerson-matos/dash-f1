import { io } from "socket.io-client";

let socket;

export const initiateSocketConnection = ({
  setRpm,
  setSpeed,
  setGear,
  setDRS,
  setERS,
  setFlags,
  setLapData,
  setSector,
  setPosition,
  setLap,
  setLapTime,
}) => {
  socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
  console.log(`Connecting socket...`);

  socket.on("dash", function (cardata) {
    console.log("dash");
    // velocidade
    setSpeed(cardata.speed);
    // RPM
    setRpm(cardata.rpm);
    // Marcha
    setGear(cardata.gear);
    //   switch (cargear) {
    //     case 0:
    //       gear.textContent = "N";
    //       break;
    //     case -1:
    //       gear.textContent = "R";
    //       break;
    //     default:
    //       gear.textContent = cargear;
    //       break;
    //   }

    //   if ( == 1) {
    //     drsElement.classList.add("on");
    //     drsElement.classList.remove("off");
    //   } else {
    //     drsElement.classList.remove("on");
    //     drsElement.classList.add("off");
    //   }

    // const ersMode = {
    //   0: "none",
    //   1: "medium",
    //   2: "hotlap",
    //   3: "overtake",
    // };
    setDRS(cardata.drs);
  });

  socket.on("statusUpdate", function ({ carStatus, lapData, sector }) {
    console.log("statusUpdate");
    //carStatus
    if (carStatus) {
      // ers
      setERS(carStatus.m_ersDeployMode);
      setFlags(carStatus.m_vehicleFiaFlags);
    }
    if (lapData) {
      setLapData(lapData);
      //     if (lapData.m_lapTime) laptimeDelta.textContent = lapData.m_lapTime;
      //     if (actualSector > -1 && lapData.m_sector1.time) {
      //       sector1.textContent = lapData.m_sector1.time;
      //       sector1Delta.textContent = lapData.m_sector1.delta;
      //     }

      //     if (actualSector > 0 && lapData.m_sector2.time) {
      //       sector2.textContent = lapData.m_sector2.time;
      //       sector2Delta.textContent = lapData.m_sector2.delta;
      //     }

      //     if (actualSector > 1 && lapData.m_sector3.time) {
      //       sector3.textContent = lapData.m_sector3.time;
      //       sector3Delta.textContent = lapData.m_sector3.delta;
      //     }
    }

    if (sector) {
      setSector(sector);
      //     actualSector = sector;
      //     if (sector == 0) {
      //       sector2.textContent = "0.000";
      //       sector2Delta.textContent = "0.000";
      //       sector3.textContent = "0.000";
      //       sector3Delta.textContent = "0.000";
      //     }
    }
  });

  socket.on("lapdata", function ({ p, l, lapTime }) {
    console.log("lapdata");
    setPosition(p);
    setLap(l);
    setLapTime(lapTime);
  });
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) {
    socket.off("lapdata");
    socket.off("statusUpdate");
    socket.off("dash");
    socket.disconnect();
  }
};
