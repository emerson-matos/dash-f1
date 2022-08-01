const zeroPad = (num, places) => String(num).padStart(places, "0");
let socket = io();
let speed = document.getElementById("speed");
let gear = document.getElementById("gear");
let lap = document.getElementById("lap");
let drsElement = document.getElementById("drs");
let ersElement = document.getElementById("ers");
let laptime = document.getElementById("laptime");
let laptimeDelta = document.getElementById("laptime-delta");
let sector1Delta = document.getElementById("s1-delta");
let sector2Delta = document.getElementById("s2-delta");
let sector3Delta = document.getElementById("s3-delta");
let sector1 = document.getElementById("s1");
let sector2 = document.getElementById("s2");
let sector3 = document.getElementById("s3");
let position = document.getElementById("position");
let lateralLeft = document.querySelectorAll(".left");
let lateralRight = document.querySelectorAll(".right");
let actualSector = -1;
//var rpm = document.getElementById('rpm')

socket.on("dash", function (cardata) {
  // velocidade
  speed.textContent = `${zeroPad(cardata.speed, 3)}`;
  // RPM
  lightLeds(cardata.rpm);
  // Marcha
  let cargear = cardata.gear;
  switch (cargear) {
    case 0:
      gear.textContent = "N";
      break;
    case -1:
      gear.textContent = "R";
      break;
    default:
      gear.textContent = cargear;
      break;
  }

  if (cardata.drs == 1) {
    drsElement.classList.add("on");
    drsElement.classList.remove("off");
  } else {
    drsElement.classList.remove("on");
    drsElement.classList.add("off");
  }
});

const ersMode = {
  0: "none",
  1: "medium",
  2: "hotlap",
  3: "overtake",
};

socket.on("statusUpdate", function ({ carStatus, lapData, sector }) {
  //carStatus
  if (carStatus) {
    // ers
    ersElement.textContent = ersMode[carStatus.m_ersDeployMode];
    lateralLedsFlags(carStatus.m_vehicleFiaFlags);
  }
  if (lapData) {
    if (lapData.m_lapTime) laptimeDelta.textContent = lapData.m_lapTime;
    if (actualSector > -1 && lapData.m_sector1.time) {
      sector1.textContent = lapData.m_sector1.time;
      sector1Delta.textContent = lapData.m_sector1.delta;
    }

    if (actualSector > 0 && lapData.m_sector2.time) {
      sector2.textContent = lapData.m_sector2.time;
      sector2Delta.textContent = lapData.m_sector2.delta;
    }

    if (actualSector > 1 && lapData.m_sector3.time) {
      sector3.textContent = lapData.m_sector3.time;
      sector3Delta.textContent = lapData.m_sector3.delta;
    }
  }

  if (sector && sector != actualSector) {
    actualSector = sector;
    if (sector == 0) {
      sector2.textContent = "0.000";
      sector2Delta.textContent = "0.000";
      sector3.textContent = "0.000";
      sector3Delta.textContent = "0.000";
    }
  }
});

socket.on("lapdata", function ({ p, l, lapTime }) {
  laptime.textContent = lapTime;
  position.textContent = `P ${p}`;
  lap.textContent = `V ${l}`;
});

const dictionaryLeds = {
  led1: "#FF2121",
  led2: "#FF2121",
  led3: "#FF2121",
  led4: "#FF2121",
  led5: "#013FFA",
  led6: "#013FFA",
  led7: "#013FFA",
  led8: "#013FFA",
  led9: "#013FFA",
  led10: "#2AFA06",
  led11: "#2AFA06",
  led12: "#2AFA06",
  led13: "#FFEE00",
  led14: "#FFEE00",
  led15: "#FFEE00",
};

/**
 * Função para acender as luzes REV LIGHTS
 *
 * @param {*} rpm 0 -> 14 RPM
 */
function lightLeds(rpm) {
  if (rpm > 90) {
    document.body.style.backgroundColor = "#6801DB";
  } else {
    document.body.style.backgroundColor = "black";
  }

  let numLeds = 15;
  let intRpm = parseInt((rpm * numLeds) / 100);
  //liga o que for menor
  for (let index = intRpm; index > 0; index--) {
    let light = `led${index}`;
    document.getElementById(light).style.backgroundColor =
      dictionaryLeds[light];
    document.getElementById(
      light
    ).style.boxShadow = `0px 0px 20px ${dictionaryLeds[light]}`;
  }
  //desliga o que for maior
  for (let index = intRpm + 1; index <= numLeds; index++) {
    let light = `led${index}`;
    document.getElementById(light).style.backgroundColor = "gray";
    document.getElementById(light).style.boxShadow = `0px 0px 0px black`;
  }
}

const dictionaryFlags = {
  0: "gray",
  1: "green",
  2: "blue",
  3: "yellow",
  4: "red",
};
/**
 * função para pintar os leds laterais com as cores das bandeiras de aviso da FIA
 *
 * @param {*} lightColor
 */
function lateralLedsFlags(lightColor) {
  lateralLeft.forEach((led) => {
    led.style.backgroundColor = dictionaryFlags[lightColor];
  });
  lateralRight.forEach((led) => {
    led.style.backgroundColor = dictionaryFlags[lightColor];
  });
}
