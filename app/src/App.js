import "./App.css";
import { useEffect, useState } from "react";
import { initiateSocketConnection, disconnectSocket } from "./socktio.service";
import RPMComponent from "./Components/RPMComponent";

function App() {
  const [rpm, setRpm] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState("N");
  const [drs, setDRS] = useState("N");
  const [ers, setERS] = useState("N");
  const [flags, setFlags] = useState("N");
  const [lapData, setLapData] = useState("N");
  const [sector, setSector] = useState(1);
  const [position, setPosition] = useState(1);
  const [lap, setLap] = useState(1);
  const [lapTime, setLapTime] = useState("0:00.000");

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
      setLapTime,
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <RPMComponent rpm={rpm} size={15} />

        <div class="flex">
          <div class="self-center items-start">
            <div class="right"></div>
            <div class="right"></div>
            <div class="right"></div>
          </div>
          <div class="flex-grow-1 self-center">
            <div class="flex justify-center items-center">
              <div class="relative flex-grow max-w-full flex-1 px-4">
                <h2 class="lap">LAP</h2>
                <h2 id="lap" class="lap">
                  -
                </h2>
              </div>
              <div id="drs" class="drs off">
                DRS
              </div>
              <div class="relative flex-grow max-w-full flex-1 px-4">
                <div class="ers">ERS</div>
                <div id="ers" class="ers">
                  -
                </div>
              </div>
              <div class="relative flex-grow max-w-full flex-1 px-4">
                <div class="speed">KM/H</div>
                <h1 id="speed" class="speed">
                  -
                </h1>
              </div>
            </div>
            <div class="flex justify-center">
              <div class="flex flex-grow-1 flex-col items-center">
                <h1 id="position">-</h1>
              </div>
              <div class="flex flex-grow-1 flex-col items-center">
                <h1 id="gear">-</h1>
              </div>
              <div class="flex flex-grow-1 flex-col items-center">
                <div class="relative flex-grow max-w-full flex-1 px-4">
                  <h1 id="laptime-delta" class="delta">
                    -
                  </h1>
                  <h1 id="laptime" class="lap-time time">
                    -
                  </h1>
                </div>
                <div class="flex flex-wrap ">
                  <h1
                    id="s1"
                    class="time relative flex-grow max-w-full flex-1 px-4"
                  >
                    -
                  </h1>
                  <h1
                    id="s2"
                    class="time relative flex-grow max-w-full flex-1 px-4"
                  >
                    -
                  </h1>
                  <h1
                    id="s3"
                    class="time relative flex-grow max-w-full flex-1 px-4"
                  >
                    -
                  </h1>
                </div>
                <div class="flex flex-wrap ">
                  <h1
                    id="s1-delta"
                    class="delta relative flex-grow max-w-full flex-1 px-4"
                  >
                    -
                  </h1>
                  <h1
                    id="s2-delta"
                    class="delta relative flex-grow max-w-full flex-1 px-4"
                  >
                    -
                  </h1>
                  <h1
                    id="s3-delta"
                    class="delta relative flex-grow max-w-full flex-1 px-4"
                  >
                    -
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div class="self-center items-end">
            <div class="left"></div>
            <div class="left"></div>
            <div class="left"></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
