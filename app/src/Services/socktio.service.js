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
  setThrottle,
  setBrake,
  setSuggestedGear,
  setTyres,
  setTyresAge,
}) => {
  socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
  console.log(`Connecting socket...`);

  socket.on("statusUpdate", function ({ carStatus, lapData, sector }) {
    //carStatus
    if (carStatus) {
      setERS(carStatus.m_ersDeployMode);
      setFlags(carStatus.m_vehicleFiaFlags);
      setTyres(carStatus.m_visualTyreCompound);
      setTyresAge(carStatus.m_tyresAgeLaps);
    }
    if (lapData) {
      setLapData(lapData);
    }

    if (sector) {
      setSector(sector);
    }
  });

  socket.on("lapdata", function ({ p, l, lapTime }) {
    setPosition(p);
    setLap(l);
    setLapTime(lapTime);
  });

  socket.on("carTelemetry", function ({ carTelemetry }) {
    setSpeed(carTelemetry.m_speed);
    setGear(carTelemetry.m_gear);
    setDRS(carTelemetry.m_drs);
    setRpm(carTelemetry.m_revLightsPercent);
    setThrottle(carTelemetry.m_throttle * 100);
    setBrake(carTelemetry.m_brake * 100);
    setSuggestedGear(carTelemetry.m_suggestedGear);
  });
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) {
    socket.off("lapdata");
    socket.off("statusUpdate");
    socket.off("dash");
    socket.off("carTelemetry");
    socket.disconnect();
  }
};
