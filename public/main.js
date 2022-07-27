const zeroPad = (num, places) => String(num).padStart(places, '0')
let socket = io();
let speed = document.getElementById('speed')
let gear = document.getElementById('gear')
let lap = document.getElementById('lap')
let laptime = document.getElementById('laptime')
let position = document.getElementById('position')
let lateralLeft = document.querySelectorAll('.left')
let lateralRight = document.querySelectorAll('.right')
//var rpm = document.getElementById('rpm')

socket.on('dash', function (cardata) {
    // velocidade
    speed.textContent = `KM/H: ${zeroPad(cardata.speed, 3)}`
    // RPM
    lightLeds(cardata.rpm)
    // Marcha
    let cargear = cardata.gear
    switch (cargear) {
        case 0:
            gear.textContent = 'N'
            break
        case -1:
            gear.textContent = 'R'
            break
        default:
            gear.textContent = cargear
            break;
    }

    if (cardata.drs == 1) {
        document.getElementById('drs').style.backgroundColor = "#2AFA06"
        document.getElementById('drs').textContent = 'DRS ON'
    } else {
        document.getElementById('drs').style.backgroundColor = "black"
        document.getElementById('drs').textContent = 'DRS OFF'
    }


});
const ersMode = { 0: "none",
1 : "medium",
2: "hotlap",
3: "overtake"
}
socket.on('carStatus', function (carStatus) {
    //velocidade
    
    document.getElementById('ers') = ersMode[carStatus.m_ersDeployMode];
    


});

socket.on('lapdata', function (lapdata) {

    position.textContent = `P${lapdata.p}`
    lap.textContent = `V${lapdata.l}`
    laptime.textContent = lapdata.laptime
    lateralLedsFlags(lapdata.fia_flag)

});

const dictionaryLeds = {
    led1: '#FF2121',
    led2: '#FF2121',
    led3: '#FF2121',
    led4: '#FF2121',
    led5: '#013FFA',
    led6: '#013FFA',
    led7: '#013FFA',
    led8: '#013FFA',
    led9: '#013FFA',
    led10: '#2AFA06',
    led11: '#2AFA06',
    led12: '#2AFA06',
    led13: '#FFEE00',
    led14: '#FFEE00',
    led15: '#FFEE00'
}

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

    let numLeds = 15
    let intRpm = parseInt(rpm * numLeds)
    //liga o que for menor
    for (let index = intRpm; index > 0; index--) {
        let light = `led${index}`
        console.log("FSDR ~ lightLeds ~ light ON", light)
        document.getElementById(light).style.backgroundColor = dictionaryLeds[light]
        document.getElementById(light).style.boxShadow = `0px 0px 20px ${dictionaryLeds[light]}`
    }
    //desliga o que for maior
    for (let index = intRpm + 1; index <= numLeds; index++) {
        let light = `led${index}`
        console.log("FSDR ~ lightLeds ~ light OFF", light)
        document.getElementById(light).style.backgroundColor = "gray"
        document.getElementById(light).style.boxShadow = `0px 0px 0px black`
    }

}

const dictionaryFlags = {
    0: 'gray',
    1: 'green',
    2: 'blue',
    3: 'yellow',
    4: 'red'
}
/**
 * função para pintar os leds laterais com as cores das bandeiras de aviso da FIA
 *
 * @param {*} lightColor
 */
function lateralLedsFlags(lightColor) {

    lateralLeft.forEach(led => {
        led.style.backgroundColor = dictionaryFlags[lightColor]
    });
    lateralRight.forEach(led => {
        led.style.backgroundColor = dictionaryFlags[lightColor]
    });
}




