// module identifier
flapModule = true;
let originalWidth1;
let originalWidth2;
module.horizontalSpace = 0;
module.connectorLength = 300;
const kWindowWidth = 0.75 * 0.5;
const kWindowHeight = 0.65;
// function to change gear sizes and linkages
function changeBodyFlap(index) {
  // if ui ball then remove bodies[1] first
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  // remove composite index body[0]
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  // store x and y constraint position
  let tmpConstraintXPoint;
  if (index === 0) {
    tmpConstraintXPoint =
      window.innerWidth * kWindowWidth - (radius + toothHeight * 0.6);
  } else {
    tmpConstraintXPoint =
      window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6);
  }
  const tmpConstraintYPoint = window.innerHeight * kWindowHeight;
  // remove composite constraints
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  // reset gear vertex array
  verts2 = [];
  // draw gear
  drawGear();
  // create new composite
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  // add circle for ui motor sprite
  if (compositeArray[index].shape === "gear") {
    Composite.add(
      compositeArray[index],
      Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 1)
    );
  }
  // add new constraint to composite
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  // set class radius parameter
  compositeArray[index].radius = radius;
  for (let i = 0; i < compositeArray[index].bodies[0].parts.length; i++) {
    compositeArray[index].bodies[0].parts[i].render.strokeStyle = "#000000";
  }
}
//////////////////////////GEAR SIZES/////////////////////////////////
const kSteps = 0.5;
function gearL(rad) {
  // delete linkage constraint
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
  // reset angle of both gears
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // set radius
  radius = rad;
  compositeArray[0].radius = radius;
  // apply new step number
  steps = radius * kSteps;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  // change body and redraw and add to scene
  changeBodyFlap(0);
  // create linkage constraint
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);

  // see smallGearL()
}
// see gearL()
function gearR(rad) {
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[1].radius;
  steps = radius * kSteps;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  changeBodyFlap(1);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
}
///////////////////////////////////////////////////////////////////////
// change motor gear
function motorL() {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  compositeArray[0].isMotor = true;
  compositeArray[1].isMotor = false;
}
// change motor gear
function motorR() {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  compositeArray[0].isMotor = false;
  compositeArray[1].isMotor = true;
}
let c = 300; //Connector Length
var c2 = -c;
Events.on(engine, "afterUpdate", function (event) {
  // track changing locations of gears
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
  // calculate spacing
  gear1Spacing = window.innerWidth * kWindowWidth - gear1CenterX;
  gear2Spacing = gear2CenterX - window.innerWidth * kWindowWidth;
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
  const x1 = gear1ConstraintX;
  const x2 = compositeArray[3].bodies[0].vertices[2].x;
  const y1 = gear1ConstraintY;
  const y2 = compositeArray[3].bodies[0].vertices[2].y;
  const x3 = gear2ConstraintX;
  const x4 = compositeArray[2].bodies[0].vertices[0].x;
  const y3 = gear2ConstraintY;
  const y4 = compositeArray[2].bodies[0].vertices[0].y;
  // calculate distance from gears to beams for the angle to rotate the beam
  const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  // track length of linkages for part generation
  flapConnectorR = Math.sqrt((x3 - x4) ** 2 + (y3 - y4) ** 2);
  flapConnectorL = d;
  // calculate angle to rotate beams
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
  const angleC = Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b));
  const angleC2 = Math.acos((a2 ** 2 + b2 ** 2 - c2 ** 2) / (2 * a2 * b2));
  const kAngleC = 1.5708;
  const xAngle1 = Math.asin(gear1CenterChangeX / b);
  const xAngle2 = Math.asin(gear2CenterChangeX / b2);
  // set angle of beams
  if (angleC && angleC2) {
    Body.setAngle(compositeArray[3].bodies[0], angleC - kAngleC - xAngle1);
    Body.setAngle(compositeArray[2].bodies[0], angleC2 - kAngleC - xAngle2);
  }
  // prevent any type of unnecessary movement
  Body.setVelocity(compositeArray[3].bodies[0], { x: 0, y: 0 });
  Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 0 });

  console.log(compositeArray[3].bodies[0]);
});
////////////////////// RUN /////////////////////////////
const width = 300;
rectBase = 300;
// add gears upon first starting
addGearComposite(
  window.innerWidth * kWindowWidth - (radius + toothHeight * 0.6),
  window.innerHeight * kWindowHeight
);
addGearComposite(
  window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6),
  window.innerHeight * kWindowHeight
);
// add flapping rectangles
addFlapRectComposite(
  window.innerWidth * kWindowWidth + (width / 2 + 60),
  compositeArray[0].constraints[0].pointA.y - rectBase - 87 - 36.751 + 150,
  7,
  150,
  50,
  300
);
addFlapRectComposite(
  window.innerWidth * kWindowWidth - (width / 2 + 60),
  compositeArray[0].constraints[0].pointA.y - rectBase - 87 - 36.751 + 150,
  7,
  150,
  -50,
  -300
);
// set original width to width of beams at start
originalWidth1 = compositeArray[2].width;
originalWidth2 = compositeArray[3].width;
// create linkage constraints
createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
// set gears to motor or not motor
const kMotorSpeed = 0.051;
compositeArray[1].isMotor = true;
compositeArray[1].motorSpeed = kMotorSpeed;
compositeArray[0].motorSpeed = kMotorSpeed;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
flapBeamSpaceUpdate();
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine);
console.log(compositeArray[2].bodies[0]);
