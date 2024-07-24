// module indicators
crankModule = true;
crankMod = true;
openCloseMod = false;
// initial values
let c = 369; //connector length for open-close crank
const rectBase = 600;
linkageLength = 0;
let originalWidth1;
let originalWidth2;
const kWindowWidth = 0.75 * 0.45;
/////////////////////////// CHANGE GEAR SIZE ///////////////////////////////////////////
//smallRadius = 48
//mediumRadius = 64
//largeRadius = 80
const kSteps = 0.5
function changeGear(rad) {;
  //remove ui constraints
  removeUIConstraints(compositeArray[0]);
  // delete linkages
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  if (openCloseMod) {
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  }
  // reset position and angle
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[0].constraints[0].pointA.x,
    y: compositeArray[0].constraints[0].pointA.y,
  });
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // set new radius - 52 larger than normal radius size
  radius = rad + 52;
  // set class parameter value
  compositeArray[1].radius = radius;
  // set number of steps to make up gear
  steps = radius * kSteps;
  // set specific tooth width
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  // redraw circle and shape - functions.js
  changeBodyCircle(1);
  // create the constraints
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  if (openCloseMod) {
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[2].bodies[0]
    );
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[3].bodies[0]
    );
    createUIConstraints(compositeArray[0], beamSpace, 0, 6);
  }
  pivotHeight(linkageLength);
}
////////////////////////////////////////////////////////////////////////////////////////
// module initialization/ reset function
function initializeCrank() {
  // remove any UI elements
  removeUIConstraints(compositeArray[0]);
  // set radius to +52
  crankRadius();
  // remove constraint between crank and UI
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  steps = radius * kSteps;
  toothWidthDegree = 2;
  toothWidth = toothWidthDegree / conversionFactor;
  // change body shapes - functions.js
  changeBodyCircle(1);
  changeBody3(0);
  // create 2 ui circular orbs
  createUIConstraints(compositeArray[0], beamSpace, 0, 6);
  // set position of new shapes
  Body.setPosition(compositeArray[0].bodies[0], {
    x: window.innerWidth * kWindowWidth,
    y:
      window.innerHeight -
      basePoint -
      250 +
      8.0620080523284 -
      parseInt(pivotValue),
  });
  Body.setPosition(compositeArray[1].bodies[0], {
    x: window.innerWidth * kWindowWidth,
    y: window.innerHeight - basePoint,
  });
  // set constraint locations
  compositeArray[1].constraints[0].pointA.x = window.innerWidth * kWindowWidth;
  compositeArray[1].constraints[0].pointA.y = window.innerHeight * 0.7;
  compositeArray[0].constraints[0].pointA.x = window.innerWidth * kWindowWidth;
  compositeArray[0].constraints[0].pointA.y =
    compositeArray[1].constraints[0].pointA.y - 250;
  // create linkages
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  // make 360 rotating gear
  compositeArray[1].alternate = false;
  pivotHeight(linkageLength);
}
// run this function when change motion from dropdown
function changeMotion() {
  const string = document.getElementById("changeMech").value;
  if (string === "upDown") {
    openCloseMod = false;
    removeUIConstraints(compositeArray[0]);
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
    removeComposite(compositeArray[3].bodies[0]);
    removeComposite(compositeArray[2].bodies[0]);
    compositeArray[1].constraints[0].pointA.y = window.innerHeight * 0.7;
  } else if (string === "openClose") {
    openCloseMod = true;
    createUIConstraints(compositeArray[0], beamSpace, 0, 6);
    addRectComposite(
      300,
      5,
      window.innerWidth * kWindowWidth - 200,
      compositeArray[0].constraints[0].pointA.y - rectBase
    );
    addRectComposite(
      -300,
      5,
      window.innerWidth * kWindowWidth + 200,
      compositeArray[0].constraints[0].pointA.y - rectBase
    );
    originalWidth1 = compositeArray[2].width;
    originalWidth2 = compositeArray[3].width;
    newWidth1 = originalWidth1;
    newWidth2 = originalWidth2;
    Body.setPosition(compositeArray[0].bodies[0], {
      x: window.innerWidth * kWindowWidth,
      y:
        window.innerHeight -
        basePoint -
        250 +
        8.0620080523284 -
        parseInt(pivotValue),
    });
    Body.setPosition(compositeArray[1].bodies[0], {
      x: window.innerWidth * kWindowWidth,
      y: window.innerHeight - basePoint,
    });
    compositeArray[1].constraints[0].pointA.x =
      window.innerWidth * kWindowWidth;
    compositeArray[1].constraints[0].pointA.y = window.innerHeight - basePoint;
    compositeArray[0].constraints[0].pointA.x =
      window.innerWidth * kWindowWidth;
    compositeArray[0].constraints[0].pointA.y =
      compositeArray[1].constraints[0].pointA.y - 250;
    compositeArray[2].constraints[0].pointA.y =
      compositeArray[0].constraints[0].pointA.y - 400;
    compositeArray[3].constraints[0].pointA.y =
      compositeArray[0].constraints[0].pointA.y - 400;
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[2].bodies[0]
    );
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[3].bodies[0]
    );
    compositeArray[1].alternate = false;
  }
}
// make motor 360
function setToContinuous() {
  compositeArray[1].alternate = false;
}
// make motor 180
function setToAlternatingGear() {
  compositeArray[1].alternate = true;
}

let prevSpaceValue = 50;
let changeSpaceWidth = 0;
spaceValue = 50;
//rendering consts
const lineWidth = 2;
const strokeStyle = "#666"
// horizontal spacing
function beamSpacing(value) {
  if (compositeArray[2] && compositeArray[3]) {
    changeSpaceWidth = value - prevSpaceValue;
    compositeArray[2].constraints[0].pointA.x =
      compositeArray[0].constraints[0].pointA.x - value;
    compositeArray[3].constraints[0].pointA.x =
      compositeArray[0].constraints[0].pointA.x - value * -1;
    prevSpaceValue = value;
    beamSpace = parseInt(value);
  }
  document.getElementById("horizontalSpaceValue").innerHTML = value;
  compositeArray[0].constraints[1].render.lineWidth = lineWidth;
  compositeArray[0].constraints[1].render.strokeStyle = strokeStyle;
}
let prevPivotValue = 100;
const initialPivotValue = 100;
const pivotValue = 100;
let changePivotHeight;
// vertical spacing
function pivotHeight(value) {
  circleJointHeight(value);
}
let constraintPvalue = 0;
// constraint pivot along beam
function constraintPosition(value) {
  Body.setAngle(compositeArray[2].bodies[0], 0);
  Body.setAngle(compositeArray[3].bodies[0], 0);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  compositeArray[2].width = newWidth1 - value;
  compositeArray[3].width = newWidth2 - -value;
  createConstraintFake2(
    compositeArray[0].bodies[0],
    compositeArray[2].bodies[0],
    -value,
    newWidth1
  );
  createConstraintFake2(
    compositeArray[0].bodies[0],
    compositeArray[3].bodies[0],
    value,
    newWidth2
  );
  if (!crankMod) {
    jointComposites[jointComposites.length - 1].constraints[0].pointA.x =
      jointComposites[jointComposites.length - 1].constraints[0].pointA.x +
      (prevSpaceValue - 50);
    jointComposites[jointComposites.length - 2].constraints[0].pointA.x =
      jointComposites[jointComposites.length - 2].constraints[0].pointA.x -
      (prevSpaceValue - 50);
  }
  jointComposites[jointComposites.length - 1].constraints[0].pointB.x =
    jointComposites[jointComposites.length - 1].constraints[0].pointB.x +
    (newWidth1 / 2 - 150);
  jointComposites[jointComposites.length - 2].constraints[0].pointB.x =
    jointComposites[jointComposites.length - 2].constraints[0].pointB.x -
    (-newWidth2 / 2 - 150);
  constraintPvalue = parseInt(value);
}
let prevHeightValue = 50;
let changeHeightValue;
//
function circleJointHeight(value) {
  changeHeightValue = parseInt(value);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  for (joint of jointComposites) {
    if (
      joint.constraints[0].bodyA === compositeArray[0].bodies[0] &&
      joint.constraints[0].bodyB === compositeArray[1].bodies[0]
    ) {
      joint.constraints[0].length = 350 + changeHeightValue;
      joint.constraints[0].render.lineWidth = lineWidth;
      joint.constraints[0].render.strokeStyle = strokeStyle;
    } else if (
      joint.constraints[0].bodyA === compositeArray[1].bodies[0] &&
      joint.constraints[0].bodyB === compositeArray[0].bodies[0]
    ) {
      joint.constraints[0].length = 350 + changeHeightValue;
      joint.constraints[0].render.lineWidth = lineWidth;
      joint.constraints[0].render.strokeStyle = strokeStyle;
    }
    module.pivot2Point = parseInt(changeHeightValue);
  }
}
// reset radius to normal module -52
function resetRadius() {
  if (!crankMod) {
    if (
      compositeArray[1].radius != 80 &&
      compositeArray[1].radius != 64 &&
      compositeArray[1].radius != 48
    ) {
      compositeArray[1].radius = compositeArray[1].radius - 52;
    }
    if (radius != 80 && radius != 64 && radius != 48) {
      radius = radius - 52;
    }
  }
}
// set radius to normal +52
function crankRadius() {
  if (radius === 80 || radius === 64 || radius === 48) {
    radius = radius + 52;
  }
}
// constant update - prevent bugs and unnecessary movement
Events.on(engine, "beforeUpdate", function (event) {
  if (compositeArray[2] && compositeArray[3]) {
    if (
      compositeArray[2].bodies[0].angularVelocity > 0.1 ||
      compositeArray[2].bodies[0].angularVelocity < -0.1
    ) {
      Body.setAngularVelocity(compositeArray[2].bodies[0], 0);
      Body.setAngularVelocity(compositeArray[3].bodies[0], 0);
      Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 0 });
      Body.setVelocity(compositeArray[3].bodies[0], { x: 0, y: 0 });
    }
  }
});
// constant update - set angle of beams based off rotation of crank
Events.on(engine, "afterUpdate", function (event) {
  if (openCloseMod) {
    jointComposites[jointComposites.length - 1].constraints[0].pointA.x =
      parseInt(prevSpaceValue);
    jointComposites[jointComposites.length - 2].constraints[0].pointA.x =
      -parseInt(prevSpaceValue);
    jointComposites[jointComposites.length - 1].constraints[0].pointA.y =
      -parseInt(pivot2Value);
    jointComposites[jointComposites.length - 2].constraints[0].pointA.y =
      -parseInt(pivot2Value);
    const bottom = compositeArray[0].constraints[0].pointA.y - rectBase;
    const top = compositeArray[0].bodies[0].position.y - 200 - pivotValue;
    const b = top - bottom;
    const a = compositeArray[2].width;
    const angleC = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));
    const angleCConst = 1.5708; 
    if (angleC) {
      if (angleC - angleCConst < -1) {
      } else if (
        compositeArray[2].bodies[0].angularVelocity > 0.1 ||
        compositeArray[2].angularVelocity < -0.1
      ) {
        Body.setAngularVelocity(compositeArray[2].bodies[0], 0);
        Body.setAngularVelocity(compositeArray[3].bodies[0], 0);
      } else {
        Body.setAngle(compositeArray[2].bodies[0], angleC - angleCConst);
        Body.setAngle(compositeArray[3].bodies[0], -(angleC - angleCConst));
      }
    }
    Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 0 });
    Body.setVelocity(compositeArray[3].bodies[0], { x: 0, y: 0 });
    if (compositeArray[1].alternate === false && rackPinionMod === true) {
      if (compositeArray[1].bodies[0].angle >= 2 * Math.PI) {
        Body.setAngle(compositeArray[1].bodies[0], 0);
      }
      if (
        compositeArray[1].bodies[0].angle > Math.PI + 0.5 ||
        compositeArray[1].bodies[0].angle < 0.5
      ) {
        if (
          compositeArray[0].bodies[0].position.y >=
          compositeArray[0].constraints[0].pointA.y
        ) {
          Body.setPosition(compositeArray[0].bodies[0], {
            x: compositeArray[0].bodies[0].position.x,
            y: compositeArray[0].constraints[0].pointA.y,
          });
          Body.setVelocity(compositeArray[0].bodies[0], { x: 0, y: 0 });
        } else {
          Body.setVelocity(compositeArray[0].bodies[0], { x: 0, y: 3 });
        }
      }
    }
  }
});

function yDistance() {
  const distance = Math.round(compositeArray[0].bodies[0].position.y - 200);
  document.getElementById("y-distance").innerHTML = distance;
}

Events.on(engine, "beforeUpdate", function (event) {});
const kMotorSpeed = 0.021;
////////////////////// RUN /////////////////////////////

// create initial gear parts
addLinGearComposite(
  window.innerWidth * kWindowWidth,
  window.innerHeight * 0.8 + rackPinBase
);
compositeArray[0].constraints[0].stiffness = 0.0000001;
createUIConstraints(compositeArray[0], prevSpaceValue, prevPivotValue, 6);
addGearComposite(
  window.innerWidth * kWindowWidth + (radius + toothHeight * 2),
  window.innerHeight * 0.68 + rackPinBase
);
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
compositeArray[1].motorSpeed = kMotorSpeed;
module.motorSpeed = compositeArray[1].motorSpeed * 1000;
pivotHeight(0);
///////////// Change to Crank//////////
crankMod = true;
camMod = false;
rackPinionMod = false;
initializeCrank();
compositeArray[0].constraints[0].stiffness = 0.001;
removeUIConstraints(compositeArray[0]);
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine);
