function updateUI(){
  if(radius === 80 || radius === 132){
    $('#setLargeGear').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear').css("background-image", "none") 
    $('#setSmallGear').css("background-image", "none") 
    $('#setLargeGear').css("color", "#fff")
    $('#setMedGear').css("color", "#000") 
    $('#setSmallGear').css("color", "#000") 
  }
  else if(radius === 64 || radius === 116){
    $('#setMedGear').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGear').css("background-image", "none") 
    $('#setSmallGear').css("background-image", "none") 
    $('#setLargeGear').css("color", "#000")
    $('#setMedGear').css("color", "#fff") 
    $('#setSmallGear').css("color", "#000") 
  }
  else if(radius === 48 || radius === 100){
    $('#setSmallGear').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear').css("background-image", "none") 
    $('#setLargeGear').css("background-image", "none") 
    $('#setLargeGear').css("color", "#000")
    $('#setMedGear').css("color", "#000") 
    $('#setSmallGear').css("color", "#fff") 
  }
}
function updateFlapUI(){
  if(compositeArray[0].radius === 80){
    $('#setLargeGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearL').css("background-image", "none") 
    $('#setSmallGearL').css("background-image", "none") 
    $('#setLargeGearL').css("color", "#fff")
    $('#setMedGearL').css("color", "#000") 
    $('#setSmallGearL').css("color", "#000") 
  }
  else if(compositeArray[0].radius === 64){
    $('#setMedGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGearL').css("background-image", "none") 
    $('#setSmallGearL').css("background-image", "none") 
    $('#setLargeGearL').css("color", "#000")
    $('#setMedGearL').css("color", "#fff") 
    $('#setSmallGearL').css("color", "#000") 
  }
  else if(compositeArray[0].radius === 48){
    $('#setSmallGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearL').css("background-image", "none") 
    $('#setLargeGearL').css("background-image", "none") 
    $('#setLargeGearL').css("color", "#000")
    $('#setMedGearL').css("color", "#000") 
    $('#setSmallGearL').css("color", "#fff") 
  }
  if(compositeArray[1].radius === 80){
    $('#setLargeGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearR').css("background-image", "none") 
    $('#setSmallGearR').css("background-image", "none") 
    $('#setLargeGearR').css("color", "#fff")
    $('#setMedGearR').css("color", "#000") 
    $('#setSmallGearR').css("color", "#000") 
  }
  else if(compositeArray[1].radius === 64){
    $('#setMedGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGearR').css("background-image", "none") 
    $('#setSmallGearR').css("background-image", "none") 
    $('#setLargeGearR').css("color", "#000")
    $('#setMedGearR').css("color", "#fff") 
    $('#setSmallGearR').css("color", "#000") 
  }
  else if(compositeArray[1].radius === 48){
    $('#setSmallGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGearR').css("background-image", "none") 
    $('#setLargeGearR').css("background-image", "none") 
    $('#setLargeGearR').css("color", "#000")
    $('#setMedGearR').css("color", "#000") 
    $('#setSmallGearR').css("color", "#fff") 
  }

  if(compositeArray[0].isMotor){
    $('#setDriveGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setDriveGearR').css("background-image", "none") 
    $('#setDriveGearR').css("color", "#000")
    $('#setDriveGearL').css("color", "#fff")
  }
  else if(compositeArray[1].isMotor){
    $('#setDriveGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setDriveGearL').css("background-image", "none") 
    $('#setDriveGearL').css("color", "#000")
    $('#setDriveGearR').css("color", "#fff")
  }
  if(symetrical){
    $('#symetrical').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#nonSymetrical').css("background-image", "none") 
    $('#nonSymetrical').css("color", "#000")
    $('#symetrical').css("color", "#fff")
    $('.Sym').show()
  }
  else{
    $('#nonSymetrical').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#symetrical').css("background-image", "none") 
    $('#symetrical').css("color", "#000")
    $('#nonSymetrical').css("color", "#fff")
    $('.Sym').hide()
    if(leftWingUI){
      $('#leftWing').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#rightWing').css("background-image", "none") 
      $('#rightWing').css("color", "#000")
      $('#leftWing').css("color", "#fff")
    }
    else{
      $('#rightWing').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#leftWing').css("background-image", "none") 
      $('#leftWing').css("color", "#000")
      $('#rightWing').css("color", "#fff")
    }
  }
}

function updateRotateUI(){
  if(compositeArray[0] && compositeArray[1] && compositeArray[2]){
    $('.planetary').hide()
    $('.spur').show()
    if(compositeArray[0].radius === 80){
      $('#setLargeGear1').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setMedGear1').css("background-image", "none") 
      $('#setSmallGear1').css("background-image", "none") 
      $('#setLargeGear1').css("color", "#fff")
      $('#setMedGear1').css("color", "#000") 
      $('#setSmallGear1').css("color", "#000") 
    }
    else if(compositeArray[0].radius === 64){
      $('#setMedGear1').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setLargeGear1').css("background-image", "none") 
      $('#setSmallGear1').css("background-image", "none") 
      $('#setLargeGear1').css("color", "#000")
      $('#setMedGear1').css("color", "#fff") 
      $('#setSmallGear1').css("color", "#000") 
    }
    else if(compositeArray[0].radius === 48){
      $('#setSmallGear1').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setMedGear1').css("background-image", "none") 
      $('#setLargeGear1').css("background-image", "none") 
      $('#setLargeGear1').css("color", "#000")
      $('#setMedGear1').css("color", "#000") 
      $('#setSmallGear1').css("color", "#fff") 
    }
    if(compositeArray[1].radius === 80){
      $('#setLargeGear2').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setMedGear2').css("background-image", "none") 
      $('#setSmallGear2').css("background-image", "none") 
      $('#setLargeGear2').css("color", "#fff")
      $('#setMedGear2').css("color", "#000") 
      $('#setSmallGear2').css("color", "#000") 
    }
    else if(compositeArray[1].radius === 64){
      $('#setMedGear2').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setLargeGear2').css("background-image", "none") 
      $('#setSmallGear2').css("background-image", "none") 
      $('#setLargeGear2').css("color", "#000")
      $('#setMedGear2').css("color", "#fff") 
      $('#setSmallGear2').css("color", "#000") 
    }
    else if(compositeArray[1].radius === 48){
      $('#setSmallGear2').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setMedGear2').css("background-image", "none") 
      $('#setLargeGear2').css("background-image", "none") 
      $('#setLargeGear2').css("color", "#000")
      $('#setMedGear2').css("color", "#000") 
      $('#setSmallGear2').css("color", "#fff") 
    }
    if(compositeArray[2].radius === 80){
      $('#setLargeGear3').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setMedGear3').css("background-image", "none") 
      $('#setSmallGear3').css("background-image", "none") 
      $('#setLargeGear3').css("color", "#fff")
      $('#setMedGear3').css("color", "#000") 
      $('#setSmallGear3').css("color", "#000") 
    }
    else if(compositeArray[2].radius === 64){
      $('#setMedGear3').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setLargeGear3').css("background-image", "none") 
      $('#setSmallGear3').css("background-image", "none") 
      $('#setLargeGear3').css("color", "#000")
      $('#setMedGear3').css("color", "#fff") 
      $('#setSmallGear3').css("color", "#000") 
    }
    else if(compositeArray[2].radius === 48){
      $('#setSmallGear3').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setMedGear3').css("background-image", "none") 
      $('#setLargeGear3').css("background-image", "none") 
      $('#setLargeGear3').css("color", "#000")
      $('#setMedGear3').css("color", "#000") 
      $('#setSmallGear3').css("color", "#fff") 
    }

    if(compositeArray[0].isMotor){
      $('#setDriveGearL').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setDriveGearR').css("background-image", "none") 
      $('#setDriveGearR').css("color", "#000")
      $('#setDriveGearL').css("color", "#fff")
    }
    else if(compositeArray[1].isMotor){
      $('#setDriveGearR').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#setDriveGearL').css("background-image", "none") 
      $('#setDriveGearL').css("color", "#000")
      $('#setDriveGearR').css("color", "#fff")
    }
  }
  else{
    $('.planetary').show()
    $('.spur').hide()
  }
}
function updatePlanetaryUI(){
  if(compositeArray[1].radius === 80){
    $('#setLargeGear1P').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear1P').css("background-image", "none") 
    $('#setSmallGear1P').css("background-image", "none") 
    $('#setLargeGear1P').css("color", "#fff")
    $('#setMedGear1P').css("color", "#000") 
    $('#setSmallGear1P').css("color", "#000") 
    // console.log(compositeArray[1].radius)
  }
  else if(compositeArray[1].radius === 64){
    $('#setMedGear1P').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGear1P').css("background-image", "none") 
    $('#setSmallGear1P').css("background-image", "none") 
    $('#setLargeGear1P').css("color", "#000")
    $('#setMedGear1P').css("color", "#fff") 
    $('#setSmallGear1P').css("color", "#000") 
  }
  else if(compositeArray[1].radius === 48){
    $('#setSmallGear1P').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear1P').css("background-image", "none") 
    $('#setLargeGear1P').css("background-image", "none") 
    $('#setLargeGear1P').css("color", "#000")
    $('#setMedGear1P').css("color", "#000") 
    $('#setSmallGear1P').css("color", "#fff") 
  }
  if(compositeArray[0].radius === 80){
    $('#setLargeGear2P').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear2P').css("background-image", "none") 
    $('#setSmallGear2P').css("background-image", "none") 
    $('#setLargeGear2P').css("color", "#fff")
    $('#setMedGear2P').css("color", "#000") 
    $('#setSmallGear2P').css("color", "#000") 
  }
  else if(compositeArray[0].radius === 64){
    $('#setMedGear2P').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setLargeGear2P').css("background-image", "none") 
    $('#setSmallGear2P').css("background-image", "none") 
    $('#setLargeGear2P').css("color", "#000")
    $('#setMedGear2P').css("color", "#fff") 
    $('#setSmallGear2P').css("color", "#000") 
  }
  else if(compositeArray[0].radius === 48){
    $('#setSmallGear2P').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
    $('#setMedGear2P').css("background-image", "none") 
    $('#setLargeGear2P').css("background-image", "none") 
    $('#setLargeGear2P').css("color", "#000")
    $('#setMedGear2P').css("color", "#000") 
    $('#setSmallGear2P').css("color", "#fff") 
  }
}

function rotationUI(){
  if(compositeArray[1]){
    if(compositeArray[1].alternate){
      $('#alternate').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#continuous').css("background-image", "none") 
      $('#continuous').css("color", "#000")
      $('#alternate').css("color", "#fff")
    }
    else if(!compositeArray[1].alternate){
      $('#continuous').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#alternate').css("background-image", "none") 
      $('#alternate').css("color", "#000")
      $('#continuous').css("color", "#fff")
    }
  }
}
function sliderDisplay(){
  if(!openCloseMod){
    $('.hideThis').hide()
    $('.hideThis2').show()
  }
  else{
    $('.hideThis').show()
    $('.hideThis2').hide()
  }
}
function UDSliderDisplay(){
  if(rackPinionMod){
    $('.controls').hide()
  }
  else{
    $('.controls').show()
  }
}
function buttonDisable(){
  if(mirrored){
    document.getElementById("mirror").disabled = true;
    document.getElementById("continuous").disabled = true;
    document.getElementById("alternate").disabled = true;
  }
  else{
    document.getElementById("mirror").disabled = false;
    document.getElementById("continuous").disabled = false;
    document.getElementById("alternate").disabled = false;
  }
  if(compositeArray[1].alternate === false){
    document.getElementById("mirror").disabled = true;
  }
  else{
    document.getElementById("mirror").disabled = false;
  }
}
function shellCam(){
  if(compositeArray[1].shape === "shell" || compositeArray[1].shape === "cam"){
    $('.cam-type').show()
    if(document.getElementById("alternate")){
       document.getElementById("alternate").disabled = true;
    }
    if(compositeArray[1].shape === "shell"){
      $('#shellShape').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#eggShape').css("background-image", "none") 
      $('#eggShape').css("color", "#000")
      $('#shellShape').css("color", "#fff")
    }
    else{
      $('#eggShape').css("background-image", "linear-gradient(to bottom,#337ab7 0,#265a88 100%)") 
      $('#shellShape').css("background-image", "none") 
      $('#shellShape').css("color", "#000")
      $('#eggShape').css("color", "#fff")
    }
  }
  else{
    $('.cam-type').hide()
    if(document.getElementById("alternate")){
       document.getElementById("alternate").disabled = false;
    }
  }
}
function rotateSliders(){
  if(flapMode){
    $('.flapping').show()
    $('.rotate').hide()
  }
  else{
    $('.flapping').hide()
    $('.rotate').show()
  }
}
function displayLeft(){
  leftWingUI = true;
  $('.left').show()
  $('.right').hide()
}
function displayRight(){
  leftWingUI = false
  $('.right').show()
  $('.left').hide()
}