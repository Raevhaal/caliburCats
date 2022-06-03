/*
    Author: Horseface
    Date: 21/05/2022
*/

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

  if(Boxes.length > 0){

    for (let index = 0; index < vButtons.length; index++) {
      if(vButtons[index]["pressed"]){
        $(Boxes[index][0]).addClass("bg-success");
      } else {
        $(Boxes[index][0]).removeClass("bg-success");
      }
      
    }

  }
  _tmp = []
  for (let index = 0; index < Boxes.length; index++) {
    _tmp.push($(Boxes[index][1]).val())
  }

  $("#url").val(
    "https://caliburcats.horseface.no?config="
    + JSON.stringify(_tmp)
    + "&skin="
    + $("#SkinSelector").val()
  );

  //console.log(vButtons);
  requestAnimationFrame(process);
}

function removeGamepad(gamepad) {
  console.log('Removed gamepad:', gamepad.index);
}

var Boxes = [];

function handleConnect(e) {
  console.log('connected');
  $("#noGamePadConnected").hide();
  //Check if controller is already init
  if(Boxes.length == 0){
    for (let index = 0; index < e.gamepad.buttons.length; index++) {
      $("div.container").append(`<p class="mb-1 text-white" id="${index}"><select class="select2" id="${index}S" multiple="multiple" tabindex="0"> <option value="2">2</option> <option value="4">4</option> <option value="6">6</option> <option value="8">8</option> <option value="G">G</option> <option value="A">A</option> <option value="B">B</option> <option value="K">K</option></select>  Button: ${index}</p>`);
      $(`#${index}S`).select2();
      Boxes.push([`#${index}`, `#${index}S`])
    }
  }
  console.log(e.gamepad);
  requestAnimationFrame(process);
}

function handleDisconnect(e) {
  for (let index = 0; index < Boxes.length; index++) {
    $(Boxes[index][0]).remove()
    
  }
  $("#noGamePadConnected").show();
  Boxes = [];
  console.log('disconnected');
  removeGamepad(e.gamepad);
}

window.addEventListener("gamepadconnected", handleConnect);
window.addEventListener("gamepaddisconnected", handleDisconnect);

//#endregion


//#region Display handeling


//#endregion

$(document).ready(function() {
  
  $("#copy").on("click", function(){
    navigator.clipboard.writeText($("#url").val());
  })

});

//"#1, #2, #3, #4, #5, #6, #7, #8, #9"