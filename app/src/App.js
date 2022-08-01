import "./App.css";
import { useEffect, useState } from "react";
import { initiateSocketConnection, disconnectSocket } from "./Services/socktio.service";
import RPMComponent from "./Components/RPMComponent";
import FlagComponent from "./Components/FlagComponent";
import MainContentComponent from "./Components/MainContentComponent";

function App() {
  const [rpm, setRpm] = useState(0);
  const [flags, setFlags] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(0);
  const [drs, setDRS] = useState(false);
  const [ers, setERS] = useState("N");
  const [sector, setSector] = useState(1);
  const [position, setPosition] = useState(0);
  const [lap, setLap] = useState(0);
  const [lapTime, setLapTime] = useState("0:00.000");
  const [suggestedGear, setSuggestedGear] = useState(0);
  const [throttle, setThrottle] = useState(40);
  const [brake, setBrake] = useState(40);
  const [tyres, setTyres] = useState(16)
  const [tyresAge, setTyresAge] = useState(0)
  const [lapData, setLapData] = useState({
    m_lapTime: 0,
    m_sector1: { time: "8.888", delta: "0.000" },
    m_sector2: { time: "8.888", delta: "0.000" },
    m_sector3: { time: "8.888", delta: "0.000" },
  });

  useEffect(() => {
    initiateSocketConnection({
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
      setBrake,
      setThrottle,
      setSuggestedGear,
      setLapTime,
      setTyres,
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="App px-4">
      <RPMComponent rpm={rpm} size={15} align={"start"} />

      <div className="w-full flex flex-grow flex-row items-center">
        <FlagComponent
          size={3}
          position={"right"}
          align={"justify-self-start"}
          flags={flags}
        />
        <MainContentComponent
          speed={speed}
          gear={gear}
          suggestedGear={suggestedGear}
          drs={drs}
          ers={ers}
          sector={sector}
          position={position}
          lap={lap}
          lapTime={lapTime}
          lapData={lapData}
          brake={brake}
          throttle={throttle}
          tyres={tyres}
          tyresAge={tyresAge}
        />
        <FlagComponent
          size={3}
          position={"left"}
          align={"justify-self-end"}
          flags={flags}
        />
      </div>
    </div>
  );
}

export default App;
