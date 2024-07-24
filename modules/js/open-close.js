// set module/submodule indicators
openCloseModule = true;
rackPinionMod = true;
camMod = false;
crankMod = false;
// variable starting values
let c = 369;
const rectBase = 600;
linkageLength = 0;
////////////////////GEAR SIZES/////////////////////////////////////
function gear(rad) {
  // remove UI bodies
  removeUIConstraints(compositeArray[0]);
  // remove linkage constraints
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  // if crank motion delete specific constraints
  if (crankMod) {
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  }
  // set position at constraint location
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[0].constraints[0].pointA.x,
    y: compositeArray[0].constraints[0].pointA.y,
  });
  // reset angle
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // set radius
  radius = rad;
  // if crank motion then set radius to +52
  if (crankMod) {
    radius = radius + 52;
  }
  // store new radius
  compositeArray[1].radius = radius;
  // define new number of steps
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  // if cam motion then change body with specific function
  if (camMod === true) {
    if (compositeArray[1].shape === "cam") {
      changeBody2(1);
    } else if (compositeArray[1].shape === "shell") {
      changeShell();
    }
  }
  // if continuous rack and pinion then change body to continuous
  else if (rackPinionMod === true && compositeArray[1].alternate === false) {
    changeBodyContinuous(1);
  }
  // if crank motion change body with specific function
  else if (crankMod) {
    changeBodyCircle(1);
    createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[2].bodies[0]
    );
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[3].bodies[0]
    );
  }
  // if any other motion just use basic change body gear function
  else {
    changeBody(1);
  }
  if (rackPinionMod === true) {
    compositeArray[1].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8);
  }
  // add ui constraints
  createUIConstraints(compositeArray[0], beamSpace, 0, 6);
  pivotHeight(linkageLength);
}
///////////////////////////////////////////////////////////////////////////////////////////////
// reset/initialize rack and pinion motion
function rackPinion() {
  updateToothWidth();
  resetRadius();
  // remove ui body constraints/linkages
  removeUIConstraints(compositeArray[0]);
  // remove all constraints
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  // set step size
  steps = 0.25 * radius * 2;
  // redraw and create gear and lingear
  changeBody4(0);
  changeBody(1);
  // set position of gear and lingear
  Body.setPosition(compositeArray[1].bodies[0], {
    x: window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8),
    y: window.innerHeight * 0.68 + rackPinBase,
  });
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[0].bodies[0].position.x,
    y: window.innerHeight * 0.8 + rackPinBase,
  });
  // set constraint positions of gears and beams
  compositeArray[1].constraints[0].pointA.x =
    window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8);
  compositeArray[1].constraints[0].pointA.y =
    window.innerHeight * 0.68 + rackPinBase;
  compositeArray[0].constraints[0].pointA.x = window.innerWidth * (0.75 * 0.45);
  compositeArray[0].constraints[0].pointA.y =
    window.innerHeight * 0.8 + rackPinBase;
  compositeArray[2].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - rectBase;
  compositeArray[3].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - rectBase;
  // set gear to 180 gear
  compositeArray[1].alternate = true;
  // create constraints between beams and lingear
  createConstraintFake(
    compositeArray[0].bodies[0],
    compositeArray[2].bodies[0]
  );
  createConstraintFake(
    compositeArray[0].bodies[0],
    compositeArray[3].bodies[0]
  );
  constraintPosition(constraintPvalue);
  createUIConstraints(compositeArray[0], beamSpace, 0, 6);
  pivotHeight(linkageLength);
}
// reset/initialize cam motion
function cam() {
  resetRadius();
  // remove ui body constraints/linkages
  removeUIConstraints(compositeArray[0]);
  // delete all constraints/linkages
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  // set steps and widths
  steps = 40;
  camWidth = 40;
  // change bodies specific to cam motion
  changeBody5(0, 200);
  changeBody2(1);
  // set positions
  Body.setPosition(compositeArray[0].bodies[0], {
    x: window.innerWidth * (0.75 * 0.45),
    y: window.innerHeight * 0.6,
  });
  Body.setPosition(compositeArray[1].bodies[0], {
    x: window.innerWidth * (0.75 * 0.45),
    y: window.innerHeight - basePoint,
  });
  // set constraint positions
  compositeArray[1].constraints[0].pointA.x = window.innerWidth * (0.75 * 0.45);
  compositeArray[1].constraints[0].pointA.y = window.innerHeight - basePoint;
  compositeArray[0].constraints[0].pointA.x = window.innerWidth * (0.75 * 0.45);
  compositeArray[0].constraints[0].pointA.y =
    compositeArray[1].constraints[0].pointA.y - 60;
  compositeArray[2].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - 530;
  compositeArray[3].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - 530;
  // set as continuous
  compositeArray[1].alternate = false;
  // create new constraints from beams to ui bodies
  createConstraintFake(
    compositeArray[0].bodies[0],
    compositeArray[2].bodies[0]
  );
  createConstraintFake(
    compositeArray[0].bodies[0],
    compositeArray[3].bodies[0]
  );
  // create constraints between ui bodies
  createUIConstraints(compositeArray[0], beamSpace, 0, 6);
}
// reset/initialize crank motion
function crank() {
  // remove ui constraints
  removeUIConstraints(compositeArray[0]);
  // set radius to +52
  crankRadius();
  // delete all constraints/linkages
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  // set step size and tooth width
  steps = 0.25 * radius * 2;
  toothWidthDegree = 2;
  toothWidth = toothWidthDegree / conversionFactor;
  // change bodies to crank motion specific bodies
  changeBodyCircle(1);
  changeBody3(0);
  // create ui body constraints
  createUIConstraints(compositeArray[0], beamSpace, 0, 6);
  // set positions of new bodies
  Body.setPosition(compositeArray[0].bodies[0], {
    x: window.innerWidth * (0.75 * 0.45),
    y:
      window.innerHeight -
      basePoint -
      250 +
      8.0620080523284 -
      parseInt(pivotValue),
  });
  Body.setPosition(compositeArray[1].bodies[0], {
    x: window.innerWidth * (0.75 * 0.45),
    y: window.innerHeight - basePoint,
  });
  // set constraint locations of new bodies
  compositeArray[1].constraints[0].pointA.x = window.innerWidth * (0.75 * 0.45);
  compositeArray[1].constraints[0].pointA.y = window.innerHeight - basePoint;
  compositeArray[0].constraints[0].pointA.x = window.innerWidth * (0.75 * 0.45);
  compositeArray[0].constraints[0].pointA.y =
    compositeArray[1].constraints[0].pointA.y - 250;
  compositeArray[2].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - 400;
  compositeArray[3].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - 400;
  // create constraints between bodies
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  createConstraintFake(
    compositeArray[0].bodies[0],
    compositeArray[2].bodies[0]
  );
  createConstraintFake(
    compositeArray[0].bodies[0],
    compositeArray[3].bodies[0]
  );
  compositeArray[1].alternate = false;
  constraintPosition(constraintPvalue);
  pivotHeight(linkageLength);
}
// switch mechanism when dropdown changes/ change submodules and then call the specific default module function to generate the parts
function changeMech() {
  const string = document.getElementById("changeMech").value;
  if (string === "rack-pinion") {
    rackPinionMod = true;
    camMod = false;
    crankMod = false;
    rackPinion();
    compositeArray[0].constraints[0].stiffness = 0.001;
  } else if (string === "cam") {
    camMod = true;
    crankMod = false;
    rackPinionMod = false;
    cam();
    compositeArray[0].constraints[0].stiffness = 0.01;
  } else if (string === "crank") {
    crankMod = true;
    camMod = false;
    rackPinionMod = false;
    crank();
    compositeArray[0].constraints[0].stiffness = 0.001;
  }
}
// change system to 360/ continuous gear and motor
function continuous() {
  if (rackPinionMod) {
    compositeArray[1].alternate = false;
    changeBodyContinuous(1);
    Body.setPosition(compositeArray[0].bodies[0], {
      x: compositeArray[0].constraints[0].pointA.x,
      y: compositeArray[0].constraints[0].pointA.y,
    });
    compositeArray[0].constraints[0].stiffness = 0.001;
    compositeArray[1].motorDir = 1;
  } else {
    compositeArray[1].alternate = false;
  }
}
// change system to 180/ alternating gear and motor
function alternatingGear() {
  if (rackPinionMod) {
    changeBody(1);
    Body.setPosition(compositeArray[0].bodies[0], {
      x: compositeArray[0].constraints[0].pointA.x,
      y: compositeArray[0].constraints[0].pointA.y,
    });
    compositeArray[1].alternate = true;
    compositeArray[0].constraints[0].stiffness = 0.00001;
    compositeArray[1].motorDir = 1;
  } else {
    compositeArray[1].alternate = true;
  }
}

let prevSpaceValue = 50;
let changeSpaceWidth = 0;
// horizontal spacing function
function beamSpacing(value) {
  if (compositeArray[2] && compositeArray[3]) {
    // track the change in space
    changeSpaceWidth = value - prevSpaceValue;
    // change the constraint position by value
    compositeArray[2].constraints[0].pointA.x =
      compositeArray[0].constraints[0].pointA.x - value;
    compositeArray[3].constraints[0].pointA.x =
      compositeArray[0].constraints[0].pointA.x - value * -1;
    // change ui body positions
    if (!crankMod) {
      jointComposites[totalJointComposites - 1].constraints[0].pointA.x =
        jointComposites[totalJointComposites - 1].constraints[0].pointA.x +
        changeSpaceWidth;
      jointComposites[totalJointComposites - 2].constraints[0].pointA.x =
        jointComposites[totalJointComposites - 2].constraints[0].pointA.x -
        changeSpaceWidth;
    }
    prevSpaceValue = value;
    beamSpace = parseInt(value);
  }
  // change ui constraint colors and width back to normal
  document.getElementById("horizontalSpaceValue").innerHTML = value;
  compositeArray[0].constraints[1].render.lineWidth = 2;
  compositeArray[0].constraints[1].render.strokeStyle = "#666";
}
let prevPivotValue = 100;
let pivotValue = 100;
let changePivotHeight;
// change vertical height from open close beams
function pivotHeight(value) {
  if (compositeArray[2] && compositeArray[3]) {
    // if crank use different function
    if (crankMod) {
      circleJointHeight(value);
    }
    // change constraint y value
    else {
      changePivotHeight = value - prevPivotValue;
      jointComposites[totalJointComposites - 1].constraints[0].pointA.y =
        jointComposites[totalJointComposites - 1].constraints[0].pointA.y -
        changePivotHeight;
      jointComposites[totalJointComposites - 2].constraints[0].pointA.y =
        jointComposites[totalJointComposites - 2].constraints[0].pointA.y -
        changePivotHeight;
    }
    prevPivotValue = parseInt(value);
    pivotValue = parseInt(value);
    linkageLength = parseInt(value);
  }
  // set colors back to normal
  compositeArray[0].constraints[2].render.lineWidth = 2;
  compositeArray[0].constraints[2].render.strokeStyle = "#666";
}
// linkage position along beam
let constraintPvalue = 0;
function constraintPosition(value) {
  // reset angle
  Body.setAngle(compositeArray[2].bodies[0], 0);
  Body.setAngle(compositeArray[3].bodies[0], 0);
  // delete linkages
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  // change class width values
  compositeArray[2].width = newWidth1 - value;
  compositeArray[3].width = newWidth2 - -value;
  // create constraints
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
let changeHeightValue;
// vertical height function for crank mechanism
function circleJointHeight(value) {
  changeHeightValue = parseInt(value);
  // reset angle
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // change constraint positions for joints in crank mechanism
  for (let i = 0; i < jointComposites.length; i++) {
    if (
      jointComposites[i].constraints[0].bodyA === compositeArray[0].bodies[0] &&
      jointComposites[i].constraints[0].bodyB === compositeArray[1].bodies[0]
    ) {
      jointComposites[i].constraints[0].length = 350 + changeHeightValue;
      jointComposites[i].constraints[0].render.lineWidth = 2;
      jointComposites[i].constraints[0].render.strokeStyle = "#666";
    } else if (
      jointComposites[i].constraints[0].bodyA === compositeArray[1].bodies[0] &&
      jointComposites[i].constraints[0].bodyB === compositeArray[0].bodies[0]
    ) {
      jointComposites[i].constraints[0].length = 350 + changeHeightValue;
      jointComposites[i].constraints[0].render.lineWidth = 2;
      jointComposites[i].constraints[0].render.strokeStyle = "#666";
    }
    module.pivot2Point = parseInt(changeHeightValue);
  }
}
// reset radius for non crank mechanisms
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
// change radius for crank mechanism +52
function crankRadius() {
  if (radius === 80 || radius === 64 || radius === 48) {
    radius = radius + 52;
  }
}
// constant update for preventing bugs and breaking
Events.on(engine, "beforeUpdate", function (event) {
  if (
    compositeArray[2].bodies[0].angularVelocity > 0.1 ||
    compositeArray[2].bodies[0].angularVelocity < -0.1
  ) {
    Body.setAngularVelocity(compositeArray[2].bodies[0], 0);
    Body.setAngularVelocity(compositeArray[3].bodies[0], 0);
    Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 0 });
    Body.setVelocity(compositeArray[3].bodies[0], { x: 0, y: 0 });
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
    removeUIConstraints(compositeArray[0]);
  }
});
// constrant update to update beam rotations based off body positions
Events.on(engine, "afterUpdate", function (event) {
  if (crankMod) {
    jointComposites[jointComposites.length - 1].constraints[0].pointA.x =
      parseInt(prevSpaceValue);
    jointComposites[jointComposites.length - 2].constraints[0].pointA.x =
      -parseInt(prevSpaceValue);
    jointComposites[jointComposites.length - 1].constraints[0].pointA.y =
      -parseInt(pivot2Value);
    jointComposites[jointComposites.length - 2].constraints[0].pointA.y =
      -parseInt(pivot2Value);
  }

  const bottom = compositeArray[0].constraints[0].pointA.y - rectBase;
  const top = compositeArray[0].bodies[0].position.y - 200 - pivotValue;
  const b = top - bottom;
  const a = compositeArray[2].width;
  const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b));
  if (angleC) {
    if (angleC - 1.5708 < -1) {
    } else if (
      compositeArray[2].bodies[0].angularVelocity > 0.1 ||
      compositeArray[2].angularVelocity < -0.1
    ) {
      Body.setAngularVelocity(compositeArray[2].bodies[0], 0);
      Body.setAngularVelocity(compositeArray[3].bodies[0], 0);
    } else {
      Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708);
      Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
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
});

// Events.on(engine, 'beforeUpdate', function(event){
//   yDistance()
// })
////////////////////// RUN /////////////////////////////

// add initial bodies when first loads
addLinGearComposite(
  window.innerWidth * (0.75 * 0.45),
  window.innerHeight * 0.8 + rackPinBase
);
// set constraint stiffness very low
compositeArray[0].constraints[0].stiffness = 0.0000001;
// create ui constraints between ui bodies
createUIConstraints(compositeArray[0], prevSpaceValue, prevPivotValue, 6);
// add gear body
addGearComposite(
  window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 2),
  window.innerHeight * 0.68 + rackPinBase
);
// add rectangle bodies
addRectComposite(
  300,
  5,
  window.innerWidth * (0.75 * 0.45) - 200,
  compositeArray[0].constraints[0].pointA.y - rectBase
);
addRectComposite(
  -300,
  5,
  window.innerWidth * (0.75 * 0.45) + 200,
  compositeArray[0].constraints[0].pointA.y - rectBase
);
// set initial width of beams
let originalWidth1 = compositeArray[2].width;
let originalWidth2 = compositeArray[3].width;
newWidth1 = originalWidth1;
newWidth2 = originalWidth2;
// create beam linkages
createConstraintFake(compositeArray[0].bodies[0], compositeArray[2].bodies[0]);
createConstraintFake(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
// set motors
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
compositeArray[1].motorSpeed = 0.021;
module.motorSpeed = compositeArray[1].motorSpeed * 1000;
pivotHeight(0);
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine);
const x1 = compositeArray[0].constraints[0].pointA.x;
const x2 = compositeArray[2].constraints[0].pointA.x + 300;
const y1 = compositeArray[0].constraints[0].pointA.y - 300;
const y2 = compositeArray[2].constraints[0].pointA.y;
const d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
