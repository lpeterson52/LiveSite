rackPinionModule = true;
var c = 369
var rectBase = 600
var originalWidth1
var originalWidth2
var newWidth1
var newWidth2
module.verticalSpace = 0
// generate small gear
function smallGear(){
  angleFactor = 0.21
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 48;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 4;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else{
    changeBody(1);
  }
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  if(shared == true){
    if (flipY == true){
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
    else{
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
  }
  if(paired == true){
    if (flipY == true){
      changeBody(compositeArray.length-4)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-4].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-4].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-4].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
    else{
      changeBody(compositeArray.length-2)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-2].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-2].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
  }
  
}
function mediumGear(){
  angleFactor = 0.28
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 64;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  toothWidthDegree = 3;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else{
    changeBody(1);
  }
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  if(shared == true){
    if (flipY == true){
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
    else{
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
  }
  if(paired == true){
    if (flipY == true){
      changeBody(compositeArray.length-4)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-4].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-4].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-4].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
    else{
      changeBody(compositeArray.length-2)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-2].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-2].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
  }
  
}
function largeGear(){
  angleFactor = 0.35
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
  Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130} )
  Body.setAngle(compositeArray[1].bodies[0], 0)
  radius = 80;
  compositeArray[1].radius = radius
  steps = (0.25 * radius)*2;
  //toothHeight = 20;
  toothWidthDegree = 2;
  toothWidth = (toothWidthDegree/conversionFactor);
  if(compositeArray[1].alternate == false){
    changeBodyContinuous(1)
  }
  else{
    changeBody(1);
  }
  compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
  if(shared == true){
    if (flipY == true){
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
    else{
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25
    }
  }
  if(paired == true){
    if (flipY == true){
      changeBody(compositeArray.length-4)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-3].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-4].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-4].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-4].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
    else{
      changeBody(compositeArray.length-2)
      compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(radius+toothHeight/2)
      compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)-(2*radius+toothHeight)-toothHeight-5
      compositeArray[compositeArray.length-1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(2*radius+toothHeight)+toothHeight+5
      compositeArray[compositeArray.length-2].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.5)+(radius)+(toothHeight/2)
      compositeArray[compositeArray.length-2].rotation = Math.PI
      Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], Math.PI);
      compositeArray[1].rotation = 0
    }
  }
  
}

function changeMotion(){
  var string = document.getElementById("changeMotion").value;
  if(string == "upDown"){
    // removeUIConstraints(compositeArray[0])
    // removeUIConstraints(compositeArray[0])
    reset()
    // createUIConstraints(compositeArray[0], 50, 100,6)
    // removeUIConstraints(compositeArray[0])
    removeUIConstraints(compositeArray[0])
    // createUiconstraintsSingle(compositeArray[0], prevSpaceValue, prevPivotValue,6)
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    shared = false;
    paired = false;
    mirrored = false;
    openCloseMod = false;
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
  }
  else if(string == "openClose"){
    reset()
    // removeUIconstraintsSingle(compositeArray[0])
    createUIConstraints(compositeArray[0], prevSpaceValue, prevPivotValue,6)
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    shared = false;
    paired = false;
    mirrored = false;
    openCloseMod = true;
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    addRectComposite((300), 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[0].constraints[0].pointA.y-rectBase)
    addRectComposite((-300), 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[0].constraints[0].pointA.y-rectBase)
    originalWidth1 = compositeArray[2].width
    originalWidth2 = compositeArray[3].width
    newWidth1 = originalWidth1
    newWidth2 = originalWidth2
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
  }
  
}
function mirrorModal(){
  flipLabel = document.getElementById("flipYLabel");
  flipCheck = document.getElementById("flipYCheck");
  flipTitle = document.getElementById("flipYTitle");
  if(mirrored == false){
    overlay3();
    if (openCloseMod != true){
      flipCheck.style.visibility = "hidden"
      flipLabel.style.visibility = "hidden"
      flipTitle.style.visibility = "hidden"
    }
    else{
      flipCheck.style.visibility = "visible"
      flipLabel.style.visibility = "visible"
      flipTitle.style.visibility = "visible"
    }
  }
}
function mirror(){
  mirrored = true;
  if (openCloseMod != true){
    if(document.getElementById('paired').checked) {
      paired = true;
      compositeArray[0].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x-(radius + toothHeight/2)
      compositeArray[1].constraints[0].pointA.x = compositeArray[1].constraints[0].pointA.x-(radius + toothHeight/2)
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[1].bodies[0], {x:compositeArray[1].constraints[0].pointA.x, y:compositeArray[1].constraints[0].pointA.y})
      addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))+(radius + toothHeight/2) ,compositeArray[0].constraints[0].pointA.y)
      compositeArray[compositeArray.length-1].realMotor = false;
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      compositeArray[compositeArray.length-1].alternate = true;
      compositeArray[compositeArray.length-1].isMotor = true;
      addLinGearComposite(compositeArray[1].bodies[0].position.x+(radius*3)+(toothHeight*2)+15,(window.innerHeight)*(0.5))
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].constraints[0].pointA.x, y:(window.innerHeight)*(0.5)+130})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      // createUiconstraintsSingle(compositeArray[compositeArray.length-1], prevSpaceValue, prevPivotValue,6)

    }else if(document.getElementById('shared').checked) {
      shared = true;
      Body.setAngle(compositeArray[1].bodies[0], 0)
      compositeArray[0].constraints[0].pointA.y = compositeArray[1].constraints[0].pointA.y
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:compositeArray[1].constraints[0].pointA.y+130})
      addLinGearComposite((window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25,compositeArray[1].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].bodies[0].position.x, y:compositeArray[1].constraints[0].pointA.y-130})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      createUIConstraintsMirrorSingle(compositeArray[compositeArray.length-1], prevSpaceValue, prevPivotValue, 6)
    }
  }
  else{
    if(document.getElementById('paired').checked) {
      paired = true;
      compositeArray[0].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x-(radius + toothHeight/2)
      compositeArray[1].constraints[0].pointA.x = compositeArray[1].constraints[0].pointA.x-(radius + toothHeight/2)
      // if(compositeArray[2] && compositeArray[3]){
      //   compositeArray[2].constraints[0].pointA.x = compositeArray[2].constraints[0].pointA.x-(radius + toothHeight/2)
      //   compositeArray[3].constraints[0].pointA.x = compositeArray[3].constraints[0].pointA.x-(radius + toothHeight/2)
      // }
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[1].bodies[0], {x:compositeArray[1].constraints[0].pointA.x, y:compositeArray[1].constraints[0].pointA.y})
      addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))+(radius + toothHeight/2) ,compositeArray[0].constraints[0].pointA.y)
      compositeArray[compositeArray.length-1].realMotor = false;
      Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      compositeArray[compositeArray.length-1].alternate = true;
      compositeArray[compositeArray.length-1].isMotor = true;
      addLinGearComposite(compositeArray[1].bodies[0].position.x+(radius*3)+(toothHeight*2)+15,compositeArray[0].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.x})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      if(document.getElementById('flipYCheck').checked){
        flipY = true;
        addRectComposite(300, 5,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,compositeArray[1].constraints[0].pointA.y+600)
        addRectComposite(-300, 5,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,compositeArray[1].constraints[0].pointA.y+600)
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-1].bodies[0])
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-2].bodies[0])
        createUIConstraints(compositeArray[compositeArray.length-3], prevSpaceValue, prevPivotValue,6)
      }
      else{
        // createUIConstraints(compositeArray[compositeArray.length-1], prevSpaceValue, prevPivotValue,6)
      }



    }else if(document.getElementById('shared').checked) {
      shared = true;
      Body.setAngle(compositeArray[1].bodies[0], 0)
      Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
      addLinGearComposite((window.innerWidth)*(0.75*0.45)+(radius*2)+(toothHeight*2)+25,compositeArray[1].constraints[0].pointA.y)
      Body.setPosition(compositeArray[compositeArray.length-1].bodies[0], {x:compositeArray[compositeArray.length-1].bodies[0].position.x, y:(window.innerHeight)*(0.5)-130})
      compositeArray[compositeArray.length-1].rotation = Math.PI
      //Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], Math.PI)
      if(document.getElementById('flipYCheck').checked){
        flipY = true;
        addRectComposite(300, 5,compositeArray[compositeArray.length-1].constraints[0].pointA.x-200,compositeArray[1].constraints[0].pointA.y+600)
        addRectComposite(-300, 5,compositeArray[compositeArray.length-2].constraints[0].pointA.x+200,compositeArray[1].constraints[0].pointA.y+600)
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-1].bodies[0])
        createConstraintFakeRP(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-2].bodies[0])
        createUIConstraints(compositeArray[compositeArray.length-3], prevSpaceValue, prevPivotValue,6)
      }
      else{
        // createUIConstraints(compositeArray[compositeArray.length-1], prevSpaceValue, prevPivotValue,6)
      }
    }
  }
  overlay3();
  
}
function reset(){
  prevSpaceValue = 50
  module.horizontalSpace = 50
  prevPivotValue = 0
  pivotValue = 0
  mirrored = false;
  shared = false;
  paired = false;
  flipY = false;
  modified = false;
  alternatingGear()
  // largeGear()
  
  if(openCloseMod == true){
    beamSpacing(50)
    removeUIConstraints(compositeArray[0])
    deleteConstraint(compositeArray[compositeArray.length-1].bodies[0], compositeArray[compositeArray.length-3].bodies[0])
    deleteConstraint(compositeArray[compositeArray.length-2].bodies[0], compositeArray[compositeArray.length-3].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    addRectComposite(300, 5,(window.innerWidth)*(0.75*0.45)-200,compositeArray[1].constraints[0].pointA.y-600)
    addRectComposite(-300, 5,(window.innerWidth)*(0.75*0.45)+200,compositeArray[1].constraints[0].pointA.y-600)
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0])
    createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0])
    createUIConstraints(compositeArray[0], 50, 100,6)
  }
  else{
    // removeUIconstraintsSingle(compositeArray[0])
    for(var i = compositeArray.length-1; i>1; i--){
      removeComposite(compositeArray[i].bodies[0])
    }
    Body.setAngle(compositeArray[1].bodies[0], 0)
    compositeArray[1].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    compositeArray[1].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8))
    compositeArray[0].constraints[0].pointA.x = (window.innerWidth)*(0.75*0.45)
    Body.setPosition(compositeArray[1].bodies[0], {x:(window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)), y:(window.innerHeight)*(0.5)})
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    // createUiconstraintsSingle(compositeArray[0], 50, 100,6)
  }
}
function resetModule(){
  largeGear()
  reset()
}
function continuous(){
    compositeArray[1].alternate = false;
    changeBodyContinuous(1)
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
    compositeArray[0].constraints[0].stiffness = 0.001
    compositeArray[1].motorDir = 1;
    // if(compositeArray[2]){
    //   compositeArray[2].constraints[0].stiffness = 0.001
    // }
    // document.getElementById("mirror").disabled = true;
    // engine.world.gravity.y = 0.3;
}
function alternatingGear(){
  document.getElementById("mirror").disabled = false;
    compositeArray[0].constraints[0].pointA.y = (window.innerHeight)*(0.5)
    changeBody(1)
    Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].constraints[0].pointA.x, y:compositeArray[0].constraints[0].pointA.y+130})
    compositeArray[1].alternate = true;
    compositeArray[0].constraints[0].stiffness = 0.00001
    compositeArray[1].motorDir = 1;
  // engine.world.gravity.y = 0.3;
}
//////////////////////// ADD TO WORLD //////////////////////


var prevSpaceValue = 50;
var changeSpaceWidth = 0;
var spaceValue = 50
var beamSpace = 50
var modified = false;
function beamSpacing(value){
  changeSpaceWidth = value - prevSpaceValue
  if (openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - value
      compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (value*-1)
      if(flipY){
          jointComposites[jointComposites.length-3].constraints[0].pointA.x = jointComposites[jointComposites.length-3].constraints[0].pointA.x + changeSpaceWidth
          jointComposites[jointComposites.length-4].constraints[0].pointA.x = jointComposites[jointComposites.length-4].constraints[0].pointA.x - changeSpaceWidth
        if(compositeArray[2].width == 300 && modified == false){
          jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x - changeSpaceWidth
          jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x + changeSpaceWidth

        }
        else{
          modified = true
          jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + changeSpaceWidth
          jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - changeSpaceWidth

        }
        if(paired){
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x - value
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x - (value*-1)
        }
        else if(shared){
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x - value
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x - (value*-1)
        }
        
      }
      else{
        jointComposites[jointComposites.length-1].constraints[0].pointA.x = jointComposites[jointComposites.length-1].constraints[0].pointA.x + changeSpaceWidth
        jointComposites[jointComposites.length-2].constraints[0].pointA.x = jointComposites[jointComposites.length-2].constraints[0].pointA.x - changeSpaceWidth
      }
    }
    console.log("BeamSpace Value = " + value)
  }
  prevSpaceValue = value
  beamSpace = parseInt(value);
  compositeArray[0].constraints[1].render.lineWidth = 2
  compositeArray[0].constraints[1].render.strokeStyle = "#666"
  if(mirrored){
    if(openCloseMod){
        compositeArray[compositeArray.length -3].constraints[1].render.lineWidth = 2
        compositeArray[compositeArray.length -3].constraints[1].render.strokeStyle = "#666"
      }
      else{
        compositeArray[compositeArray.length -1].constraints[1].render.lineWidth = 2
        compositeArray[compositeArray.length -1].constraints[1].render.strokeStyle = "#666"
      }
  }
  
}
var prevPivotValue = 100;
var initialPivotValue = 100;
var pivotValue = 100;
var changePivotHeight;
function pivotHeight(value){
  if(openCloseMod){
    if(compositeArray[2] && compositeArray[3]){
      changePivotHeight = value - prevPivotValue
      // if(openCloseModule){
      //   if(crankMod){
      //     deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //     compositeArray[0].constraints[0].pointA.y = compositeArray[0].constraints[0].pointA.y - changePivotHeight
      //     createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0])
      //   }
      // }
      if(flipY){
        jointComposites[jointComposites.length-1].constraints[0].pointA.y = jointComposites[jointComposites.length-1].constraints[0].pointA.y + changePivotHeight
        jointComposites[jointComposites.length-2].constraints[0].pointA.y = jointComposites[jointComposites.length-2].constraints[0].pointA.y + changePivotHeight
        jointComposites[jointComposites.length-3].constraints[0].pointA.y = jointComposites[jointComposites.length-3].constraints[0].pointA.y - changePivotHeight
        jointComposites[jointComposites.length-4].constraints[0].pointA.y = jointComposites[jointComposites.length-4].constraints[0].pointA.y - changePivotHeight
      }
      else{
        jointComposites[jointComposites.length-1].constraints[0].pointA.y = jointComposites[jointComposites.length-1].constraints[0].pointA.y - changePivotHeight
        jointComposites[jointComposites.length-2].constraints[0].pointA.y = jointComposites[jointComposites.length-2].constraints[0].pointA.y - changePivotHeight
      }
      prevPivotValue = value
      pivotValue = value
      // rotationPoint = value/150
      console.log("Pivot Value = " + value)

    }
  }
  else{
    changePivotHeight = value - prevPivotValue
    // jointComposites[totalJointComposites-1].constraints[0].pointA.y = jointComposites[totalJointComposites-1].constraints[0].pointA.y - changePivotHeight
    // jointComposites[totalJointComposites-2].constraints[0].pointA.y = jointComposites[totalJointComposites-2].constraints[0].pointA.y - changePivotHeight
    prevPivotValue = value
    pivotValue = value
    // rotationPoint = value/150
    console.log("Pivot Value = " + value)
  }
  compositeArray[0].constraints[2].render.lineWidth = 2
  compositeArray[0].constraints[2].render.strokeStyle = "#666"
  if(mirrored){
    if(openCloseMod){
        compositeArray[compositeArray.length -3].constraints[2].render.lineWidth = 2
        compositeArray[compositeArray.length -3].constraints[2].render.strokeStyle = "#666"
      }
      else{
        compositeArray[compositeArray.length -1].constraints[2].render.lineWidth = 2
        compositeArray[compositeArray.length -1].constraints[2].render.strokeStyle = "#666"
      }
  }
  
}


function constraintPosition(value){
  if (openCloseMod){
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0])
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0])
    compositeArray[2].width = originalWidth1 - value
    compositeArray[3].width = originalWidth2 - (-value)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[2].bodies[0],-value,originalWidth1)
    createConstraintFake2(compositeArray[0].bodies[0], compositeArray[3].bodies[0],value, originalWidth2)
    if(flipY){
      compositeArray[compositeArray.length-2].width = originalWidth1 - value
      compositeArray[compositeArray.length-1].width = originalWidth2 - (-value)
      if(paired){
        deleteConstraint(compositeArray[compositeArray.length-1].bodies[0], compositeArray[compositeArray.length-3].bodies[0])
        deleteConstraint(compositeArray[compositeArray.length-2].bodies[0], compositeArray[compositeArray.length-3].bodies[0])
        createConstraintFake2(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-2].bodies[0],-value,originalWidth1)
        createConstraintFake2(compositeArray[compositeArray.length-3].bodies[0], compositeArray[compositeArray.length-1].bodies[0],value, originalWidth2)
      }
      else if(shared){
        deleteConstraint(compositeArray[compositeArray.length-1].bodies[0], compositeArray[4].bodies[0])
        deleteConstraint(compositeArray[compositeArray.length-2].bodies[0], compositeArray[4].bodies[0])
        createConstraintFake2(compositeArray[4].bodies[0], compositeArray[compositeArray.length-2].bodies[0],-value,originalWidth1)
        createConstraintFake2(compositeArray[4].bodies[0], compositeArray[compositeArray.length-1].bodies[0],value, originalWidth2)
      }
    }
    console.log("constraintPosition Value = " + value)
  }
  
}
// add mouse constraint to world


///////////////// Animation /////////////////////////////////////

Events.on(engine, 'beforeUpdate', function(event) {

    if(openCloseMod == true){
      // compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x -25
      // compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x +25
      if(flipY == true ){
        if(paired ==true){
          // compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x -25
          // compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[5].constraints[0].pointA.x +25
        }
        if(shared ==true){
          // compositeArray[compositeArray.length-2].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x -25
          // compositeArray[compositeArray.length-1].constraints[0].pointA.x = compositeArray[4].constraints[0].pointA.x +25
        }
      }
    }
})
// called every frame after physics is applied
// same as above

Events.on(engine, 'afterUpdate', function(event) {
  if(openCloseMod == true){
    var bottom = compositeArray[0].constraints[0].pointA.y - 600
    var top = compositeArray[0].bodies[0].position.y - 200 - pivotValue
    var pivotSpace = (compositeArray[0].constraints[0].pointA.y - 200 - pivotValue) - bottom
    var rectWidth = compositeArray[2].width
    var b = top  - bottom
    var a = compositeArray[2].width
    // var c = Math.sqrt((rectWidth*rectWidth)+(pivotSpace*pivotSpace))
    var angleC = Math.acos(((a*a)+(b*b)-(c*c))/(2*a*b))
    var degrees = angleC * (180/Math.PI)
    //console.log(((a*a)+(b*b)-(c*c))/(2*a*b))
    if(angleC){
      Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708 );
      Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
      if(flipY){
        var bottom2 = compositeArray[compositeArray.length-3].constraints[0].pointA.y + 600
        var top2 = compositeArray[compositeArray.length-3].bodies[0].position.y + 200 + pivotValue
        var b2 = bottom2 - top2
        var a2 = compositeArray[compositeArray.length-1].width
        // var c = Math.sqrt((rectWidth*rectWidth)+(pivotSpace*pivotSpace))
        var angleC2 = Math.acos(((a2*a2)+(b2*b2)-(c*c))/(2*a2*b2))
        // if(compositeArray[compositeArray.length-1].width != originalWidth1){
        //     angleC2 = angleC
        //   }
        if(paired){
          Body.setAngle(compositeArray[compositeArray.length -2].bodies[0], angleC2 - 1.5708);
          Body.setAngle(compositeArray[compositeArray.length -1].bodies[0], -(angleC2 - 1.5708));
          // console.log(compositeArray[2].bodies[0].angle)
          // console.log(compositeArray[compositeArray.length-1].bodies[0].angle)
        }
        else if(shared){
          Body.setAngle(compositeArray[compositeArray.length -2].bodies[0], angleC2 - 1.5708 );
          Body.setAngle(compositeArray[compositeArray.length -1].bodies[0], -(angleC2 - 1.5708));
        }
        // console.log(angleC)
      }
    }
    if(flipY){
      Body.setVelocity(compositeArray[compositeArray.length-1].bodies[0], {x:0, y:0})
      Body.setVelocity(compositeArray[compositeArray.length-2].bodies[0], {x:0, y:0})
    }
    Body.setVelocity(compositeArray[2].bodies[0], {x:0, y:0})
    Body.setVelocity(compositeArray[3].bodies[0], {x:0, y:0})
    // Body.setAngle(compositeArray[2].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
    // Body.setAngle(compositeArray[3].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
    compositeArray[2].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - beamSpace
    compositeArray[3].constraints[0].pointA.x = compositeArray[0].constraints[0].pointA.x - (beamSpace*-1)
    if(paired || shared){
      if(flipY){
        compositeArray[compositeArray.length - 2].constraints[0].pointA.x = compositeArray[compositeArray.length - 3].constraints[0].pointA.x - beamSpace
        compositeArray[compositeArray.length - 1].constraints[0].pointA.x = compositeArray[compositeArray.length - 3].constraints[0].pointA.x - (beamSpace*-1)
      }
    }
  }
  if(paired == true){
    for(var i = 2; i<compositeArray.length; i++){
      if(compositeArray[i].shape == "linGear"){
        Body.setPosition(compositeArray[i].bodies[0], {x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[0].bodies[0].position.y})
      }
    }
  }
  if(shared == true){
    for(var i = 2; i<compositeArray.length; i++){
      if(compositeArray[i].shape == "linGear"){
        var difference = compositeArray[0].bodies[0].position.y - compositeArray[0].constraints[0].pointA.y
        Body.setPosition(compositeArray[i].bodies[0], {x:compositeArray[i].constraints[0].pointA.x, y:compositeArray[i].constraints[0].pointA.y-difference})
      }
    }
    if(flipY == true){
      // Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], compositeArray[1].bodies[0].angle*angleFactor);
      // Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], compositeArray[1].bodies[0].angle*-angleFactor);
      
    }
  }
  if(paired == true){
    if(flipY == true){
      // Body.setAngle(compositeArray[compositeArray.length-1].bodies[0], -compositeArray[4].bodies[0].angle*-angleFactor);
      // Body.setAngle(compositeArray[compositeArray.length-2].bodies[0], -compositeArray[4].bodies[0].angle*angleFactor);
    }
  }
  if(compositeArray[1].alternate == false){
    // console.log(compositeArray[1].bodies[0].angle)
    if(compositeArray[1].bodies[0].angle >= (2*Math.PI) ){
      Body.setAngle(compositeArray[1].bodies[0], 0)
    }
    if(compositeArray[1].bodies[0].angle > Math.PI+0.5 || compositeArray[1].bodies[0].angle < 0.5){
      if(compositeArray[0].bodies[0].position.y >= compositeArray[0].constraints[0].pointA.y+130){
        Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: compositeArray[0].constraints[0].pointA.y+130})
        Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:0})
      }
      else{
        //Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y: compositeArray[0].bodies[0].position.y+4})
        Body.setVelocity(compositeArray[0].bodies[0], {x:0,y:3})
      } 
    }
  }
})

////////////////////// RUN /////////////////////////////

// run the engine
addLinGearComposite((window.innerWidth)*(0.75*0.45),(window.innerHeight)*(0.5))
// removeUIConstraints(compositeArray[0])
// createUiconstraintsSingle(compositeArray[0], 50, 0,6)
addGearComposite((window.innerWidth)*(0.75*0.45)+(radius+(toothHeight*1.8)) ,(window.innerHeight)*(0.5))
Body.setPosition(compositeArray[0].bodies[0], {x:compositeArray[0].bodies[0].position.x, y:(window.innerHeight)*(0.5)+130})
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine)