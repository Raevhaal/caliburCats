/*
    Author: Horseface
    Date: 21/05/2022
*/

//#region Gamepad buttons config

//TODO Customization
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
    else { _ids.push("#baseRL"); }
  }

  // B+K
  if(buttons["B"] & buttons["K"]){
    _ids.push("#baseBK");
  } else {
    if(buttons["B"]){ _ids.push("#baseB"); }
    else if(buttons["K"]){ _ids.push("#baseK"); }
    else { _ids.push("#baseRR"); }
  }
  
  // ?apply
  var _pressedIds = _ids.join(", ")
  $("#buttonGroup img").removeClass("show");
  $(_pressedIds).addClass("show");
}
//#endregion