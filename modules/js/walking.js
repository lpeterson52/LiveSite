// module indicator
walkingModule = true;
openCloseMod = false;
const rectBase = 600;
let init = false;
let initAngle1;
let initAngle2;
let centerPosX;
let centerPosY;
let walkingVert = 0;
let walkingVerticalValue = 63;
const triangleHeight = 100;
const triangleWidth = 100;
const kWindowWidth = 0.75 * 0.5;
const kWindowHeight = 0.5;

/////////////////////////GEAR SIZES//////////////////////////////////////////////
function changeGear(rad) {
  const kSteps = 0.5;
  // delete ui sprite body
  deleteConstraint(compositeArray[0].bodies[0], compositeArray[1].bodies[0]);
  // reset angle to 0
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // set new radius
  radius = rad;
  // store new radius value
  compositeArray[1].radius = radius;
  // change number of steps for drawing gear
  steps = radius * kSteps;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  // draw and add new body
  changeBodyCircle(1);
  // set position of new body
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[0].constraints[0].pointA.x,
    y: compositeArray[0].constraints[0].pointA.y,
  });
  Body.setPosition(compositeArray[1].bodies[0], {
    x: window.innerWidth * kWindowWidth,
    y: compositeArray[1].constraints[0].pointA.y,
  });
  // create new linkage constraint
  createConstraint2(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
}
////////////////////////////////////////////////////////////////////////////////
function degrees(value) {
  const kDegrees = 0.0174533;
  return value * kDegrees;
}
// Draw Triangles
function drawTri(width, height) {
  verts3 = [];
  verts3.push({ x: centerX + width / 2, y: centerY });
  verts3.push({ x: centerX + width / 2, y: centerY - height });
  verts3.push({ x: centerX - width / 2, y: centerY });
}
function createTriConstraintFakeCorners(
  constraintStart,
  constraintDestination,
  length,
  stiffness
) {
  let startOffset;
  let startOffset2;
  let destOffset;
  let destOffset2;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape === "triTL") {
        startOffset = body.width / 3;
        startOffset2 = -body.height * (2 / 3);
        startShape = "triTL";
      } else if (body.shape === "circleCrank") {
        startOffset = body.radius * 0.8;
        startOffset2 = 0;
        startShape = "circleCrank";
      }
    }
    // set constraint offset for end body based on what type of body it is
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "triTL") {
        destOffset = body.width / 3;
        destOffset2 = -body.height * (2 / 3);
        destShape = "triTL";
      } else if (body.shape === "triBL") {
        destOffset = body.width / 3;
        destOffset2 = body.height * (1 / 3);
        destShape = "triTL";
      } else if (body.shape === "triTR") {
        destOffset = body.width / 3;
        destOffset2 = -body.height * (2 / 3);
        destShape = "triTL";
      } else if (body.shape === "triBR") {
        destOffset = body.width / 3;
        destOffset2 = body.height * (1 / 3);
        destShape = "triTL";
      } else if (body.shape === "circleCrank") {
        destOffset = body.radius * 0.8;
        destOffset2 = 0;
        destShape = "circleCrank";
      }
    }
  }
  if (startOffset != null && destOffset != null) {
    jointComposites.push(
      Composite.create({
        constraints: [
          Constraint.create({
            pointA: {
              x: startOffset * Math.cos(constraintStart.angle),
              y:
                startOffset * Math.sin(constraintStart.angle) +
                startOffset2 * Math.cos(constraintStart.angle),
            },
            bodyA: constraintStart,
            bodyB: constraintDestination,
            pointB: {
              x:
                destOffset * Math.cos(constraintDestination.angle) +
                destOffset2 * Math.sin(constraintDestination.angle),
              y:
                destOffset * Math.sin(constraintDestination.angle) +
                destOffset2 * Math.cos(constraintDestination.angle),
            },
            length: length,
            stiffness: stiffness,
          }),
        ],
      })
    );
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites - 1]);
    for (body of compositeArray) {
      if (
        constraintStart === body.bodies[0] ||
        constraintDestination === body.bodies[0]
      ) {
        body.hasConstraint = true;
      }
    }
  }
}
function createTriConstraintEdges(constraintStart, constraintDestination) {
  let beginOffsetX;
  let beginOffsetY;
  let beginOffsetX2;
  let beginOffsetY2;
  let endOffsetX;
  let endOffsetY;
  let endOffsetX2;
  let endOffsetY2;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape === "triTL") {
        beginOffsetX = body.width / 3;
        beginOffsetY = body.height * (1 / 3);
        beginOffsetX2 = -body.width * (2 / 3);
        beginOffsetY2 = body.height * (1 / 3);
        startShape = "triTL";
      } else if (body.shape === "triTR") {
        beginOffsetX = body.width / 3;
        beginOffsetY = body.height * (1 / 3);
        beginOffsetX2 = -body.width * (2 / 3);
        beginOffsetY2 = body.height * (1 / 3);
        startShape = "triTR";
      }
    }
    // set constraint offset for end body based on what type of body it is
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "triBL") {
        endOffsetX = body.width / 3;
        endOffsetY = body.height * (1 / 3);
        endOffsetX2 = -body.width * (2 / 3);
        endOffsetY2 = body.height * (1 / 3);
        destShape = "triBL";
      } else if (body.shape === "triBR") {
        endOffsetX = body.width / 3;
        endOffsetY = body.height * (1 / 3);
        endOffsetX2 = -body.width * (2 / 3);
        endOffsetY2 = body.height * (1 / 3);
        destShape = "triBR";
      }
    }
  }
  if (beginOffsetX != null && endOffsetX != null) {
    jointComposites.push(
      Composite.create({
        constraints: [
          Constraint.create({
            pointA: {
              x: beginOffsetX * Math.cos(constraintStart.angle),
              y:
                beginOffsetX * Math.sin(constraintStart.angle) +
                beginOffsetY * Math.cos(constraintStart.angle),
            },
            bodyA: constraintStart,
            bodyB: constraintDestination,
            pointB: {
              x:
                endOffsetX * Math.cos(constraintDestination.angle) +
                endOffsetY * Math.sin(constraintDestination.angle),
              y:
                endOffsetX * Math.sin(constraintDestination.angle) +
                endOffsetY * Math.cos(constraintDestination.angle),
            },
            stiffness: 1,
          }),
        ],
      })
    );
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites - 1]);
    jointComposites.push(
      Composite.create({
        constraints: [
          Constraint.create({
            pointA: {
              x: beginOffsetX2 * Math.cos(constraintStart.angle),
              y:
                beginOffsetX2 * Math.sin(constraintStart.angle) +
                beginOffsetY2 * Math.cos(constraintStart.angle),
            },
            bodyA: constraintStart,
            bodyB: constraintDestination,
            pointB: {
              x:
                endOffsetX2 * Math.cos(constraintDestination.angle) +
                endOffsetY2 * Math.sin(constraintDestination.angle),
              y:
                endOffsetX2 * Math.sin(constraintDestination.angle) +
                endOffsetY2 * Math.cos(constraintDestination.angle),
            },
            stiffness: 1,
          }),
        ],
      })
    );
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites - 1]);
    console.log(
      jointComposites[totalJointComposites - 1].constraints[0].length
    );
    for (body of compositeArray) {
      if (
        constraintStart === body.bodies[0] ||
        constraintDestination === body.bodies[0]
      ) {
        body.hasConstraint = true;
      }
    }
  }
}
function walking1Input(value) {
  jointComposites[1].constraints[0].length = parseInt(value);
  jointComposites[3].constraints[0].length = parseInt(value);
  ///////////////////////////////////////////////////////////
  for (let i = 0; i < 4; i++) {
    jointComposites[i].constraints[0].render.lineWidth = redLineWidth;
    jointComposites[i].constraints[0].render.strokeStyle = "#FF3318";
  }
  ///////////////////////////////////////////////////////////
  linkageLength = parseInt(value);
}
function walking2Input(value) {
  walkingVerticalValue = parseInt(value);
  //////////////////////////////////////////////////////////
  for (let i = 4; i < 8; i++) {
    jointComposites[i].constraints[0].length = parseInt(value);
  }
  //////////////////////////////////////////////////////////
  for (let i = 4; i < 8; i++) {
    jointComposites[i].constraints[0].render.lineWidth = redLineWidth;
    jointComposites[i].constraints[0].render.strokeStyle = "#FF3318";
  }
}
function walking3Input(value) {
  // var tri1Angle = compositeArray[0].bodies[0].angle
  // var tri2Angle = compositeArray[3].bodies[0].angle
  // var newHeight = triangleHeight + parseInt(value)
  // var tri1PivotY = compositeArray[0].bodies[0].vertices[1].y
  // var tri3PivotY = compositeArray[3].bodies[0].vertices[1].y
  // compositeArray[0].height = newHeight
  // compositeArray[3].height = newHeight
  // Body.setAngle(compositeArray[0].bodies[0], 0)
  // compositeArray[0].bodies[0].vertices[0].y = tri1PivotY - parseInt(value)
  // Body.setAngle(compositeArray[3].bodies[0], 0)
  // compositeArray[3].bodies[0].vertices[0].y = tri3PivotY - parseInt(value)
  // Body.setAngle(compositeArray[3].bodies[0], 0)
  // compositeArray[3].bodies[0].vertices[0].y = tri3PivotY - (triangleHeight + parseInt(value))
  // compositeArray[0].bodies[0].vertices[0].x = tri1PivotX + (10*Math.cos(tri1Angle))
  // compositeArray[0].bodies[0].vertices[0].y = 500
  // console.log(compositeArray[0].bodies[0].vertices[0].x)
  // console.log(tri1PivotY - (100*Math.sin(tri1Angle)))
}
const kLineWidth = 2;
const kStrokeStyle = "#666";
function walking1(value) {
  // linkageLength = parseInt(value)
  for (let i = 0; i < 4; i++) {
    jointComposites[i].constraints[0].render.lineWidth = kLineWidth;
    jointComposites[i].constraints[0].render.strokeStyle = kStrokeStyle;
  }
}
function walking2(value) {
  // linkageLength = parseInt(value)\
  for (let i = 4; i < 8; i++) {
    jointComposites[i].constraints[0].render.lineWidth = kLineWidth;
    jointComposites[i].constraints[0].render.strokeStyle = kStrokeStyle;
  }
}
///////////////// Animation /////////////////////////////////////

// called every frame after physics is applied
// same as above
let motorRot = degrees(-90);
Events.on(engine, "afterUpdate", function (event) {
  motorRot = motorRot + degrees(2);
  Body.setAngle(compositeArray[1].bodies[0], motorRot);
  Body.setPosition(compositeArray[1].bodies[0], {
    x: centerPosX,
    y: centerPosY,
  });

  if (init === false) {
    Body.setAngle(compositeArray[1].bodies[0], degrees(-90));
  }

  const gearCenterX = compositeArray[1].bodies[0].position.x;
  const gearCenterChangeY =
    compositeArray[1].radius *
    0.8 *
    Math.sin(compositeArray[1].bodies[0].angle);
  const gearCenterChangeX =
    compositeArray[1].radius *
    0.8 *
    Math.cos(compositeArray[1].bodies[0].angle);
  const gearConstraintX =
    compositeArray[1].constraints[0].pointA.x + gearCenterChangeX;
  const gearConstraintY =
    compositeArray[1].constraints[0].pointA.y + gearCenterChangeY;

  // calculate spacing
  const a2 = compositeArray[0].constraints[0].pointA.x;
  const a1 = gearConstraintX;
  const b2 = compositeArray[0].constraints[0].pointA.y;
  const b1 = gearConstraintY;
  const a3 = compositeArray[3].constraints[0].pointA.x;
  const a4 = gearConstraintX;
  const b3 = compositeArray[3].constraints[0].pointA.y;
  const b4 = gearConstraintY;
  triDistance = Math.sqrt((a1 - a2) ** 2 + (b1 - b2) ** 2);
  const triDistance2 = Math.sqrt((a3 - a4) ** 2 + (b3 - b4) ** 2);

  x1 = compositeArray[0].bodies[0].vertices[0].x;
  let x2 = compositeArray[0].bodies[0].vertices[1].x;
  y1 = compositeArray[0].bodies[0].vertices[0].y;
  y2 = compositeArray[0].bodies[0].vertices[1].y;
  const triVertDist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

  const triHeight = compositeArray[0].height;
  const crankAngle = -compositeArray[1].bodies[0].angle;
  const crankAngle2 = compositeArray[1].bodies[0].angle - Math.PI;
  const horizontalSpace = gearCenterX - a2;
  const x = triDistance;
  x2 = triDistance2;
  const pivotRad = compositeArray[1].radius * 0.8;
  const xEq1 = Math.acos(
    (triHeight * triHeight + x * x - linkageLength * linkageLength) /
      (2 * triVertDist * x)
  );
  const yEq1 = Math.asin((pivotRad * Math.sin(Math.PI - crankAngle)) / x);
  const triangleRot = xEq1 + yEq1;
  const xEq2 = Math.acos(
    (triHeight * triHeight + x2 * x2 - linkageLength * linkageLength) /
      (2 * triVertDist * x2)
  );
  const yEq2 = Math.asin((pivotRad * Math.sin(Math.PI - crankAngle2)) / x2);
  const triangleRot2 = xEq2 + yEq2;

  if (init === false) {
    initAngle1 = xEq1 + yEq1;
    initAngle2 = xEq2 + yEq2;
    // console.log()
    init = true;
  }
  ///SET ANGLES OF TOP TRIANGLES///////////////
  Body.setAngle(compositeArray[0].bodies[0], -triangleRot + initAngle1);
  Body.setAngle(compositeArray[3].bodies[0], -(-triangleRot2 + initAngle1));
  ////////////////////////////////////////////////////

  jointComposites[1].constraints[0].pointA =
    jointComposites[0].constraints[0].pointA;
  jointComposites[3].constraints[0].pointA =
    jointComposites[0].constraints[0].pointA;
  x1 = compositeArray[0].bodies[0].vertices[1].x;
  x2 = compositeArray[2].bodies[0].vertices[1].x;
  y1 = compositeArray[0].bodies[0].vertices[1].y;
  y2 = compositeArray[2].bodies[0].vertices[1].y;
  walkingVert = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  // console.log(compositeArray[0].bodies[0].vertices[2].y)

  if (
    compositeArray[2].bodies[0].vertices[0].y <
    compositeArray[0].bodies[0].vertices[2].y
  ) {
    Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 20 });
  }
  if (
    compositeArray[4].bodies[0].vertices[0].y <
    compositeArray[3].bodies[0].vertices[2].y
  ) {
    Body.setVelocity(compositeArray[4].bodies[0], { x: 0, y: 20 });
  }
  if (compositeArray[2].bodies[0].velocity.y < -3) {
    Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 0 });
  }
  if (compositeArray[4].bodies[0].velocity.y < -3) {
    Body.setVelocity(compositeArray[4].bodies[0], { x: 0, y: 0 });
  }
  console.log(compositeArray[0].height);
  // compositeArray[0].bodies[0].vertices[0].y = 515
});

////////////////////// RUN /////////////////////////////
const kFillStyle = "#FF6B6B";
// run the engine
radius = 25;
addTriComposite(
  window.innerWidth * kWindowWidth - 127.35,
  window.innerHeight * kWindowHeight - 33.3333,
  triangleWidth,
  triangleHeight
);
compositeArray[0].shape = "triTL";
addCircleComposite(
  window.innerWidth * kWindowWidth,
  window.innerHeight * kWindowHeight,
  radius
);
centerPosX = window.innerWidth * kWindowWidth;
centerPosY = window.innerHeight * kWindowHeight;
changeBodyCircle(1);
compositeArray[compositeArray.length - 1].bodies[0].render.fillStyle =
kFillStyle;
addTriComposite(
  window.innerWidth * kWindowWidth - 127.35,
  compositeArray[0].constraints[0].pointA.y + 100,
  triangleWidth,
  -triangleHeight
);
compositeArray[2].shape = "triBL";
compositeArray[2].constraints[0].stiffness = 0.000001;
addTriComposite(
  window.innerWidth * kWindowWidth + 127.35,
  window.innerHeight * kWindowHeight - 33.3333,
  -triangleWidth,
  triangleHeight
);
compositeArray[3].shape = "triTR";
addTriComposite(
  window.innerWidth * kWindowWidth + 127.35,
  compositeArray[3].constraints[0].pointA.y + 100,
  -triangleWidth,
  -triangleHeight
);
compositeArray[4].shape = "triBR";
createTriConstraintFakeCorners(
  compositeArray[1].bodies[0],
  compositeArray[0].bodies[0],
  111,
  0.00000001
);
createTriConstraintFakeCorners(
  compositeArray[1].bodies[0],
  compositeArray[2].bodies[0],
  111,
  0.5
);
createTriConstraintFakeCorners(
  compositeArray[1].bodies[0],
  compositeArray[3].bodies[0],
  111,
  0.00000001
);
createTriConstraintFakeCorners(
  compositeArray[1].bodies[0],
  compositeArray[4].bodies[0],
  111,
  0.5
);
createTriConstraintEdges(
  compositeArray[0].bodies[0],
  compositeArray[2].bodies[0]
);
createTriConstraintEdges(
  compositeArray[3].bodies[0],
  compositeArray[4].bodies[0]
);
Composite.remove(compositeArray[2], compositeArray[2].constraints[0]);
Composite.remove(compositeArray[4], compositeArray[4].constraints[0]);
engine.world.gravity.y = 5;
Engine.run(engine);
Render.run(render);
