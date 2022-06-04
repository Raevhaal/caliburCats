/*
    Author: Horseface
    Date: 21/05/2022
*/

//#region Gamepad buttons config

//TODO Customization
//Horseface default config?
var Config = [
  ["G"],
  ["K"],
  ["A"],
  ["B"],
  ["A", "B"],
  ["B", "G"],
  ["A", "G"],
  ["A", "B", "K"],
  [],
  [],
  [],
  [],
  ["8"],
  ["2"],
  ["4"],
  ["6"],
  [],
  [],
  [],
  [],
];

//Parse url parameters
let urlParam = new URLSearchParams(window.location.search);

//Button layout
if(urlParam.get("config") != null){
  _testConfig = JSON.parse(urlParam.get("config"));

  //Check that all values are strings
  _validConfig = true;
  for (let i = 0; i < _testConfig.length; i++) {
    for (let i2 = 0; i2 < _testConfig[i].length; i2++) {
      if(typeof(_testConfig[i][i2]) != "string"){
        _validConfig = false;
        break;
      }
    }
  }

  // 
  if(_validConfig){
    Config = _testConfig;
    console.log("Config was update based on URL Parameters");
  }
}
//#endregion

//#region SKin handling


function updateSkin(skin){
  //Skin is a string folder 
  $("#base").attr("src", `skins/${skin}/base.png`)
  $("#baseLL").attr("src", `skins/${skin}/left/baseLL.png`);
  $("#baseLR").attr("src", `skins/${skin}/left/baseLR.png`);
  $("#baseRL").attr("src", `skins/${skin}/right/baseRR.png`);
  $("#baseRR").attr("src", `skins/${skin}/right/baseRL.png`);
  
  $("#base8").attr("src", `skins/${skin}/left/baseL0001.png`);
  $("#base6").attr("src", `skins/${skin}/left/baseL0010.png`);
  $("#base4").attr("src", `skins/${skin}/left/baseL1000.png`);
  $("#base2").attr("src", `skins/${skin}/left/baseL0100.png`);
  $("#baseK").attr("src", `skins/${skin}/right/baseR0001.png`);
  $("#baseB").attr("src", `skins/${skin}/right/baseR0010.png`);
  $("#baseG").attr("src", `skins/${skin}/right/baseR1000.png`);
  $("#baseA").attr("src", `skins/${skin}/right/baseR0100.png`);


  $("#base68").attr("src", `skins/${skin}/left/baseL0011.png`);
  $("#baseBK").attr("src", `skins/${skin}/right/baseR0011.png`);
  $("#baseGA").attr("src", `skins/${skin}/right/baseR1100.png`);
  $("#base42").attr("src", `skins/${skin}/left/baseL1100.png`);

  console.log(`Skin was updated to ${skin}`)
}

if(urlParam.get("skin") != null && urlParam.get("skin") != "Default"){
  updateSkin(urlParam.get("skin"));
}

//#endregion


//#region Gamepad reading and setup
function process(){
  // Order goes GABK8462
  var vButtons = navigator.getGamepads();
  
  // Exit if no gamepad is connected
  if (vButtons.length == 0) {
    console.log("No gamepad connected")
    requestAnimationFrame(process);
  }
  vButtons = vButtons[0]["buttons"];

  var vBase = {
    "G": 0,
    "A": 0,
    "B": 0,
    "K": 0,
    "8": 0,
    "4": 0,
    "6": 0,
    "2": 0,
  };

  // Interpret controller state
  for (let i = 0; i < vButtons.length; i++) {
    if(vButtons[i]["pressed"] == true & Config[i].length > 0){
      for (let i2 = 0; i2 < Config[i].length; i2++) {
        vBase[Config[i][i2]] = true;
      }
    }
  }

  renderItems(vBase);
  requestAnimationFrame(process);
}

function removeGamepad(gamepad) {
  console.log('Removed gamepad:', gamepad.index);
}

function handleConnect(e) {
  console.log('connected');
  console.log(e.gamepad);
  requestAnimationFrame(process);
}

function handleDisconnect(e) {
  console.log('disconnected');
  removeGamepad(e.gamepad);
}

window.addEventListener("gamepadconnected", handleConnect);
window.addEventListener("gamepaddisconnected", handleDisconnect);

//#endregion


//#region Display handeling

// Displays the inputs
// example buttons = {"4": true, "A": true, " "B": true ...}
function renderItems(buttons){
  var _ids = [];

  // 4+2
  if(buttons["4"] & buttons["2"]){
    _ids.push("#base42");
  } else {
    if(buttons["4"]){ _ids.push("#base4"); }
    else if(buttons["2"]){ _ids.push("#base2"); }
    else { _ids.push("#baseLL"); }
  }

  // 6+8
  if(buttons["6"] & buttons["8"]){
    _ids.push("#base68");
  } else {
    if(buttons["6"]){ _ids.push("#base6"); }
    else if(buttons["8"]){ _ids.push("#base8"); }
    else { _ids.push("#baseLR"); }
  }

  // A+G
  if(buttons["G"] & buttons["A"]){
    _ids.push("#baseGA");
  } else {
    if(buttons["A"]){ _ids.push("#baseA"); }
    else if(buttons["G"]){ _ids.push("#baseG"); }
    else { _ids.push("#baseRR"); }
  }

  // B+K
  if(buttons["B"] & buttons["K"]){
    _ids.push("#baseBK");
  } else {
    if(buttons["B"]){ _ids.push("#baseB"); }
    else if(buttons["K"]){ _ids.push("#baseK"); }
    else { _ids.push("#baseRL"); }
  }
  
  // ?apply
  var _pressedIds = _ids.join(", ")
  $("#buttonGroup img").removeClass("show");
  $(_pressedIds).addClass("show");
}
//#endregion