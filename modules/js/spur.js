// module/submodule indicator
spurModule = true;
let flapMode = true;
let rotateMode = false;
let c = 300;
c2 = -c;
let originalWidth1;
let originalWidth2;
module.horizontalSpace = 0;
module.connectorLength = 300;
// change the gear body for spur/rotating motion
function changeBodyRotate(index) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  let tmpConstraintXPoint;
  if (index == 0) {
    tmpConstraintXPoint =
      window.innerWidth * (0.75 * 0.45) - (radius + toothHeight * 0.6);
  } else if (index == 1) {
    tmpConstraintXPoint =
      window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 0.6);
    compositeArray[2].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45) +
      (compositeArray[1].radius + toothHeight * 0.6) * 2 +
      (compositeArray[2].radius + toothHeight * 0.6);
  } else {
    tmpConstraintXPoint =
      window.innerWidth * (0.75 * 0.45) +
      (compositeArray[1].radius + toothHeight * 0.6) * 2 +
      (compositeArray[2].radius + toothHeight * 0.6);
  }
  const tmpConstraintYPoint = window.innerHeight * 0.65;
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  verts2 = [];
  drawGear();
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  if (compositeArray[index].shape == "gear") {
    Composite.add(
      compositeArray[index],
      Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 1)
    );
  }
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[index].radius = radius;
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
// change gear body for flapping motion
function changeBodyFlap(index) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  let tmpConstraintXPoint;
  if (index == 0) {
    tmpConstraintXPoint =
      window.innerWidth * (0.75 * 0.5) - (radius + toothHeight * 0.6);
  } else {
    tmpConstraintXPoint =
      window.innerWidth * (0.75 * 0.5) + (radius + toothHeight * 0.6);
  }
  const tmpConstraintYPoint = window.innerHeight * 0.65;
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  verts2 = [];
  drawGear();
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  if (compositeArray[index].shape == "gear") {
    Composite.add(
      compositeArray[index],
      Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 1)
    );
  }
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[index].radius = radius;
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
///////////////////////////GEAR SIZES////////////////////////////////////////
/////ROTATING SPUR MOTION///////////////////
//small = 48, medium = 64, large = 80
function changeGear1(rad) {
  // reset angle
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // change radius
  radius = rad;
  // store radius
  compositeArray[0].radius = radius;
  // change num of steps
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  // draw and add new gear
  changeBodyRotate(0);
}
// see smallGear1()
function changeGear2(rad) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[1].radius = radius;
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  changeBodyRotate(1);
  removeComposite(compositeArray[3].bodies[0]);
  addRotateRect(
    module.spurBeamLength + 150,
    10,
    compositeArray[2].constraints[0].pointA.x,
    compositeArray[2].constraints[0].pointA.y
  );
}
function changeGear3(rad) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[2].radius = radius;
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  changeBodyRotate(2);
  removeComposite(compositeArray[3].bodies[0]);
  addRotateRect(
    module.spurBeamLength + 150,
    10,
    compositeArray[2].constraints[0].pointA.x,
    compositeArray[2].constraints[0].pointA.y
  );
}
////////////////////////////////////////////////////
///////Flapping Spur Motion/////////////////////////
// see smallGear1()
function changeGearL(rad) {
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[0].radius = radius;
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  changeBodyFlap(0);
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
}
function changeGearR(rad) {
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[1].radius;
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  changeBodyFlap(1);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
}
///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
function motorL() {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  compositeArray[0].isMotor = true;
  compositeArray[1].isMotor = false;
}
function motorR() {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  compositeArray[0].isMotor = false;
  compositeArray[1].isMotor = true;
}
// change module when dropdown changes
function changeMotion() {
  const string = document.getElementById("changeMotion").value;
  if (string == "flapping") {
    // set new module indicators
    rotateMode = false;
    flapMode = true;
    // remove all composites in sim
    removeComposite(compositeArray[0].bodies[0]);
    removeComposite(compositeArray[0].bodies[0]);
    removeComposite(compositeArray[0].bodies[0]);
    removeComposite(compositeArray[0].bodies[0]);
    const width = 300;
    rectBase = 300;
    // add new gears and beams
    addGearComposite(
      window.innerWidth * (0.75 * 0.5) - (radius + toothHeight * 0.6),
      window.innerHeight * 0.65
    );
    addGearComposite(
      window.innerWidth * (0.75 * 0.5) + (radius + toothHeight * 0.6),
      window.innerHeight * 0.65
    );
    addFlapRectComposite(
      window.innerWidth * (0.75 * 0.5) + (width / 2 + 60),
      compositeArray[0].constraints[0].pointA.y - rectBase - 87 - 36.751 + 150,
      7,
      150,
      50,
      300
    );
    addFlapRectComposite(
      window.innerWidth * (0.75 * 0.5) - (width / 2 + 60),
      compositeArray[0].constraints[0].pointA.y - rectBase - 87 - 36.751 + 150,
      7,
      150,
      -50,
      -300
    );
    // store original beam width values
    originalWidth1 = compositeArray[2].width;
    originalWidth2 = compositeArray[3].width;
    // create linkage constraints
    createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
    createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
    // set object motor properties
    compositeArray[1].isMotor = true;
    compositeArray[1].motorSpeed = 0.051;
    compositeArray[0].motorSpeed = 0.051;
    compositeArray[0].motorDir = -1;
    compositeArray[1].motorDir = 1;
    flapBeamSpaceUpdate();
  } else if (string == "rotate") {
    // set module indicators
    flapMode = false;
    rotateMode = true;
    // remove all composites from sim
    for (let i = 0; i < 4; i++) {
      removeComposite(compositeArray[0].bodies[0]);
    }
    // add new gears and beam
    addGearComposite(
      window.innerWidth * (0.75 * 0.45) - (radius + toothHeight * 0.6),
      window.innerHeight * 0.65
    );
    addGearComposite(
      window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 0.6),
      window.innerHeight * 0.65
    );
    addGearComposite(
      window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 0.6) * 3,
      window.innerHeight * 0.65
    );
    addRotateRect(
      150,
      10,
      compositeArray[2].constraints[0].pointA.x,
      compositeArray[2].constraints[0].pointA.y
    );
    // set object motor properties
    compositeArray[0].isMotor = true;
    compositeArray[1].motorSpeed = 0.051;
    compositeArray[0].motorSpeed = 0.051;
    compositeArray[0].motorDir = -1;
    compositeArray[1].motorDir = 1;
  }
}

Events.on(engine, "afterUpdate", function (event) {
  // calculate rotation of flap beams
  if (flapMode) {
    const gear2CenterX = compositeArray[1].bodies[0].position.x;
    const gear2CenterChangeY =
      compositeArray[1].radius *
      -0.8 *
      Math.sin(compositeArray[1].bodies[0].angle);
    const gear2CenterChangeX =
      compositeArray[1].radius *
      -0.8 *
      Math.cos(compositeArray[1].bodies[0].angle);
    const gear1CenterX = compositeArray[0].bodies[0].position.x;
    const gear1CenterChangeY =
      compositeArray[0].radius *
      0.8 *
      Math.sin(compositeArray[0].bodies[0].angle);
    const gear1CenterChangeX =
      compositeArray[0].radius *
      0.8 *
      Math.cos(compositeArray[0].bodies[0].angle);
    gear1Spacing = window.innerWidth * (0.75 * 0.5) - gear1CenterX;
    gear2Spacing = gear2CenterX - window.innerWidth * (0.75 * 0.5);
    beamSpace = Math.round(
      compositeArray[2].constraints[0].pointA.x -
        compositeArray[3].constraints[0].pointA.x
    );
    verticalSpacing =
      compositeArray[0].constraints[0].pointA.y -
      compositeArray[2].constraints[0].pointA.y;
    // console.log(verticalSpacing)
    const gear1ConstraintX =
      compositeArray[0].constraints[0].pointA.x + gear1CenterChangeX;
    const gear1ConstraintY =
      compositeArray[0].constraints[0].pointA.y + gear1CenterChangeY;
    const gear2ConstraintX =
      compositeArray[1].constraints[0].pointA.x + gear2CenterChangeX;
    const gear2ConstraintY =
      compositeArray[1].constraints[0].pointA.y + gear2CenterChangeY;
    const rect1ConstraintX = compositeArray[3].constraints[0].pointA.x;
    const rect1ConstraintY = compositeArray[3].constraints[0].pointA.y;
    const rect2ConstraintX = compositeArray[2].constraints[0].pointA.x;
    const rect2ConstraintY = compositeArray[2].constraints[0].pointA.y;
    const x2 = compositeArray[3].bodies[0].vertices[2].x;
    const x1 = gear1ConstraintX;
    const y2 = compositeArray[3].bodies[0].vertices[2].y;
    const y1 = gear1ConstraintY;
    const x4 = compositeArray[2].bodies[0].vertices[0].x;
    const x3 = gear2ConstraintX;
    const y4 = compositeArray[2].bodies[0].vertices[0].y;
    const y3 = gear2ConstraintY;
    const d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    flapConnectorR = Math.sqrt((x3 - x4) * (x3 - x4) + (y3 - y4) * (y3 - y4));
    flapConnectorL = d;
    const b = Math.sqrt(
      (gear1ConstraintX - rect1ConstraintX) *
        (gear1ConstraintX - rect1ConstraintX) +
        (gear1ConstraintY - rect1ConstraintY) *
          (gear1ConstraintY - rect1ConstraintY)
    );
    const b2 = Math.sqrt(
      (gear2ConstraintX - rect2ConstraintX) *
        (gear2ConstraintX - rect2ConstraintX) +
        (gear2ConstraintY - rect2ConstraintY) *
          (gear2ConstraintY - rect2ConstraintY)
    );
    const a = 300 + module.flapBeamWidthL;
    const a2 = -1 * (300 + module.flapBeamWidthR);
    const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b));
    const angleC2 = Math.acos((a2 * a2 + b2 * b2 - c2 * c2) / (2 * a2 * b2));
    const xAngle1 = Math.asin(gear1CenterChangeX / b);
    const xAngle2 = Math.asin(gear2CenterChangeX / b2);
    if (angleC && angleC2) {
      Body.setAngle(compositeArray[3].bodies[0], angleC - 1.5708 - xAngle1);
      Body.setAngle(compositeArray[2].bodies[0], angleC2 - 1.5708 - xAngle2);
    }
    Body.setVelocity(compositeArray[3].bodies[0], { x: 0, y: 0 });
    Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 0 });
  } else if (rotateMode) {
    Body.setAngle(
      compositeArray[3].bodies[0],
      compositeArray[2].bodies[0].angle
    );
  }
  rotateSliders();
});
////////////////////// RUN /////////////////////////////
const width = 300;
rectBase = 300;
// add composites when code first runs
addGearComposite(
  window.innerWidth * (0.75 * 0.5) - (radius + toothHeight * 0.6),
  window.innerHeight * 0.65
);
addGearComposite(
  window.innerWidth * (0.75 * 0.5) + (radius + toothHeight * 0.6),
  window.innerHeight * 0.65
);
addFlapRectComposite(
  window.innerWidth * (0.75 * 0.5) + (width / 2 + 60),
  compositeArray[0].constraints[0].pointA.y - rectBase - 87 - 36.751 + 150,
  7,
  150,
  50,
  300
);
addFlapRectComposite(
  window.innerWidth * (0.75 * 0.5) - (width / 2 + 60),
  compositeArray[0].constraints[0].pointA.y - rectBase - 87 - 36.751 + 150,
  7,
  150,
  -50,
  -300
);
// store original beam widths
originalWidth1 = compositeArray[2].width;
originalWidth2 = compositeArray[3].width;
// create linkage constraints
createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
// set object motor properties
compositeArray[1].isMotor = true;
compositeArray[1].motorSpeed = 0.051;
compositeArray[0].motorSpeed = 0.051;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
flapBeamSpaceUpdate();
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine);
