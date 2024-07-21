////////////// Add Libraries! /////////////
const Engine = Matter.Engine,
  World = Matter.World,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Common = Matter.Common,
  Constraint = Matter.Constraint,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  Events = Matter.Events,
  Render = Matter.Render,
  Runner = Matter.Runner,
  MouseConstraint = Matter.MouseConstraint,
  Vertices = Matter.Vertices,
  Bounds = Matter.Bounds,
  Vector = Matter.Vector,
  Query = Matter.Query,
  Mouse = Matter.Mouse;

////////////// Create Matter Engine /////////
const engine = Engine.create();

///////////// Create Renderer //////////////
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    height: window.innerHeight,
    width: window.innerWidth * 0.75,
  },
});
const runner = Runner.create();
//////// create mouse dragging //////////
// var mouseConstraint = MouseConstraint.create(engine);
var world = engine.world;

// gravity init
engine.world.gravity.x = 0;
engine.world.gravity.y = 0;

///////////////////// VARIABLES //////////////////////////////////////
// Modules
let openCloseModule = false,
  upDownModule = false,
  flapModule = false,
  rackPinionModule = false,
  camModule = false,
  crankModule = false,
  rotateModule = false,
  planetaryModule = false,
  spurModule = false,
  walkingModule = false;
// Collision Groups
const collisionCategory = 0x0001,
  otherCategory = 0x0002;

// Constraint Variables
let constraintStart;
let constraintDestination;
// Point Arrays
const xValues = [];
const yValues = [];
let verts2 = [];
let linGearVerts = [];
// Object Variables
let steps = 40;
const linSteps = 30;
const centerX = 100;
const centerY = 100;
let radius = 80;
const conversionFactor = 360 / (2 * Math.PI);
const toothHeight = 0.25 * 64;
let toothWidthDegree = 2;
let toothWidth = toothWidthDegree / conversionFactor;
// Module States Variables
let openCloseMod = false,
  crankMod = false,
  mirrored = false,
  paired = false,
  shared = false,
  flipY = false;
// Module Distance Variables
const screenScale = window.innerHeight / 1011;
const basePoint = 450 * (screenScale - 0.7);
const rackPinBase = 300 * (1 - screenScale);
let beamSpace = 50;
let verticalSpacing = 100;

// Module Slider Values
let module = {
  horizontalSpace: 50,
  verticalSpace: 0,
  connectorLength: 369,
  pivotPoint: 0,
  pivot2Point: 0,
  motorSpeed: 40,
  beamWidth: 0,
  flapBeamWidthL: 0,
  flapBeamWidthR: 0,
  flapBeamHeightL: 0,
  flapBeamHeightR: 0,
  flapBeamOffset: 0,
  flapConnectorLengthL: 300,
  flapConnectorLengthR: 300,
  spurBeamLength: 0,
};
// Other
let newWidth1;
let newWidth2;
let paused = false;
let pivot2Value;
let gear1Spacing = 0;
let gear2Spacing = 0;
let flapConnectorL = 0;
let flapConnectorR = 0;
let symetrical = true;
let leftWingUI = true;
let planetaryBrace = 0;
let planetaryMod = 0;
let linkageLength = 111;

////////////////////// CREATE VERtiCES TO DRAW SHAPES //////////////
function drawGear() {
  //new vertex array
  verts2 = [];
  // draw circle
  for (let i = 0; i < steps; i++) {
    xValues[i] = centerX + radius * Math.cos((2 * Math.PI * i) / steps);
    yValues[i] = centerY + radius * Math.sin((2 * Math.PI * i) / steps);
  }
  // add teeth
  for (let i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i] });
    if (i % 2 === 0 && i < steps) {
      verts2.push({
        x:
          centerX +
          (radius + toothHeight) *
            Math.cos((2 * Math.PI * i) / steps + toothWidth),
        y:
          centerY +
          (radius + toothHeight) *
            Math.sin((2 * Math.PI * i) / steps + toothWidth),
      });
      verts2.push({
        x:
          centerX +
          (radius + toothHeight) *
            Math.cos((2 * Math.PI * (i + 1)) / steps - toothWidth),
        y:
          centerY +
          (radius + toothHeight) *
            Math.sin((2 * Math.PI * (i + 1)) / steps - toothWidth),
      });
    }
  }
}
function drawContinuousGear() {
  //new vertex array
  verts2 = [];
  // draw circle
  for (let i = 0; i < steps; i++) {
    xValues[i] = centerX + radius * Math.cos((2 * Math.PI * i) / steps);
    yValues[i] = centerY + radius * Math.sin((2 * Math.PI * i) / steps);
  }
  // add teeth
  for (let i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i] });
    if (i % 2 === 0 && i < steps * (1 / 3)) {
      verts2.push({
        x:
          centerX +
          (radius + toothHeight) *
            Math.cos((2 * Math.PI * i) / steps + toothWidth),
        y:
          centerY +
          (radius + toothHeight) *
            Math.sin((2 * Math.PI * i) / steps + toothWidth),
      });
      verts2.push({
        x:
          centerX +
          (radius + toothHeight) *
            Math.cos((2 * Math.PI * (i + 1)) / steps - toothWidth),
        y:
          centerY +
          (radius + toothHeight) *
            Math.sin((2 * Math.PI * (i + 1)) / steps - toothWidth),
      });
    }
  }
}
drawGear();
function drawLinGear() {
  // new vertex array
  linGearVerts = [];
  // create rectangle shape
  linGearVerts.push({ x: 200, y: 200 });
  linGearVerts.push({ x: 200, y: 600 });
  linGearVerts.push({ x: 230, y: 600 });
  // add teeth
  for (let i = 0; i < linSteps; i++) {
    linGearVerts.push({ x: 230, y: 600 - (400 / linSteps) * i });
    if (i > 0 && i % 2 === 0) {
      linGearVerts.push({ x: 230 + 20, y: 600 - (400 / linSteps) * i - 2 });
      linGearVerts.push({
        x: 230 + 20,
        y: 600 - (400 / linSteps) * i - 11.3332,
      });
    }
  }
  // add last corner
  linGearVerts.push({ x: 230, y: 600 - 400 });
}
let flapVerts = [];
function drawFlapRect(beamWidth, levelHeight, levelOffset, topLength) {
  // new vertex array
  flapVerts = [];
  if (topLength < 0) {
    beamWidth = beamWidth * -1;
  }
  // create rectangle shape
  flapVerts.push({ x: 0, y: 500 });
  flapVerts.push({ x: beamWidth + beamWidth * 0.3, y: 500 });
  flapVerts.push({ x: 0 + levelOffset, y: 500 - levelHeight });
  flapVerts.push({ x: 0 + levelOffset + topLength, y: 500 - levelHeight });
  flapVerts.push({
    x: 0 + levelOffset + topLength,
    y: 500 - levelHeight - Math.abs(beamWidth),
  });
  flapVerts.push({
    x: 0 + levelOffset - beamWidth * 0.8,
    y: 500 - levelHeight - Math.abs(beamWidth),
  });
  flapVerts.push({ x: 0, y: 500 });
}
drawLinGear();
function drawCam() {
  let ovalRad = 0;
  if (radius === 80) {
    ovalRad = 125;
  }
  if (radius === 64) {
    ovalRad = 100;
  }
  if (radius === 48) {
    ovalRad = 75;
  }

  verts2 = [];
  for (let i = 0; i < steps / 2 + 1; i++) {
    xValues[i] = radius * 1.25 * 1.3 * Math.cos((2 * Math.PI * i) / steps);
    yValues[i] = radius * 1.25 * 1.3 * Math.sin((2 * Math.PI * i) / steps);
  }
  for (let i = steps / 2 + 1; i < steps; i++) {
    xValues[i] = radius * 1.25 * 1.3 * Math.cos((2 * Math.PI * i) / steps);
    yValues[i] =
      (radius * 1.25 + ovalRad) * Math.sin((2 * Math.PI * i) / steps);
  }
  for (let i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i] });
    // console.log(yValues[i] + " " + i)
  }
}
function drawShell() {
  let factor = 1;
  if (radius === 80) {
    factor = 1;
  }
  if (radius === 64) {
    factor = 0.83;
  }
  if (radius === 48) {
    factor = 0.68;
  }

  verts2 = [];
  for (let i = 0; i < steps + 1; i++) {
    xValues[i] =
      (14 * factor + i * (1.2 * factor)) *
      Math.cos((2 * Math.PI * i) / steps) *
      3.3333;
    yValues[i] =
      (14 * factor + i * (1.2 * factor)) *
      Math.sin((2 * Math.PI * i) / steps) *
      3.3333;
  }
  for (let i = 0; i < steps; i++) {
    verts2.push({ x: xValues[i], y: yValues[i] });
  }
}
/////////////////////// Pop Up Modal ///////////////////////////////////
function overlay3() {
  el3 = document.getElementById("overlay3");
  el3.style.visibility =
    el3.style.visibility === "visible" ? "hidden" : "visible";
  flipLabel = document.getElementById("flipYLabel");
  flipCheck = document.getElementById("flipYCheck");
  flipTitle = document.getElementById("flipYTitle");
  flipCheck.style.visibility = "hidden";
  flipLabel.style.visibility = "hidden";
  flipTitle.style.visibility = "hidden";
  //displayConstraints();
}
//////////////// COMPOSITES //////////////////////////////////////
// The Matter.Body module contains methods for creating and manipulating body models.
// A Matter.Body is a rigid body that can be simulated by a Matter.Engine.
// Factories for commonly used body configurations (such as rectangles, circles and other polygons)
// can be found in the module Matter.Bodies

// Constraints are used for specifying that a fixed distance must be maintained between two bodies
// (or a body and a fixed world-space position). The stiffness of constraints can be modified to create
// springs or elastic.

// A composite body is a collection of
// Matter.Body, Matter.Constraint and other Matter.Composite,
// therefore composites form a tree structure.

const compositeArray = [];
let totalComposites = 0;
const constraintArray = [];
let totalConstraints = 0;
const jointComposites = [];
let totalJointComposites = 0;

// add gear to world
function addGearComposite(centerX, centerY) {
  // change tooth width based off radius
  if (radius === 80) {
    toothWidthDegree = 2;
  } else if (radius === 64) {
    toothWidthDegree = 3;
  } else if (radius === 48) {
    toothWidthDegree = 4;
  }
  toothWidth = toothWidthDegree / conversionFactor;
  drawGear();
  // increase number of composites by 1
  totalComposites++;
  // increase number of constraints by 1
  totalConstraints++;
  // add new composite to composite array
  compositeArray.push(
    // create composite
    Composite.create({
      // create body from vertex array verts2[]
      bodies: [Bodies.fromVertices(centerX, centerY, [verts2])],
      constraints: [],
      // Add collision filter mask
      collisionFilter: {
        mask: otherCategory,
      },
      // store information about body
      shape: "gear",
      radius: radius,
      toothWidthDegree: toothWidthDegree,
      toothHeight: toothHeight,
      numOfTeeth: steps,
      alternate: false,
      lock: false,
    })
  );

  // add constraint to constraint array constraintArray[]
  constraintArray.push(
    // create constraint to rotate around
    Constraint.create({
      pointA: { x: centerX, y: centerY },
      // body to constrain
      bodyB: compositeArray[totalComposites - 1].bodies[0],
      stiffness: 1,
    })
  );
  // add constraint to composite (composite to add to, constraint to add)
  Composite.add(
    compositeArray[totalComposites - 1],
    constraintArray[totalConstraints - 1]
  );
  Composite.add(
    compositeArray[totalComposites - 1],
    Bodies.circle(centerX, centerY, 1)
  );
  // add composite to the world
  World.add(engine.world, [compositeArray[totalComposites - 1]]);
}
// Add linear gear to World
function addLinGearComposite(centerX, centerY) {
  // see addGearComposite() comments
  totalComposites++;
  totalConstraints++;
  compositeArray.push(
    Composite.create({
      // create body from linGearVerts[] vertex array
      bodies: [
        Bodies.fromVertices(centerX, centerY, [linGearVerts], {
          // set object fill and stroke color to black
        }),
      ],
      constraints: [],
      shape: "linGear",
      numOfTeeth: steps,
      friction: 1,
      density: 100,
      lock: true,
    })
  );
  constraintArray.push(
    Constraint.create({
      pointA: { x: centerX, y: centerY },
      bodyB: compositeArray[totalComposites - 1].bodies[0],
      // soft spring-like stiffness so it can be moved by the gear
      stiffness: 0.001,
    })
  );
  Composite.add(
    compositeArray[totalComposites - 1],
    constraintArray[totalConstraints - 1]
  );
  World.add(engine.world, [compositeArray[totalComposites - 1]]);
}
// Add Beams for Open Close
function addRectComposite(width, height, centerX, centerY) {
  // see addGearComposite() comments
  totalComposites++;
  totalConstraints++;
  compositeArray.push(
    Composite.create({
      options: {
        render: {
          fillStyle: "#cccccc",
        },
      },
      bodies: [Bodies.rectangle(centerX, centerY, width, height)],
      constraints: [],
      shape: "rect",
      width: width,
      height: height,
      lock: false,
    })
  );
  constraintArray.push(
    // create joint constraint and place it at end of beam or center - width/2
    Constraint.create({
      pointA: { x: centerX + width / 2, y: centerY },
      bodyB: compositeArray[totalComposites - 1].bodies[0],
      pointB: { x: width / 2, y: 0 },
      stiffness: 1,
    })
  );
  compositeArray[compositeArray.length - 1].bodies[0].render.fillStyle =
    "#cccccc";
  compositeArray[compositeArray.length - 1].bodies[0].render.strokeStyle =
    "#000";
  Composite.add(
    compositeArray[totalComposites - 1],
    constraintArray[totalConstraints - 1]
  );
  World.add(engine.world, [compositeArray[totalComposites - 1]]);
}
function addFlapRectComposite(
  centerX,
  centerY,
  beamWidth,
  levelHeight,
  levelOffset,
  topLength
) {
  drawFlapRect(beamWidth, levelHeight, levelOffset, topLength);
  // see addGearComposite() comments
  totalComposites++;
  totalConstraints++;
  compositeArray.push(
    Composite.create({
      options: {
        render: {
          fillStyle: "#cccccc",
        },
      },
      bodies: [Bodies.fromVertices(centerX, centerY, [flapVerts])],
      constraints: [],
      shape: "flapRect",
      width: topLength,
      height: levelHeight,
      lock: false,
    })
  );
  constraintArray.push(
    // create joint constraint and place it at end of beam or center - width/2
    Constraint.create({
      pointA: { x: centerX, y: centerY },
      bodyB: compositeArray[totalComposites - 1].bodies[0],
      pointB: { x: 0, y: 0 },
      stiffness: 1,
    })
  );
  compositeArray[compositeArray.length - 1].bodies[0].render.fillStyle =
    "#cccccc";
  compositeArray[compositeArray.length - 1].bodies[0].render.strokeStyle =
    "#000";
  Composite.add(
    compositeArray[totalComposites - 1],
    constraintArray[totalConstraints - 1]
  );
  // console.log(compositeArray[compositeArray.length-1].bodies[0].vertices)
  const pointX =
    compositeArray[compositeArray.length - 1].bodies[0].vertices[1].x;
  const pointY =
    compositeArray[compositeArray.length - 1].bodies[0].vertices[1].y;
  const xOff = centerX - pointX;
  const yOff = pointY - centerY;
  console.log(yOff);
  compositeArray[compositeArray.length - 1].constraints[0].pointA.x =
    centerX - xOff - (beamWidth + (beamWidth * 0.3) / 2);
  compositeArray[compositeArray.length - 1].constraints[0].pointB.x = -xOff;
  compositeArray[compositeArray.length - 1].constraints[0].pointA.y =
    centerY + yOff;
  compositeArray[compositeArray.length - 1].constraints[0].pointB.y = yOff;
  for (let j = 1; j < 3; j++) {
    compositeArray[compositeArray.length - 1].bodies[0].parts[
      j
    ].render.strokeStyle = "#000000";
  }
  World.add(engine.world, [compositeArray[totalComposites - 1]]);
}
// Add circles for crank
function addCircleComposite(centerX, centerY, radius) {
  totalComposites++;
  totalConstraints++;
  compositeArray.push(
    Composite.create({
      bodies: [Bodies.circle(centerX, centerY, radius)],
      constraints: [],
      radius: radius,
      bottom: centerY,
      shape: "circle",
      lock: true,
    })
  );
  constraintArray.push(
    Constraint.create({
      pointA: { x: centerX, y: centerY },
      bodyB: compositeArray[totalComposites - 1].bodies[0],
      pointB: { x: 0, y: 0 },
      stiffness: 0.0001,
    })
  );
  Composite.add(
    compositeArray[totalComposites - 1],
    constraintArray[totalConstraints - 1]
  );
  World.add(engine.world, [compositeArray[totalComposites - 1]]);
}
function addTriComposite(centerX, centerY, width, height) {
  drawTri(width, height);
  totalComposites++;
  totalConstraints++;
  compositeArray.push(
    Composite.create({
      bodies: [Bodies.fromVertices(centerX, centerY, [verts3])],
      constraints: [],
      width: width,
      height: height,
      bottom: centerY,
      shape: "tri",
    })
  );
  constraintArray.push(
    Constraint.create({
      pointA: { x: centerX + width / 3, y: centerY + height / 3 },
      bodyB: compositeArray[totalComposites - 1].bodies[0],
      pointB: { x: width / 3, y: height / 3 },
      stiffness: 1,
    })
  );
  Composite.add(
    compositeArray[totalComposites - 1],
    constraintArray[totalConstraints - 1]
  );
  compositeArray[compositeArray.length - 1].bodies[0].render.fillStyle =
    "#3355aa";
  compositeArray[compositeArray.length - 1].bodies[0].render.strokeStyle =
    "#000";
  World.add(engine.world, [compositeArray[totalComposites - 1]]);
}
function addRotateRect(width, height, centerX, centerY) {
  // see addGearComposite() comments
  centerX = centerX - width / 2;
  totalComposites++;
  totalConstraints++;
  compositeArray.push(
    Composite.create({
      options: {
        render: {
          fillStyle: "#cccccc",
        },
      },
      bodies: [Bodies.rectangle(centerX, centerY, width, height)],
      constraints: [],
      shape: "rect",
      width: width,
      height: height,
      lock: false,
      stiffness: 1,
    })
  );
  constraintArray.push(
    // create joint constraint and place it at end of beam or center - width/2
    Constraint.create({
      pointA: { x: centerX + width / 2, y: centerY },
      bodyB: compositeArray[totalComposites - 1].bodies[0],
      pointB: { x: width / 2, y: 0 },
      stiffness: 1,
    })
  );
  compositeArray[compositeArray.length - 1].bodies[0].render.fillStyle =
    "#cccccc";
  compositeArray[compositeArray.length - 1].bodies[0].render.strokeStyle =
    "#000";
  Composite.add(
    compositeArray[totalComposites - 1],
    constraintArray[totalConstraints - 1]
  );
  World.add(engine.world, [compositeArray[totalComposites - 1]]);
  compositeArray[3].bodies[0].collisionFilter.mask = otherCategory;
}
function removeComposite(composite) {
  // Remove a Composite group from the world
  // Loop through all composites and find the composite that is same as argument
  for (let i = 0; i < compositeArray.length; i++) {
    if (compositeArray[i].bodies[0] === composite) {
      for (joint of jointComposites) {
        if (
          joint.constraints[0].bodyA === composite ||
          joint.constraints[0].bodyB === composite
        ) {
          for (body in compositeArray) {
            if (
              joint.constraints[0].bodyA != composite &&
              joint.constraints[0].bodyA === body.bodies[0]
            ) {
              body.hasConstraint = false;
            }
            if (
              joint.constraints[0].bodyB != composite &&
              joint.constraints[0].bodyB === body.bodies[0]
            ) {
              body.hasConstraint = false;
            }
          }
          joint.constraints[0].bodyA = null;
          joint.constraints[0].bodyB = null;
          joint.constraints[0].pointA = null;
          joint.constraints[0].pointB = null;
        }
      }
      Composite.clear(compositeArray[i], true);
      compositeArray.splice(i, 1);
    }
  }
  totalComposites--;
}

///////////////////////////////// CONSTRAINTS ///////////////////////////////////////////

function deleteConstraint(constraintStart, constraintDestination) {
  // find joints in jointComposites that have same body as start body and/or end body
  for (joint of jointComposites) {
    if (
      (joint.constraints[0].bodyA === constraintStart &&
        joint.constraints[0].bodyB === constraintDestination) ||
      (joint.constraints[0].bodyA === constraintDestination &&
        joint.constraints[0].bodyB === constraintStart)
    ) {
      // set composite to null
      joint.constraints[0].bodyA = null;
      joint.constraints[0].bodyB = null;
      joint.constraints[0].pointA = null;
      joint.constraints[0].pointB = null;
      // set any attached shapes to hasConstraint = false
      for (item of compositeArray) {
        if (
          constraintStart === item.bodies[0] ||
          constraintDestination === item.bodies[0]
        ) {
          item.hasConstraint = false;
        }
      }
    }
  }
}
function createConstraintFakeRP(constraintStart, constraintDestination) {
  let startOffset;
  let startOffset2;
  let destOffset;
  let destOffset2;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape === "gear") {
        // if gear, set offset to 80% of that gears radius
        startOffset = body.radius * 0.8;
        startOffset2 = 0;
        startShape = "gear";
        // console.log("working")
      } else if (body.shape === "rect") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "rect";
      } else if (body.shape === "linGear") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -200 - pivotValue;
        startShape = "linGear";
      } else if (body.shape === "circle") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0;
        startShape = "circle";
      } else if (body.shape === "poly") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "poly";
      }
    }
    // set constraint offset for end body based on what type of body it is
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "gear") {
        destOffset = body.radius * 0.8;
        destOffset2 = 0;
        destShape = "gear";
      } else if (body.shape === "rect") {
        if (startShape === "linGear") {
          if (body.width > 0) {
            startOffset = spaceValue;
          } else {
            startOffset = -spaceValue;
          }
        }
        destOffset = body.width * -0.5;
        destOffset2 = 0;
        destShape = "rect";
      } else if (body.shape === "linGear") {
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear";
      } else if (body.shape === "circle") {
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle";
      } else if (body.shape === "poly") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
        destShape = "poly";
      }
    }
  }

  // console.log(startOffset)
  // console.log(destOffset)
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
            stiffness: 0.00001,
            length: 300,
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

// Standard Create Constraint function
////////////////////// OPEN CLOSE MODULE//////////////////////////////
function createConstraint2(constraintStart, constraintDestination) {
  let startOffset;
  let startOffset2;
  let destOffset;
  let destOffset2;
  let startShape;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape === "gear" || body.shape === "circleCrank") {
        // if gear, set offset to 80% of that gears radius
        startOffset = body.radius * 0.8;
        startOffset2 = 0;
        startShape = "gear";
      } else if (body.shape === "rect") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "rect";
      } else if (body.shape === "linGear") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0;
        startShape = "linGear";
      } else if (body.shape === "circle") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0;
        startShape = "circle";
      } else if (body.shape === "poly") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "poly";
      }
    }
    // set constraint offset for end body based on what type of body it is
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "gear" || body.shape === "circleCrank") {
        destOffset = body.radius * 0.8;
        destOffset2 = 0;
        destShape = "gear";
      } else if (body.shape === "rect") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
        destShape = "rect";
      } else if (body.shape === "linGear") {
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear";
      } else if (body.shape === "circle") {
        if (startShape === "linGear") {
          startOffset2 = -200;
        }
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle";
      } else if (body.shape === "poly") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
        destShape = "poly";
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
            stiffness: 1,
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
function createConstraintFake(constraintStart, constraintDestination) {
  let startOffset;
  let startOffset2;
  let destOffset;
  let destOffset2;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape == "gear") {
        // if gear, set offset to 80% of that gears radius
        startOffset = body.radius * 0.8;
        startOffset2 = 0;
        startShape = "gear";
      } else if (body.shape === "rect") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "rect";
      } else if (body.shape === "linGear") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -200 - pivotValue;
        startShape = "linGear";
      } else if (body.shape === "linRect") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -(body.height / 2) - pivotValue;
        startShape = "linRect";
      } else if (body.shape === "circle") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0;
        startShape = "circle";
      } else if (body.shape === "poly") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "poly";
      } else if (body.shape === "circleCrank") {
        startOffset = body.radius * 0.8;
        startOffset2 = 0;
        startShape = "circleCrank";
      }
    }
    // set constraint offset for end body based on what type of body it is
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "gear") {
        destOffset = body.radius * 0.8;
        destOffset2 = 0;
        destShape = "gear";
      } else if (body.shape === "rect") {
        if (
          startShape === "linGear" ||
          startShape === "linRect" ||
          startShape === "circle"
        ) {
          if (body.width > 0) {
            startOffset = -module.horizontalSpace;
          } else {
            startOffset = module.horizontalSpace;
          }
        }
        destOffset = body.width * -0.5;
        destOffset2 = 0;
        destShape = "rect";
      } else if (body.shape === "linGear") {
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear";
      } else if (body.shape === "circle") {
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle";
      } else if (body.shape === "poly") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
        destShape = "poly";
      } else if (body.shape === "tri") {
        destOffset = body.width / 3;
        destOffset2 = -body.height * (2 / 3);
        destShape = "tri";
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
            stiffness: 0.00001,
          }),
        ],
      })
    );
    totalJointComposites++;
    World.add(engine.world, jointComposites[totalJointComposites - 1]);
    for (body of compositeArray) {
      if (
        constraintStart == body.bodies[0] ||
        constraintDestination == body.bodies[0]
      ) {
        body.hasConstraint = true;
      }
    }
  }
}
// Separate Constraint function to change beam Width
function createConstraintFake2(
  constraintStart,
  constraintDestination,
  length,
  originalWidth
) {
  let startOffset;
  let startOffset2;
  let destOffset;
  let destOffset2;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape === "gear") {
        // if gear, set offset to 80% of that gears radius
        if (flapModule && i === 1) {
          startOffset = body.radius * -0.8;
        } else {
          startOffset = body.radius * 0.8;
        }
        startOffset2 = 0;
        startShape = "gear";
      } else if (body.shape === "rect") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "rect";
      } else if (body.shape === "linGear") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -200 - pivotValue;
        startShape = "linGear";
      } else if (body.shape === "linRect") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = -(body.height / 2) - pivotValue;
        startShape = "linRect";
      } else if (body.shape === "circle") {
        // if rectangle, set offset to half width of rectangle so it connects at end of rectangle
        startOffset = 0;
        startOffset2 = 0;
        startShape = "circle";
      } else if (body.shape === "poly") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
        startShape = "poly";
      }
    }
    // set constraint offset for end body based on what type of body it is
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "gear") {
        destOffset = body.radius * 0.8;
        destOffset2 = 0;
        destShape = "gear";
      } else if (body.shape === "rect") {
        if (startShape === "linGear" || startShape === "linRect") {
          if (body.width > 0) {
            if (i > 3) {
              startOffset =
                -module.horizontalSpace + module.horizontalSpace * 2;
            } else {
              startOffset = -module.horizontalSpace;
            }
          } else {
            if (i > 3) {
              startOffset = module.horizontalSpace - module.horizontalSpace * 2;
            } else {
              startOffset = module.horizontalSpace;
            }
          }
        }
        destOffset = originalWidth * -0.5 - length;
        console.log(destOffset);
        destOffset2 = 0;
        destShape = "rect";
      } else if (body.shape === "linGear") {
        destOffset = 0;
        destOffset2 = 0;
        destShape = "linGear";
      } else if (body.shape === "circle") {
        destOffset = 0;
        destOffset2 = 0;
        destShape = "circle";
      } else if (body.shape === "poly") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
        destShape = "poly";
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
            stiffness: 0.00001,
            length: 300,
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
//////////////////////////////////////////////////////////////

//////////////////////FLAPPING MODULE ONLY///////////////////
function createConstraint(constraintStart, constraintDestination) {
  let startOffset;
  let startOffset2;
  let destOffset;
  let destOffset2;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape === "gear") {
        startOffset = body.radius * 0.8;
      } else if (body.shape === "rect") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
      } else if (body.shape === "poly") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
      } else if (body.shape === "flapRect") {
        Body.setAngle(body.bodies[0], 0);
        console.log(body.bodies[0].position);
        startOffset = body.width * 0.68;
        startOffset2 = body.height * -0.15;
      }
    }
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "gear") {
        destOffset = body.radius * 0.8;
      } else if (body.shape === "rect") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
      } else if (body.shape === "poly") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
      } else if (body.shape === "flapRect") {
        Body.setAngle(body.bodies[0], 0);
        const xOffset =
          body.bodies[0].position.x - body.bodies[0].vertices[3].x;
        const yOffset =
          body.bodies[0].position.y - body.bodies[0].vertices[3].y - 3.5;
        destOffset = -xOffset;
        destOffset2 = -yOffset;
      }
    }
  }
  if (startOffset && destOffset) {
    jointComposites.push(
      Composite.create({
        constraints: [
          Constraint.create({
            pointA: {
              x: startOffset * Math.cos(constraintStart.angle),
              y: startOffset * Math.sin(constraintStart.angle),
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
            stiffness: 0.001,
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

function createConstraint3(constraintStart, constraintDestination) {
  let startOffset;
  let destOffset;
  let destOffset2;
  for (body of compositeArray) {
    if (constraintStart === body.bodies[0]) {
      if (body.shape === "gear") {
        startOffset = body.radius * -0.8;
      } else if (body.shape === "rect") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
      } else if (body.shape === "poly") {
        startOffset = body.width * -0.5;
        startOffset2 = 0;
      } else if (body.shape === "flapRect") {
        startOffset = body.width * 0.68;
        startOffset2 = body.height * -0.15;
      }
    }
    if (constraintDestination === body.bodies[0]) {
      if (body.shape === "gear") {
        destOffset = body.radius * -0.8;
      } else if (body.shape === "rect") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
      } else if (body.shape === "poly") {
        destOffset = body.width * -0.5;
        destOffset2 = 0;
      } else if (body.shape === "flapRect") {
        Body.setAngle(body.bodies[0], 0);
        const xOffset =
          body.bodies[0].position.x - body.bodies[0].vertices[4].x;
        const yOffset =
          body.bodies[0].position.y - body.bodies[0].vertices[4].y - 3.5;
        destOffset = -xOffset;
        destOffset2 = -yOffset;
      }
    }
  }
  if (startOffset && destOffset) {
    jointComposites.push(
      Composite.create({
        constraints: [
          Constraint.create({
            pointA: {
              x: startOffset * Math.cos(constraintStart.angle),
              y: startOffset * Math.sin(constraintStart.angle),
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
            stiffness: 0.001,
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

//////////////////////////////////////////////////////////////////////////////////////////////
// Create Pivot Balls
function createUIConstraints(composite, initialXSpace, initialYSpace, radius) {
  if (composite.shape === "linGear") {
    // add circles
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x - initialXSpace,
        composite.bodies[0].position.y - 200 - initialYSpace,
        radius
      )
    );
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x + initialXSpace,
        composite.bodies[0].position.y - 200 - initialYSpace,
        radius
      )
    );
    // add style
    composite.bodies[1].render.fillStyle = "#bc98f9";
    composite.bodies[2].render.fillStyle = "#bc98f9";
    composite.bodies[1].render.strokeStyle = "#000";
    composite.bodies[2].render.strokeStyle = "#000";
    // add constraints between circles
    Composite.add(
      composite,
      Constraint.create({
        bodyA: composite.bodies[1],
        bodyB: composite.bodies[2],
        stiffness: 0.00001,
      })
    );
    Composite.add(
      composite,
      Constraint.create({
        pointA: {
          x: composite.bodies[0].position.x,
          y: composite.bodies[0].position.y - 200 - initialYSpace,
        },
        pointB: { x: 0, y: -200 },
        bodyB: composite.bodies[0],
        stiffness: 0.00001,
      })
    );
  }
  if (composite.shape === "linRect") {
    // add Circles
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x - initialXSpace,
        composite.bodies[0].position.y - composite.height / 2 - initialYSpace,
        radius
      )
    );
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x + initialXSpace,
        composite.bodies[0].position.y - composite.height / 2 - initialYSpace,
        radius
      )
    );
    // add style
    composite.bodies[1].render.fillStyle = "#bc98f9";
    composite.bodies[2].render.fillStyle = "#bc98f9";
    composite.bodies[1].render.strokeStyle = "#000";
    composite.bodies[2].render.strokeStyle = "#000";
    // add constraints between circles
    Composite.add(
      composite,
      Constraint.create({
        bodyA: composite.bodies[1],
        bodyB: composite.bodies[2],
        stiffness: 0.00001,
      })
    );
    Composite.add(
      composite,
      Constraint.create({
        pointA: {
          x: composite.bodies[0].position.x,
          y: composite.bodies[0].position.y - initialYSpace,
        },
        pointB: { x: 0, y: 0 },
        bodyB: composite.bodies[0],
        stiffness: 0.00001,
      })
    );
  }
  if (composite.shape === "circle") {
    // add circles
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x - initialXSpace,
        composite.bodies[0].position.y - initialYSpace,
        radius
      )
    );
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x + initialXSpace,
        composite.bodies[0].position.y - initialYSpace,
        radius
      )
    );
    // add style
    composite.bodies[1].render.fillStyle = "#bc98f9";
    composite.bodies[2].render.fillStyle = "#bc98f9";
    composite.bodies[1].render.strokeStyle = "#000";
    composite.bodies[2].render.strokeStyle = "#000";
    // add constraints between circles
    Composite.add(
      composite,
      Constraint.create({
        bodyA: composite.bodies[1],
        bodyB: composite.bodies[2],
        stiffness: 0.00001,
      })
    );
    Composite.add(
      composite,
      Constraint.create({
        pointA: {
          x: composite.bodies[0].position.x,
          y: composite.bodies[0].position.y,
        },
        pointB: { x: 0, y: 0 },
        bodyB: composite.bodies[0],
        stiffness: 0.00001,
      })
    );
  }
}
// Pivot balls for the mirrored Rack and Pinion parts
function createUIConstraintsMirror(
  composite,
  initialXSpace,
  initialYSpace,
  radius
) {
  if (composite.shape === "linGear") {
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x - initialXSpace,
        composite.bodies[0].position.y + 200 + initialYSpace,
        radius
      )
    );
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x + initialXSpace,
        composite.bodies[0].position.y + 200 + initialYSpace,
        radius
      )
    );
    composite.bodies[1].render.fillStyle = "#bc98f9";
    composite.bodies[2].render.fillStyle = "#bc98f9";
    composite.bodies[1].render.strokeStyle = "#000";
    composite.bodies[2].render.strokeStyle = "#000";
    Composite.add(
      composite,
      Constraint.create({
        bodyA: composite.bodies[1],
        bodyB: composite.bodies[2],
        stiffness: 0.00001,
      })
    );
    Composite.add(
      composite,
      Constraint.create({
        pointA: {
          x: composite.bodies[0].position.x,
          y: composite.bodies[0].position.y + 200 + initialYSpace,
        },
        pointB: { x: 0, y: -200 },
        bodyB: composite.bodies[0],
        stiffness: 0.00001,
      })
    );
  }
}
function createUIConstraintsMirrorSingle(
  composite,
  initialXSpace,
  initialYSpace,
  radius
) {
  if (composite.shape === "linGear") {
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x,
        composite.bodies[0].position.y + 200 + initialYSpace,
        radius
      )
    );
    composite.bodies[1].render.fillStyle = "#bc98f9";
    composite.bodies[1].render.strokeStyle = "#000";
    Composite.add(
      composite,
      Constraint.create({
        pointA: {
          x: composite.bodies[0].position.x,
          y: composite.bodies[0].position.y + 200 + initialYSpace,
        },
        pointB: { x: 0, y: -200 },
        bodyB: composite.bodies[0],
        stiffness: 0.00001,
      })
    );
  }
}
// ADD Single Pivot Ball for Up and Down Module
function createUIConstraintsSingle(
  composite,
  initialXSpace,
  initialYSpace,
  radius
) {
  console.log(composite.shape);
  if (composite.shape === "linGear") {
    // add circle
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x,
        composite.bodies[0].position.y - 200 - initialYSpace,
        radius
      )
    );
    // add style
    composite.bodies[1].render.fillStyle = "#bc98f9";
    composite.bodies[1].render.strokeStyle = "#000";
    // add vertical constraint
    Composite.add(
      composite,
      Constraint.create({
        pointA: {
          x: composite.bodies[0].position.x,
          y: composite.bodies[0].position.y - 200 - initialYSpace,
        },
        pointB: { x: 0, y: -200 },
        bodyB: composite.bodies[0],
        stiffness: 0.00001,
      })
    );
  }
  if (composite.shape === "linRect") {
    if (!openCloseModule) {
      Composite.add(
        composite,
        Bodies.circle(
          composite.bodies[0].position.x,
          composite.bodies[0].position.y - initialYSpace,
          radius
        )
      );
      composite.bodies[1].render.fillStyle = "#bc98f9";
      composite.bodies[1].render.strokeStyle = "#000";
      Composite.add(
        composite,
        Constraint.create({
          pointA: {
            x: composite.bodies[0].position.x,
            y: composite.bodies[0].position.y - initialYSpace,
          },
          pointB: { x: 0, y: 0 },
          bodyB: composite.bodies[0],
          stiffness: 0.00001,
        })
      );
    } else {
      Composite.add(
        composite,
        Bodies.circle(
          composite.bodies[0].position.x,
          composite.bodies[0].position.y - composite.height / 2 - initialYSpace,
          radius
        )
      );
      composite.bodies[1].render.fillStyle = "#bc98f9";
      composite.bodies[1].render.strokeStyle = "#000";
      Composite.add(
        composite,
        Constraint.create({
          pointA: {
            x: composite.bodies[0].position.x,
            y:
              composite.bodies[0].position.y -
              composite.height / 2 -
              initialYSpace,
          },
          pointB: { x: 0, y: -(composite.height / 2) },
          bodyB: composite.bodies[0],
          stiffness: 0.00001,
        })
      );
    }
    // console.log("hello")
  }
  if (composite.shape === "circle") {
    // add circle
    Composite.add(
      composite,
      Bodies.circle(
        composite.bodies[0].position.x,
        composite.bodies[0].position.y - initialYSpace,
        radius
      )
    );
    // add style
    composite.bodies[1].render.fillStyle = "#bc98f9";
    composite.bodies[1].render.strokeStyle = "#000";
    // add vertical constraint
    Composite.add(
      composite,
      Constraint.create({
        pointA: {
          x: composite.bodies[0].position.x,
          y: composite.bodies[0].position.y - initialYSpace,
        },
        pointB: { x: 0, y: 0 },
        bodyB: composite.bodies[0],
        stiffness: 0.00001,
      })
    );
  }
}
// remove the Pivot Balls from world
function removeUIConstraints(composite) {
  if (composite.bodies[1] && composite.bodies[2]) {
    composite.constraints.splice(composite.constraints.length - 1, 1);
    composite.constraints.splice(composite.constraints.length - 1, 1);
    composite.bodies.splice(1, 1);
    composite.bodies.splice(1, 1);
  }
}
// remove single pivot ball from world
function removeUIConstraintsSingle(composite) {
  if (composite.bodies[1]) {
    composite.constraints.splice(composite.constraints.length - 1, 1);
    composite.bodies.splice(1, 1);
  }
}
//////////////////////////// BODIES ////////////////////////////////
// redraw and generate shape if any parameters are modified (WIP) ignore for now

// change compositeArray body to gear when change module
function changeBody(index) {
  // first remove body [1] from composite
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  // remove body [0] from composite
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  // store old constraint position
  const tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
  const tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
  // remove constraint
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  // reset vertex array
  verts2 = [];
  // draw gear
  drawGear();
  compositeArray[index].radius = radius;
  compositeArray[index].shape = "gear";
  // add new gear body to composite at position of old constraint
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  // add circle to gear for png sprite
  if (compositeArray[index].shape === "gear") {
    Composite.add(
      compositeArray[index],
      Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 1)
    );
  }
  // add constraint to composite
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  // add black stroke to new gear body
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
// change compositeArray body to continuous gear when change module
// see changeBody() comments
function changeBodyContinuous(index) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  const tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
  const tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  verts2 = [];
  drawContinuousGear();
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  if (compositeArray[index].shape === "gear") {
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
  compositeArray[index].shape = "gear";
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
// change compositeArray body to cam when change module
// see changeBody() comments
function changeBody2(index) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[1].constraints[0].pointA.x,
    y: compositeArray[1].constraints[0].pointA.y - 200,
  });
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  const tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
  const tmpConstraintYPoint =
    compositeArray[index].constraints[0].pointA.y - 40 * (radius / 64);
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  verts2 = [];
  drawCam();
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: {
        x: tmpConstraintXPoint,
        y: tmpConstraintYPoint + 40 * (radius / 64),
      },
      pointB: { x: 0, y: 40 * (radius / 64) },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[index].radius = radius;
  compositeArray[index].shape = "cam";
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
  // console.log(compositeArray[index].bodies[0].vertices[10].y - radius)
}
// change compositeArray body to circle when change to crank module
// see changeBody() comments
function changeBody3(index) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  const tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
  const tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  Composite.add(
    compositeArray[index],
    Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 10)
  );
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[index].radius = radius;
  compositeArray[index].shape = "circle";
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
// change compositeArray body to Rack Gear when change module
// see changeBody() comments
function changeBody4(index) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  const tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
  const tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  linGearVerts = [];
  drawLinGear();
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [
      linGearVerts,
    ])
  );
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[index].shape = "linGear";
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
// change compositeArray body to circle when change module
// see changeBody() comments
function changeBody5(index, height) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  const tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
  const tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  linGearVerts = [];
  if (upDownModule) {
    Composite.add(
      compositeArray[index],
      Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 15)
    );
  } else {
    Composite.add(
      compositeArray[index],
      Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 15)
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
  compositeArray[index].shape = "linRect";
  compositeArray[index].height = height;
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
// change compositeArray body to circleCrank for png sprite when change to crank module
// see changeBody() comments
function changeBodyCircle(index) {
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  const tmpConstraintXPoint = compositeArray[index].constraints[0].pointA.x;
  const tmpConstraintYPoint = compositeArray[index].constraints[0].pointA.y;
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  Composite.add(
    compositeArray[index],
    Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, radius)
  );
  Composite.add(
    compositeArray[index],
    Constraint.create({
      pointA: { x: tmpConstraintXPoint, y: tmpConstraintYPoint },
      bodyB: compositeArray[index].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[index].radius = radius;
  compositeArray[index].shape = "circleCrank";
  for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
    compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
}
//used im cam.html to change shape from egg to shell
function changeShell() {
  if (compositeArray[1].bodies[1]) {
    Composite.remove(compositeArray[1], compositeArray[1].bodies[1]);
  }
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[1].constraints[0].pointA.x,
    y: compositeArray[1].constraints[0].pointA.y - 200,
  });
  Composite.remove(compositeArray[1], compositeArray[1].bodies[0]);
  const tmpConstraintXPoint = compositeArray[1].constraints[0].pointA.x;
  const tmpConstraintYPoint =
    compositeArray[1].constraints[0].pointA.y - 40 * (radius / 64);
  Composite.remove(compositeArray[1], compositeArray[1].constraints[0]);
  verts2 = [];
  drawShell();
  Composite.add(
    compositeArray[1],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  Composite.add(
    compositeArray[1],
    Constraint.create({
      pointA: {
        x: tmpConstraintXPoint,
        y: tmpConstraintYPoint + 40 * (radius / 64),
      },
      pointB: { x: 0, y: 40 * (radius / 64) },
      bodyB: compositeArray[1].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[1].radius = radius;
  compositeArray[1].shape = "shell";
  compositeArray[1].motorDir = -1;
  compositeArray[1].alternate = false;
}
//used in cam.html to change the gear shape to egg from shell
function changeEgg() {
  if (compositeArray[1].bodies[1]) {
    Composite.remove(compositeArray[1], compositeArray[1].bodies[1]);
  }
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[1].constraints[0].pointA.x,
    y: compositeArray[1].constraints[0].pointA.y - 300,
  });
  Composite.remove(compositeArray[1], compositeArray[1].bodies[0]);
  const tmpConstraintXPoint = compositeArray[1].constraints[0].pointA.x;
  const tmpConstraintYPoint =
    compositeArray[1].constraints[0].pointA.y - 40 * (radius / 64);
  Composite.remove(compositeArray[1], compositeArray[1].constraints[0]);
  verts2 = [];
  drawCam();
  Composite.add(
    compositeArray[1],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  Composite.add(
    compositeArray[1],
    Constraint.create({
      pointA: {
        x: tmpConstraintXPoint,
        y: tmpConstraintYPoint + 40 * (radius / 64),
      },
      pointB: { x: 0, y: 40 * (radius / 64) },
      bodyB: compositeArray[1].bodies[0],
      stiffness: 1,
    })
  );
  compositeArray[1].radius = radius;
  compositeArray[1].shape = "cam";
  for (let j = 0; j < compositeArray[1].bodies[0].parts.length; j++) {
    compositeArray[1].bodies[0].parts[j].render.strokeStyle = "#000000";
  }
  compositeArray[1].motorDir = 1;
}
////////////////// MODIFY BODY FUNCTIONS ///////////////////////
// set motor as 180
function alternateMotor() {
  console.log(camMod);
  if (camModule || camMod) {
    console.log(compositeArray[0].constraints[0].stiffness);
    Body.setPosition(compositeArray[0].bodies[0], {
      x: window.innerWidth * 0.45,
      y: window.innerHeight * 0.2,
    });
    compositeArray[0].constraints[0].stiffness = 1;
  }
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  for (let i = 0; i < 2; i++) {
    if (compositeArray[i].isMotor === true) {
      compositeArray[i].alternate = true;
    }
  }
}
// set motor as continuous
function continuousMotor() {
  if (camModule) {
    Body.setPosition(compositeArray[0].bodies[0], {
      x: window.innerWidth * 0.45,
      y: window.innerHeight * 0.3,
    });
    compositeArray[1].motorDir = -1;
  }
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  for (let i = 0; i < 2; i++) {
    if (compositeArray[i].isMotor === true) {
      compositeArray[i].alternate = false;
    }
  }
  if (compositeArray[1].shape === "shell") {
    compositeArray[1].motorDir = -1;
  }
}
// change motor speed
function changeMotorSpeed(value) {
  for (body of compositeArray) {
    if (body.isMotor) {
      body.motorSpeed = parseInt(value) / 1000;
    }
  }
}
/////////////////////// UI FUNCTIONS ////////////////////////////
// change values that appear above sliders
// track slider value when changing module
function updateSliders() {
  if (document.getElementById("horizontalSpace")) {
    document.getElementById("horizontalSpaceValue").innerHTML =
      module.horizontalSpace;
    document.getElementById("horizontalSpace").value = module.horizontalSpace;
  }
  if (document.getElementById("verticalSpace")) {
    document.getElementById("verticalSpaceValue").innerHTML =
      module.verticalSpace;
    document.getElementById("verticalSpace").value = module.verticalSpace;
  }
  if (document.getElementById("connectorLength")) {
    document.getElementById("connectorLengthValue").innerHTML =
      module.connectorLength;
    document.getElementById("connectorLength").value = module.connectorLength;
  }
  if (document.getElementById("flapConnectorLengthL")) {
    document.getElementById("flapConnectorLengthValueL").innerHTML =
      module.flapConnectorLengthL;
    document.getElementById("flapConnectorLengthL").value =
      module.flapConnectorLengthL;
  }
  if (document.getElementById("flapConnectorLengthR")) {
    document.getElementById("flapConnectorLengthValueR").innerHTML =
      module.flapConnectorLengthR;
    document.getElementById("flapConnectorLengthR").value =
      module.flapConnectorLengthR;
  }
  if (document.getElementById("flapConnectorLength")) {
    document.getElementById("flapConnectorLengthValue").innerHTML =
      module.flapConnectorLengthR;
    document.getElementById("flapConnectorLength").value =
      module.flapConnectorLengthR;
  }
  if (document.getElementById("pivotPoint")) {
    document.getElementById("pivotPointValue").innerHTML = module.pivotPoint;
    document.getElementById("pivotPoint").value = Math.round(module.pivotPoint);
  }
  if (document.getElementById("pivot2Point")) {
    document.getElementById("pivot2PointValue").innerHTML = module.pivot2Point;
    document.getElementById("pivot2Point").value = Math.round(
      module.pivot2Point
    );
  }
  if (document.getElementById("motorSpeed")) {
    document.getElementById("motorSpeedValue").innerHTML = module.motorSpeed;
    document.getElementById("motorSpeed").value = module.motorSpeed;
  }
  if (document.getElementById("beamWidth")) {
    document.getElementById("beamWidthValue").innerHTML = module.beamWidth;
    document.getElementById("beamWidth").value = module.beamWidth;
  }
  if (document.getElementById("flapBeamWidthL")) {
    document.getElementById("flapBeamWidthValueL").innerHTML =
      module.flapBeamWidthL;
    document.getElementById("flapBeamWidthL").value = module.flapBeamWidthL;
  }
  if (document.getElementById("flapBeamWidthR")) {
    document.getElementById("flapBeamWidthValueR").innerHTML =
      module.flapBeamWidthR;
    document.getElementById("flapBeamWidthR").value = module.flapBeamWidthR;
  }
  if (document.getElementById("flapBeamWidth")) {
    document.getElementById("flapBeamWidthValue").innerHTML =
      module.flapBeamWidthR;
    document.getElementById("flapBeamWidth").value = module.flapBeamWidthR;
  }
  if (document.getElementById("flapBeamHeightL")) {
    document.getElementById("flapBeamHeightValueL").innerHTML =
      module.flapBeamHeightL;
    document.getElementById("flapBeamHeightL").value = module.flapBeamHeightL;
  }
  if (document.getElementById("flapBeamHeightR")) {
    document.getElementById("flapBeamHeightValueR").innerHTML =
      module.flapBeamHeightR;
    document.getElementById("flapBeamHeightR").value = module.flapBeamHeightR;
  }
  if (document.getElementById("flapBeamHeight")) {
    document.getElementById("flapBeamHeightValue").innerHTML =
      module.flapBeamHeightR;
    document.getElementById("flapBeamHeight").value = module.flapBeamHeightR;
  }
  if (document.getElementById("flapBeamOffset")) {
    document.getElementById("flapBeamOffsetValue").innerHTML =
      module.flapBeamOffset;
    document.getElementById("flapBeamOffset").value = module.flapBeamOffset;
  }
  if (document.getElementById("spurBeamLength")) {
    document.getElementById("spurBeamLengthValue").innerHTML =
      module.spurBeamLength;
    document.getElementById("spurBeamLength").value = module.spurBeamLength;
  }
  if (document.getElementById("walking1Value")) {
    document.getElementById("walking1Value").innerHTML = linkageLength;
  }
  if (document.getElementById("walking2Value")) {
    document.getElementById("walking2Value").innerHTML = walkingVerticalValue;
  }
}

const redLineWidth = 8;
// When you slide the slider these function are called to make the constraints red
// Beam spacing
function horizontalInput(value) {
  if (document.getElementById("horizontalSpace")) {
    module.horizontalSpace = parseInt(value);
  }
  if (!flapModule) {
    compositeArray[0].constraints[1].render.lineWidth = redLineWidth;
    compositeArray[0].constraints[1].render.strokeStyle = "#FF3318";
  }
  if (mirrored && flipY) {
    if (openCloseMod) {
      compositeArray[
        compositeArray.length - 3
      ].constraints[1].render.lineWidth = redLineWidth;
      compositeArray[
        compositeArray.length - 3
      ].constraints[1].render.strokeStyle = "#FF3318";
    } else {
      compositeArray[
        compositeArray.length - 1
      ].constraints[1].render.lineWidth = redLineWidth;
      compositeArray[
        compositeArray.length - 1
      ].constraints[1].render.strokeStyle = "#FF3318";
    }
  }
}
// Vertical spacing between body and UI balls
function verticalInput(value) {
  if (document.getElementById("verticalSpace")) {
    module.verticalSpace = parseInt(value);
  }
  if (crankMod || crankModule) {
    for (joint of jointComposites) {
      if (
        joint.constraints[0].bodyA === compositeArray[0].bodies[0] &&
        joint.constraints[0].bodyB === compositeArray[1].bodies[0]
      ) {
        joint.constraints[0].render.lineWidth = redLineWidth;
        joint.constraints[0].render.strokeStyle = "#FF3318";
      } else if (
        joint.constraints[0].bodyA === compositeArray[1].bodies[0] &&
        joint.constraints[0].bodyB === compositeArray[0].bodies[0]
      ) {
        joint.constraints[0].render.lineWidth = redLineWidth;
        joint.constraints[0].render.strokeStyle = "#FF3318";
      }
    }
  } else if (!flapModule) {
    compositeArray[0].constraints[2].render.lineWidth = redLineWidth;
    compositeArray[0].constraints[2].render.strokeStyle = "#FF3318";
    if (mirrored && flipY) {
      if (openCloseMod) {
        compositeArray[
          compositeArray.length - 3
        ].constraints[2].render.lineWidth = redLineWidth;
        compositeArray[
          compositeArray.length - 3
        ].constraints[2].render.strokeStyle = "#FF3318";
      } else {
        compositeArray[
          compositeArray.length - 1
        ].constraints[2].render.lineWidth = redLineWidth;
        compositeArray[
          compositeArray.length - 1
        ].constraints[2].render.strokeStyle = "#FF3318";
      }
    }
  }
}
// linkage length
function connectorInput(value) {
  if (document.getElementById("connectorLength")) {
    module.connectorLength = parseInt(value);
  }
  jointComposites[jointComposites.length - 1].constraints[0].render.lineWidth =
    redLineWidth;
  jointComposites[
    jointComposites.length - 1
  ].constraints[0].render.strokeStyle = "#FF3318";
  jointComposites[jointComposites.length - 2].constraints[0].render.lineWidth =
    redLineWidth;
  jointComposites[
    jointComposites.length - 2
  ].constraints[0].render.strokeStyle = "#FF3318";
  if (mirrored && flipY) {
    jointComposites[
      jointComposites.length - 3
    ].constraints[0].render.lineWidth = redLineWidth;
    jointComposites[
      jointComposites.length - 3
    ].constraints[0].render.strokeStyle = "#FF3318";
    jointComposites[
      jointComposites.length - 4
    ].constraints[0].render.lineWidth = redLineWidth;
    jointComposites[
      jointComposites.length - 4
    ].constraints[0].render.strokeStyle = "#FF3318";
  }
}
function flapConnectorInput(value) {
  flapConnectorInputL(value);
  flapConnectorInputR(value);
}
function flapConnectorInputL(value) {
  if (document.getElementById("flapConnectorLengthL")) {
    module.flapConnectorLengthL = parseInt(value);
  }
  jointComposites[jointComposites.length - 2].constraints[0].render.lineWidth =
    redLineWidth;
  jointComposites[
    jointComposites.length - 2
  ].constraints[0].render.strokeStyle = "#FF3318";
}
function flapConnectorInputR(value) {
  if (document.getElementById("flapConnectorLengthR")) {
    module.flapConnectorLengthR = parseInt(value);
  }
  jointComposites[jointComposites.length - 1].constraints[0].render.lineWidth =
    redLineWidth;
  jointComposites[
    jointComposites.length - 1
  ].constraints[0].render.strokeStyle = "#FF3318";
}
// horizontal pivot point on beam
function pivotInput(value) {
  if (document.getElementById("pivotPoint")) {
    if (compositeArray[2]) {
      if (flapModule) {
        module.pivotPoint = Math.round(value);
      } else {
        module.pivotPoint = Math.round(value);
      }
    }
  }
}
// ignore this function for now //
function pivot2Input(value) {
  if (document.getElementById("pivot2Point")) {
    if (!openCloseMod) {
      module.pivot2Point = Math.round(value);
      if (crankMod) {
        jointComposites[
          jointComposites.length - 1
        ].constraints[0].render.lineWidth = redLineWidth;
        jointComposites[
          jointComposites.length - 1
        ].constraints[0].render.strokeStyle = "#FF3318";
      } else {
        compositeArray[0].constraints[1].render.lineWidth = redLineWidth;
        compositeArray[0].constraints[1].render.strokeStyle = "#FF3318";
      }
    } else {
      module.pivot2Point = Math.round(value);
      compositeArray[0].constraints[2].render.lineWidth = redLineWidth;
      compositeArray[0].constraints[2].render.strokeStyle = "#FF3318";
    }
  }
}
///////////////////////////////////

// input function for motor speed
function speedInput(value) {
  if (document.getElementById("motorSpeed")) {
    module.motorSpeed = parseInt(value);
  }
}
// width of rectangle beams
function beamWidthInput(value) {
  if (document.getElementById("beamWidth")) {
    module.beamWidth = parseInt(value);
    if (flapModule) {
      compositeArray[2].bodies[0].parts[1].render.strokeStyle = "#FF3318";
      compositeArray[3].bodies[0].parts[1].render.strokeStyle = "#FF3318";
      compositeArray[2].bodies[0].parts[1].render.lineWidth = 4;
      compositeArray[3].bodies[0].parts[1].render.lineWidth = 4;
    } else {
      compositeArray[2].bodies[0].render.lineWidth = 3;
      compositeArray[2].bodies[0].render.strokeStyle = "#FF3318";
      compositeArray[3].bodies[0].render.lineWidth = 3;
      compositeArray[3].bodies[0].render.strokeStyle = "#FF3318";
    }
  }
}
function flapBeamWidthInputL(value) {
  if (document.getElementById("flapBeamWidthL")) {
    module.flapBeamWidthL = parseInt(value);
    compositeArray[3].bodies[0].parts[1].render.strokeStyle = "#FF3318";
    compositeArray[3].bodies[0].parts[1].render.lineWidth = 4;
  }
}
function flapBeamWidthInputR(value) {
  if (document.getElementById("flapBeamWidthR")) {
    module.flapBeamWidthR = parseInt(value);
    compositeArray[2].bodies[0].parts[1].render.strokeStyle = "#FF3318";
    compositeArray[2].bodies[0].parts[1].render.lineWidth = 4;
  }
}
function flapBeamWidthInput(value) {
  flapBeamWidthInputR(value);
  flapBeamWidthInputL(value);
}
function flapHeightInputL(value) {
  module.flapBeamHeightL = parseInt(value);
  compositeArray[3].bodies[0].parts[2].render.strokeStyle = "#FF3318";
  compositeArray[3].bodies[0].parts[2].render.lineWidth = 4;
}
function flapHeightInputR(value) {
  module.flapBeamHeightR = parseInt(value);
  compositeArray[2].bodies[0].parts[2].render.strokeStyle = "#FF3318";
  compositeArray[2].bodies[0].parts[2].render.lineWidth = 4;
}
function flapHeightInput(value) {
  flapHeightInputR(value);
  flapHeightInputL(value);
}
function flapOffsetInput(value) {
  module.flapBeamOffset = parseInt(value);
  for (let j = 1; j < 3; j++) {
    compositeArray[2].bodies[0].parts[j].render.strokeStyle = "#FF3318";
    compositeArray[3].bodies[0].parts[j].render.strokeStyle = "#FF3318";
    compositeArray[2].bodies[0].parts[j].render.lineWidth = 4;
    compositeArray[3].bodies[0].parts[j].render.lineWidth = 4;
  }
}
function spurBeamLengthInput(value) {
  module.spurBeamLength = parseInt(value);
}

function changeSpurBeamLength() {
  removeComposite(compositeArray[3].bodies[0]);
  addRotateRect(
    150 + module.spurBeamLength,
    10,
    compositeArray[2].constraints[0].pointA.x,
    compositeArray[2].constraints[0].pointA.y
  );
}

// display motor angle for debugging
function motorAngle(angle) {
  angleEl = document.getElementById("motorAngleValue");
  let rotAngle = 0;
  let degreeAngle = 0;
  if (angleEl) {
    rotationNumber = Math.floor(angle / (2 * Math.PI));
    rotAngle = angle - 2 * Math.PI * rotationNumber;
    degreeAngle = Math.round(rotAngle * (180 / Math.PI));
    angleEl.innerHTML = degreeAngle;
  }
}
function changeSymetrical() {
  symetrical = true;
  $(".left").hide();
  $(".right").hide();
  $(".nonSym").hide();
}
function changeNonSymetrical() {
  symetrical = false;
  $(".nonSym").show();
  $(".right").hide();
}
/////////////// SLIDER FUNCTIONS /////////////////////
// functions that are called when you release the slider

// linkage length
function constraintLength(value) {
  // change c value so that the distance calculated between beam and object is different
  // c is used in the beforeUpdate function in the individual module js files
  c = parseInt(value);
  // change back constraint colors to original gray
  if (
    jointComposites[jointComposites.length - 1] &&
    jointComposites[jointComposites.length - 2]
  ) {
    jointComposites[
      jointComposites.length - 1
    ].constraints[0].render.lineWidth = 2;
    jointComposites[
      jointComposites.length - 1
    ].constraints[0].render.strokeStyle = "#666";
    jointComposites[
      jointComposites.length - 2
    ].constraints[0].render.lineWidth = 2;
    jointComposites[
      jointComposites.length - 2
    ].constraints[0].render.strokeStyle = "#666";
  }
  if (mirrored && flipY) {
    jointComposites[
      jointComposites.length - 3
    ].constraints[0].render.lineWidth = 2;
    jointComposites[
      jointComposites.length - 3
    ].constraints[0].render.strokeStyle = "#666";
    jointComposites[
      jointComposites.length - 4
    ].constraints[0].render.lineWidth = 2;
    jointComposites[
      jointComposites.length - 4
    ].constraints[0].render.strokeStyle = "#666";
  }
}
var c2 = 0;
function flapConstraintLengthL(value) {
  // change c value so that the distance calculated between beam and object is different
  // c is used in the beforeUpdate function in the individual module js files
  c = parseInt(value);
  jointComposites[
    jointComposites.length - 2
  ].constraints[0].render.lineWidth = 2;
  jointComposites[
    jointComposites.length - 2
  ].constraints[0].render.strokeStyle = "#666";
}
function flapConstraintLengthR(value) {
  // change c value so that the distance calculated between beam and object is different
  // c is used in the beforeUpdate function in the individual module js files
  c2 = -parseInt(value);
  jointComposites[
    jointComposites.length - 1
  ].constraints[0].render.lineWidth = 2;
  jointComposites[
    jointComposites.length - 1
  ].constraints[0].render.strokeStyle = "#666";
}
function flapConstraintLength(value) {
  flapConstraintLengthL(value);
  flapConstraintLengthR(value);
}
let beamWidthChange = 0;
// change beam width
function beamWidth(value) {
  if (compositeArray[2] && compositeArray[3]) {
    // set angle to 0 before modifying
    Body.setAngle(compositeArray[2].bodies[0], 0);
    Body.setAngle(compositeArray[3].bodies[0], 0);
    if (!flapModule) {
      // delete the constraints
      deleteConstraint(
        compositeArray[2].bodies[0],
        compositeArray[0].bodies[0]
      );
      deleteConstraint(
        compositeArray[3].bodies[0],
        compositeArray[0].bodies[0]
      );
      // move vertices horizonatally to extend or shorten beam
      compositeArray[2].bodies[0].vertices[0].x =
        compositeArray[2].bodies[0].position.x - 150 - value;
      compositeArray[2].bodies[0].vertices[3].x =
        compositeArray[2].bodies[0].position.x - 150 - value;
      compositeArray[3].bodies[0].vertices[0].x =
        compositeArray[3].bodies[0].position.x + 150 + parseInt(value);
      compositeArray[3].bodies[0].vertices[3].x =
        compositeArray[3].bodies[0].position.x + 150 + parseInt(value);
      // add constraints back to resized beam
      createConstraintFake2(
        compositeArray[0].bodies[0],
        compositeArray[2].bodies[0],
        parseInt(value),
        originalWidth1
      );
      createConstraintFake2(
        compositeArray[0].bodies[0],
        compositeArray[3].bodies[0],
        -parseInt(value),
        originalWidth2
      );
      if (mirrored && flipY) {
        Body.setAngle(compositeArray[compositeArray.length - 1].bodies[0], 0);
        Body.setAngle(compositeArray[compositeArray.length - 2].bodies[0], 0);
        deleteConstraint(
          compositeArray[compositeArray.length - 1].bodies[0],
          compositeArray[compositeArray.length - 3].bodies[0]
        );
        deleteConstraint(
          compositeArray[compositeArray.length - 2].bodies[0],
          compositeArray[compositeArray.length - 3].bodies[0]
        );
        compositeArray[compositeArray.length - 1].bodies[0].vertices[0].x =
          compositeArray[compositeArray.length - 1].bodies[0].position.x +
          150 +
          parseInt(value);
        compositeArray[compositeArray.length - 1].bodies[0].vertices[3].x =
          compositeArray[compositeArray.length - 1].bodies[0].position.x +
          150 +
          parseInt(value);
        compositeArray[compositeArray.length - 2].bodies[0].vertices[0].x =
          compositeArray[compositeArray.length - 2].bodies[0].position.x -
          150 -
          parseInt(value);
        compositeArray[compositeArray.length - 2].bodies[0].vertices[3].x =
          compositeArray[compositeArray.length - 2].bodies[0].position.x -
          150 -
          parseInt(value);
        compositeArray[compositeArray.length - 2].width =
          originalWidth1 + parseInt(value);
        compositeArray[compositeArray.length - 1].width =
          originalWidth2 + -parseInt(value);
        createConstraintFake2(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 2].bodies[0],
          parseInt(value),
          originalWidth1
        );
        createConstraintFake2(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 1].bodies[0],
          -parseInt(value),
          originalWidth2
        );
      }
    } else {
      Body.setAngle(compositeArray[0].bodies[0], 0);
      Body.setAngle(compositeArray[1].bodies[0], 0);
      deleteConstraint(
        compositeArray[2].bodies[0],
        compositeArray[1].bodies[0]
      );
      deleteConstraint(
        compositeArray[3].bodies[0],
        compositeArray[0].bodies[0]
      );
      compositeArray[2].bodies[0].vertices[0].x =
        compositeArray[2].bodies[0].position.x + 150 + parseInt(value);
      compositeArray[2].bodies[0].vertices[3].x =
        compositeArray[2].bodies[0].position.x + 150 + parseInt(value);
      compositeArray[3].bodies[0].vertices[0].x =
        compositeArray[3].bodies[0].position.x - 150 - parseInt(value);
      compositeArray[3].bodies[0].vertices[3].x =
        compositeArray[3].bodies[0].position.x - 150 - parseInt(value);
      createConstraintFake2(
        compositeArray[1].bodies[0],
        compositeArray[2].bodies[0],
        -parseInt(value),
        originalWidth1
      );
      createConstraintFake2(
        compositeArray[0].bodies[0],
        compositeArray[3].bodies[0],
        parseInt(value),
        originalWidth2
      );
    }
    // change width definition of beam
    compositeArray[2].width = originalWidth1 + parseInt(value);
    compositeArray[3].width = originalWidth2 + -parseInt(value);
    if (mirrored && flipY) {
      compositeArray[compositeArray.length - 2].width =
        originalWidth1 + parseInt(value);
      compositeArray[compositeArray.length - 1].width =
        originalWidth2 + -parseInt(value);
    }
    // new beam width value for purposes of other functions
    newWidth1 = compositeArray[2].width;
    newWidth2 = compositeArray[3].width;
    beamWidthChange = parseInt(value);
    // change back the colors to original
    compositeArray[2].bodies[0].render.fillStyle = "#cccccc";
    compositeArray[2].bodies[0].render.strokeStyle = "#000";
    compositeArray[2].bodies[0].render.lineWidth = 2;
    compositeArray[3].bodies[0].render.fillStyle = "#cccccc";
    compositeArray[3].bodies[0].render.strokeStyle = "#000";
    compositeArray[3].bodies[0].render.lineWidth = 2;
  }
}
function flapBeamWidthR(value) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) + (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightR,
    module.flapBeamOffset + 50,
    module.flapBeamWidthR + 300
  );
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) - (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightL,
    -(module.flapBeamOffset + 50),
    -(module.flapBeamWidthL + 300)
  );
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
  flapBeamSpaceUpdate();
  flapVerticalSpace();
}
function flapBeamWidthL(value) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) + (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightR,
    module.flapBeamOffset + 50,
    module.flapBeamWidthR + 300
  );
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) - (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightL,
    -(module.flapBeamOffset + 50),
    -(module.flapBeamWidthL + 300)
  );
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
  flapBeamSpaceUpdate();
  flapVerticalSpace();
}
function flapBeamWidth(value) {
  flapBeamWidthR(value);
  flapBeamWidthL(value);
}
function flapBeamHeightR(value) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) + (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightR,
    module.flapBeamOffset + 50,
    module.flapBeamWidthR + 300
  );
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) - (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightL,
    -(module.flapBeamOffset + 50),
    -(module.flapBeamWidthL + 300)
  );
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
  flapBeamSpaceUpdate();
  flapVerticalSpace();
}
function flapBeamHeightL(value) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) + (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightR,
    module.flapBeamOffset + 50,
    module.flapBeamWidthR + 300
  );
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) - (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeightL,
    -(module.flapBeamOffset + 50),
    -(module.flapBeamWidthL + 300)
  );
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
  flapBeamSpaceUpdate();
  flapVerticalSpace();
}
function flapBeamHeight(value) {
  flapBeamHeightR(value);
  flapBeamHeightL(value);
}
function flapBeamOffset(value) {
  deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0]);
  deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  removeComposite(compositeArray[2].bodies[0]);
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) + (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeight,
    module.flapBeamOffset + 50,
    module.beamWidth + 300
  );
  addFlapRectComposite(
    window.innerWidth * (0.75 * 0.5) - (300 / 2 + 60),
    compositeArray[0].constraints[0].pointA.y - rectBase - 87,
    7,
    150 + module.flapBeamHeight,
    -(module.flapBeamOffset + 50),
    -(module.beamWidth + 300)
  );
  createConstraint(compositeArray[0].bodies[0], compositeArray[3].bodies[0]);
  createConstraint3(compositeArray[1].bodies[0], compositeArray[2].bodies[0]);
  flapBeamSpaceUpdate();
}
function flapBeamSpaceUpdate() {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  compositeArray[2].constraints[0].pointA.x =
    window.innerWidth * (0.75 * 0.5) + (module.horizontalSpace + 100) / 2;
  compositeArray[3].constraints[0].pointA.x =
    window.innerWidth * (0.75 * 0.5) - (module.horizontalSpace + 100) / 2;
}
function flapVerticalSpace(value) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  var change =
    module.verticalSpace +
    150 -
    (compositeArray[0].constraints[0].pointA.y -
      compositeArray[2].constraints[0].pointA.y);
  console.log(change);
  compositeArray[2].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - (module.verticalSpace + 150);
  compositeArray[3].constraints[0].pointA.y =
    compositeArray[0].constraints[0].pointA.y - (module.verticalSpace + 150);
}
pivot2Value = 50;
let changePivot2Height;
let prevPivot2Value = 0;
// SKIP FOR NOW
function pivot3Height(value) {
  if (!openCloseMod) {
    pivot2Value = 50 + parseInt(value);
    compositeArray[0].constraints[1].render.lineWidth = 2;
    compositeArray[0].constraints[1].render.strokeStyle = "#666";
  } else {
    changePivot2Height = parseInt(value) - prevPivot2Value;
    pivot2Value = 50 + parseInt(value);
    compositeArray[0].constraints[2].render.lineWidth = 2;
    compositeArray[0].constraints[2].render.strokeStyle = "#666";
    prevPivot2Value = parseInt(value);
  }
}
// stop the motor when you press the pause button
function pause() {
  module.motorSpeed = 0;
}

function updateToothWidth() {
  if (radius === 80) {
    toothWidthDegree = 2;
    toothWidth = toothWidthDegree / conversionFactor;
  } else if (radius === 64) {
    toothWidthDegree = 3;
    toothWidth = toothWidthDegree / conversionFactor;
  } else if (radius === 48) {
    toothWidthDegree = 4;
    toothWidth = toothWidthDegree / conversionFactor;
  }
}
///////////////////////////////////////////

//////////////////// FRAME UPDATE /////////////////////////////////////
// runs every frame updating physics and view before frame is rendered
Events.on(engine, "beforeUpdate", function (event) {
  // console.log(compositeArray[1].bodies[0].angle)
  updateSliders();
  updateToothWidth();
  // functions that need to be called every frame on each body in the world
  // loop through all composites in the world and perform different action on them based
  // off unique characteristics
  for (let i = 0; i < compositeArray.length; i++) {
    // if inside bodies[1] if statement this deals with UI Balls
    if (flapModule) {
      if (compositeArray[2] && compositeArray[3]) {
        compositeArray[2].bodies[0].collisionFilter.mask = otherCategory;
        compositeArray[3].bodies[0].collisionFilter.mask = otherCategory;
      }
    }
    if (walkingModule) {
      if (compositeArray[1] && compositeArray[2]) {
        compositeArray[1].bodies[0].collisionFilter.mask = otherCategory;
        compositeArray[2].bodies[0].collisionFilter.mask = otherCategory;
      }
      // compositeArray[3].bodies[0].collisionFilter.mask = otherCategory
    }
    if (compositeArray[i].bodies[1]) {
      compositeArray[i].bodies[1].collisionFilter.mask = otherCategory;
      if (compositeArray[i].bodies[2]) {
        compositeArray[i].bodies[2].collisionFilter.mask = otherCategory;
      }
      // if it has ui ball and is linear gear then change the location of the ball/s in certain way
      if (compositeArray[i].shape === "linGear") {
        if (i === 0) {
          // if there are 2 constraints in the world then the x value must be offset
          if (
            jointComposites[jointComposites.length - 2] &&
            jointComposites[jointComposites.length - 2].constraints[0].pointA !=
              null
          ) {
            Body.setPosition(compositeArray[i].bodies[1], {
              x:
                compositeArray[i].bodies[0].position.x +
                parseInt(prevSpaceValue),
              y: compositeArray[i].bodies[0].position.y - 200 - prevPivotValue,
            });
            if (compositeArray[i].bodies[2]) {
              Body.setPosition(compositeArray[i].bodies[2], {
                x:
                  compositeArray[i].bodies[0].position.x -
                  parseInt(prevSpaceValue),
                y:
                  compositeArray[i].bodies[0].position.y - 200 - prevPivotValue,
              });
            }
          } else {
            Body.setPosition(compositeArray[i].bodies[1], {
              x: compositeArray[i].bodies[0].position.x,
              y: compositeArray[i].bodies[0].position.y - 200 - pivot2Value,
            });
          }
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.x = compositeArray[i].bodies[0].position.x;
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.y = compositeArray[i].bodies[1].position.y;
        }
        // if there are no constraints in the world ie. upDown module then x position can be same as body
        else {
          if (
            jointComposites[jointComposites.length - 2] &&
            jointComposites[jointComposites.length - 2].constraints[0].pointA !=
              null
          ) {
            Body.setPosition(compositeArray[i].bodies[1], {
              x:
                compositeArray[i].bodies[0].position.x -
                parseInt(prevSpaceValue),
              y:
                compositeArray[i].bodies[0].position.y +
                200 +
                parseInt(prevPivotValue),
            });
            if (compositeArray[i].bodies[2]) {
              Body.setPosition(compositeArray[i].bodies[2], {
                x:
                  compositeArray[i].bodies[0].position.x +
                  parseInt(prevSpaceValue),
                y:
                  compositeArray[i].bodies[0].position.y +
                  200 +
                  parseInt(prevPivotValue),
              });
              console.log(prevSpaceValue);
            }
          } else {
            Body.setPosition(compositeArray[i].bodies[1], {
              x: compositeArray[i].bodies[0].position.x,
              y:
                compositeArray[i].bodies[0].position.y +
                200 +
                parseInt(pivot2Value),
            });
          }
          // update individual ball constraint locations
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.x = compositeArray[i].bodies[0].position.x;
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.y = compositeArray[i].bodies[1].position.y;
        }
      }
      // see comments for if shape is linGear
      else if (compositeArray[i].shape === "linRect") {
        if (i === 0) {
          if (
            jointComposites[jointComposites.length - 2] &&
            jointComposites[jointComposites.length - 2].constraints[0].pointA !=
              null
          ) {
            Body.setPosition(compositeArray[i].bodies[1], {
              x:
                compositeArray[i].bodies[0].position.x +
                jointComposites[jointComposites.length - 2].constraints[0]
                  .pointA.x,
              y:
                compositeArray[i].bodies[0].position.y -
                compositeArray[i].height / 2 -
                prevPivotValue,
            });
            if (compositeArray[i].bodies[2]) {
              Body.setPosition(compositeArray[i].bodies[2], {
                x:
                  compositeArray[i].bodies[0].position.x +
                  jointComposites[jointComposites.length - 1].constraints[0]
                    .pointA.x,
                y:
                  compositeArray[i].bodies[0].position.y -
                  compositeArray[i].height / 2 -
                  prevPivotValue,
              });
            }
          } else {
            Body.setPosition(compositeArray[i].bodies[1], {
              x: compositeArray[i].bodies[0].position.x,
              y:
                compositeArray[i].bodies[0].position.y -
                compositeArray[i].height / 2 -
                pivot2Value,
            });
          }
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.x = compositeArray[i].bodies[0].position.x;
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.y = compositeArray[i].bodies[1].position.y;
        } else {
          if (
            jointComposites[jointComposites.length - 2] &&
            jointComposites[jointComposites.length - 2].constraints[0].pointA !=
              null
          ) {
            Body.setPosition(compositeArray[i].bodies[1], {
              x:
                compositeArray[i].bodies[0].position.x -
                parseInt(prevSpaceValue),
              y:
                compositeArray[i].bodies[0].position.y +
                compositeArray[i].height / 2 +
                parseInt(prevPivotValue),
            });
            if (compositeArray[i].bodies[2]) {
              Body.setPosition(compositeArray[i].bodies[2], {
                x:
                  compositeArray[i].bodies[0].position.x +
                  parseInt(prevSpaceValue),
                y:
                  compositeArray[i].bodies[0].position.y +
                  compositeArray[i].height / 2 +
                  parseInt(prevPivotValue),
              });
            }
          } else {
            Body.setPosition(compositeArray[i].bodies[1], {
              x: compositeArray[i].bodies[0].position.x,
              y:
                compositeArray[i].bodies[0].position.y +
                compositeArray[i].height / 2 +
                parseInt(pivot2Value),
            });
          }
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.x = compositeArray[i].bodies[0].position.x;
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.y = compositeArray[i].bodies[1].position.y;
        }
      }
      // see comments for if shape is linGear
      else if (compositeArray[i].shape === "circle") {
        if (i === 0) {
          if (
            jointComposites[jointComposites.length - 2] &&
            jointComposites[jointComposites.length - 2].constraints[0].pointA !=
              null
          ) {
            Body.setPosition(compositeArray[i].bodies[1], {
              x:
                compositeArray[i].bodies[0].position.x +
                jointComposites[jointComposites.length - 2].constraints[0]
                  .pointA.x,
              y: compositeArray[i].bodies[0].position.y - parseInt(pivot2Value),
            });
            if (compositeArray[i].bodies[2]) {
              Body.setPosition(compositeArray[i].bodies[2], {
                x:
                  compositeArray[i].bodies[0].position.x +
                  jointComposites[jointComposites.length - 1].constraints[0]
                    .pointA.x,
                y:
                  compositeArray[i].bodies[0].position.y -
                  parseInt(pivot2Value),
              });
            }
          } else {
            if (!openCloseMod) {
              Body.setPosition(compositeArray[i].bodies[1], {
                x: compositeArray[i].bodies[0].position.x,
                y:
                  compositeArray[i].bodies[0].position.y -
                  parseInt(pivot2Value),
              });
            } else {
              Body.setPosition(compositeArray[i].bodies[1], {
                x:
                  compositeArray[i].bodies[0].position.x -
                  parseInt(prevSpaceValue),
                y:
                  compositeArray[i].bodies[0].position.y -
                  parseInt(pivot2Value),
              });
              if (compositeArray[i].bodies[2]) {
                Body.setPosition(compositeArray[i].bodies[2], {
                  x:
                    compositeArray[i].bodies[0].position.x +
                    parseInt(prevSpaceValue),
                  y:
                    compositeArray[i].bodies[0].position.y -
                    parseInt(pivot2Value),
                });
              }
            }
          }
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.x = compositeArray[i].bodies[0].position.x;
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.y = compositeArray[i].bodies[1].position.y;
        } else {
          Body.setPosition(compositeArray[i].bodies[1], {
            x:
              compositeArray[i].bodies[0].position.x - parseInt(prevSpaceValue),
            y:
              compositeArray[i].bodies[0].position.y + parseInt(prevPivotValue),
          });
          if (compositeArray[i].bodies[2]) {
            Body.setPosition(compositeArray[i].bodies[2], {
              x:
                compositeArray[i].bodies[0].position.x +
                parseInt(prevSpaceValue),
              y:
                compositeArray[i].bodies[0].position.y +
                parseInt(prevPivotValue),
            });
            console.log(prevSpaceValue);
          }
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.x = compositeArray[i].bodies[0].position.x;
          compositeArray[i].constraints[
            compositeArray[i].constraints.length - 1
          ].pointA.y = compositeArray[i].bodies[1].position.y;
        }
      }
      // for flapping module IGNORE FOR NOW
      else {
        Body.setPosition(compositeArray[i].bodies[1], {
          x: compositeArray[i].constraints[0].pointA.x,
          y: compositeArray[i].bodies[0].position.y,
        });
        Body.setAngle(
          compositeArray[i].bodies[1],
          compositeArray[i].bodies[0].angle
        );
        if (compositeArray[i].radius === 80) {
          if (compositeArray[i].isMotor && compositeArray[i].realMotor) {
            compositeArray[i].bodies[1].render.sprite.texture =
              "./img/gear_m_large.png";
          } else {
            compositeArray[i].bodies[1].render.sprite.texture =
              "./img/gear_nm_large.png";
          }
        } else if (compositeArray[i].radius === 64) {
          if (compositeArray[i].isMotor && compositeArray[i].realMotor) {
            compositeArray[i].bodies[1].render.sprite.texture =
              "./img/gear_m_med.png";
          } else {
            compositeArray[i].bodies[1].render.sprite.texture =
              "./img/gear_nm_med.png";
          }
        } else if (compositeArray[i].radius === 48) {
          if (compositeArray[i].isMotor && compositeArray[i].realMotor) {
            compositeArray[i].bodies[1].render.sprite.texture =
              "./img/gear_m_small.png";
          } else {
            compositeArray[i].bodies[1].render.sprite.texture =
              "./img/gear_nm_small.png";
          }
        }
      }
    }
    // make all the constraints in the composites invisible
    if (compositeArray[i].constraints[0]) {
      compositeArray[i].constraints[0].render.visible = false;
    }

    // if lock is true then set the angle to whatever the rotation parameter for that body is
    if (compositeArray[i].lock === true) {
      if (compositeArray[i].shape === "gear") {
        Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
      }
      // as long as it doesnt have a constraint set the rectangle to rotation parameter
      if (compositeArray[i].shape === "rect") {
        if (compositeArray[i].hasConstraint === false) {
          Body.setAngle(
            compositeArray[i].bodies[0],
            compositeArray[i].rotation
          );
        }
      }
      // always set linear gear to have locked rotation
      if (compositeArray[i].shape === "linGear") {
        if (compositeArray[i].lock === true) {
          Body.setAngle(
            compositeArray[i].bodies[0],
            compositeArray[i].rotation
          );
        } else {
          compositeArray[i].lock = true;
        }
      }
      // always set linear rect to have locked rotation
      if (compositeArray[i].shape === "linRect") {
        if (compositeArray[i].lock === true) {
          Body.setAngle(
            compositeArray[i].bodies[0],
            compositeArray[i].rotation
          );
        } else {
          compositeArray[i].lock = true;
        }
      }
    }

    // if body is set as a motor
    if (compositeArray[i].isMotor === true) {
      if (i < 2) {
        motorAngle(compositeArray[i].bodies[0].angle);
      }
      // and if alternating is active
      if (compositeArray[i].alternate === true) {
        // if body angle is less than 0 change motor direction
        if (compositeArray[i].bodies[0].angle < 0) {
          Body.setAngle(compositeArray[i].bodies[0], 0);
          compositeArray[i].motorDir = 1;
        }
        // if body angle is greater than PI change motor direction
        if (compositeArray[i].bodies[0].angle > Math.PI) {
          Body.setAngle(compositeArray[i].bodies[0], Math.PI);
          compositeArray[i].motorDir = -1;
        }
      }
      // set rotational velocity of gear to the motor speed * motor direction of object
      Body.setAngularVelocity(
        compositeArray[i].bodies[0],
        compositeArray[i].motorSpeed * compositeArray[i].motorDir
      );
      if (paused) {
        compositeArray[i].motorSpeed = 0;
      } else {
        compositeArray[i].motorSpeed = module.motorSpeed / 1000;
      }
    }
  }
  // loop through all composites in the world and style them accordingly
  for (let i = 0; i < compositeArray.length; i++) {
    if (compositeArray[i].shape === "shell") {
      // console.log(compositeArray[i].radius)
      for (let j = 0; j < compositeArray[i].bodies[0].parts.length; j++) {
        if (compositeArray[i].radius === 80) {
          compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#bc98f9";
        } else if (compositeArray[i].radius === 64) {
          compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#4ECDC4";
        } else if (compositeArray[i].radius === 48) {
          compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#FF6B6B";
        }
      }
    }
    if (compositeArray[i].radius != 0 && !walkingModule) {
      for (let j = 0; j < compositeArray[i].bodies[0].parts.length; j++) {
        // give parts black stroke
        if (compositeArray[i].shape === "gear") {
          compositeArray[i].bodies[0].parts[j].render.strokeStyle = "#000000";
        }
        // give rects gray fill color
        if (
          compositeArray[i].shape === "rect" ||
          compositeArray[i].shape === "poly" ||
          compositeArray[i].shape === "flapRect"
        ) {
          compositeArray[i].bodies[0].parts[j].render.fillStyle = "#cccccc";
        }
        // if object size is small give it specific fill color and image sprite if applicable
        if (
          compositeArray[i].radius === 48 ||
          compositeArray[i].radius === 100
        ) {
          compositeArray[i].bodies[0].parts[j].render.fillStyle = "#FF6B6B";
          for (var k = 0; k < compositeArray.length; k++) {
            if (compositeArray[k].bodies[1]) {
              compositeArray[k].bodies[1].render.fillStyle = "#FF6B6B";
              if (compositeArray[k].bodies[2]) {
                compositeArray[k].bodies[2].render.fillStyle = "#FF6B6B";
              }
            }
            if (
              compositeArray[k].shape === "linGear" ||
              compositeArray[k].shape === "linRect"
            ) {
              for (
                var p = 0;
                p < compositeArray[k].bodies[0].parts.length;
                p++
              ) {
                compositeArray[k].bodies[0].parts[p].render.fillStyle =
                  "#8d2f2f";
                compositeArray[k].bodies[0].parts[p].render.strokeStyle =
                  "#8d2f2f";
              }
            }
            if (compositeArray[k].shape === "circle") {
              compositeArray[k].bodies[0].render.fillStyle = "#FF6B6B";
            }
            if (compositeArray[k].shape === "circleCrank") {
              compositeArray[k].bodies[0].render.sprite.texture =
                "./img/crank200px.png";
            }
          }
        }
        // if object size is medium give it specific fill color and image sprite if applicable
        else if (
          compositeArray[i].radius === 64 ||
          compositeArray[i].radius === 116
        ) {
          compositeArray[i].bodies[0].parts[j].render.fillStyle = "#4ECDC4";
          for (let k = 0; k < compositeArray.length; k++) {
            if (compositeArray[k].bodies[1]) {
              compositeArray[k].bodies[1].render.fillStyle = "#4ECDC4";
              if (compositeArray[k].bodies[2]) {
                compositeArray[k].bodies[2].render.fillStyle = "#4ECDC4";
              }
            }
            if (
              compositeArray[k].shape === "linGear" ||
              compositeArray[k].shape === "linRect"
            ) {
              for (
                let p = 0;
                p < compositeArray[k].bodies[0].parts.length;
                p++
              ) {
                compositeArray[k].bodies[0].parts[p].render.fillStyle =
                  "#15605b";
                compositeArray[k].bodies[0].parts[p].render.strokeStyle =
                  "#15605b";
              }
            }
            if (compositeArray[k].shape === "circle") {
              compositeArray[k].bodies[0].render.fillStyle = "#4ECDC4";
            }
            if (compositeArray[k].shape === "circleCrank") {
              compositeArray[k].bodies[0].render.sprite.texture =
                "./img/crank232px.png";
            }
          }
        }
        // if object size is large give it specific fill color and image sprite if applicable
        else if (
          compositeArray[i].radius === 80 ||
          compositeArray[i].radius === 132
        ) {
          compositeArray[i].bodies[0].parts[j].render.fillStyle = "#bc98f9";
          for (let k = 0; k < compositeArray.length; k++) {
            if (compositeArray[k].bodies[1]) {
              compositeArray[k].bodies[1].render.fillStyle = "#bc98f9";
              if (compositeArray[k].bodies[2]) {
                compositeArray[k].bodies[2].render.fillStyle = "#bc98f9";
              }
            }
            if (
              compositeArray[k].shape === "linGear" ||
              compositeArray[k].shape === "linRect"
            ) {
              for (
                let p = 0;
                p < compositeArray[k].bodies[0].parts.length;
                p++
              ) {
                compositeArray[k].bodies[0].parts[p].render.fillStyle =
                  "#7149b6";
                compositeArray[k].bodies[0].parts[p].render.strokeStyle =
                  "#7149b6";
              }
            }
            if (compositeArray[k].shape === "circle") {
              compositeArray[k].bodies[0].render.fillStyle = "#bc98f9";
            }
            if (compositeArray[k].shape === "circleCrank") {
              compositeArray[k].bodies[0].render.sprite.texture =
                "./img/crank264px.png";
            }
            if (compositeArray[k].shape === "gear") {
              compositeArray[k].bodies[0].parts[0].render.sprite.texture =
                "./img/crank264px.png";
            }
          }
        }
      }
    }
  }

  // Remove any sliders that are not relevant to the current motion or module
  // these functions can be found in the updateUI.js file
  if (flapModule === true) {
    updateFlapUI();
    sliderDisplay();
  } else {
    updateUI();
  }
  rotationUI();
  if (rackPinionModule || crankModule || camModule) {
    sliderDisplay();
  }
  if (upDownModule) {
    UDSliderDisplay();
  }
  if (rackPinionModule) {
    buttonDisable();
  }
  if (openCloseModule || upDownModule || camModule) {
    shellCam();
  }
  if (rotateModule) {
    updateRotateUI();
    updatePlanetaryUI();
  }
  if (spurModule) {
    updateFlapUI();
    updateRotateUI();
  }
  if (planetaryModule) {
    updatePlanetaryUI();
  }
});
// called every frame after physics is applied
// same as above
// consider same as 'beforeUpdate' function
Events.on(engine, "afterUpdate", function (event) {
  for (let i = 0; i < compositeArray.length; i++) {
    if (compositeArray[i].lock === true) {
      if (compositeArray[i].shape === "gear") {
        Body.setAngle(compositeArray[i].bodies[0], compositeArray[i].rotation);
      }
      if (compositeArray[i].shape === "rect") {
        if (compositeArray[i].hasConstraint === false) {
          Body.setAngle(
            compositeArray[i].bodies[0],
            compositeArray[i].rotation
          );
        }
      }
      if (
        compositeArray[i].shape === "linGear" ||
        compositeArray[i].shape === "linRect"
      ) {
        if (compositeArray[i].lock === true) {
          Body.setAngle(
            compositeArray[i].bodies[0],
            compositeArray[i].rotation
          );
        } else {
          compositeArray[i].lock = true;
        }
        if ((compositeArray[i].lock = true)) {
          Body.setPosition(compositeArray[i].bodies[0], {
            x: compositeArray[i].constraints[0].pointA.x,
            y: compositeArray[i].bodies[0].position.y,
          });
        }
      }
      if (compositeArray[i].shape === "circle") {
        compositeArray[i].bodies[0].position.x =
          compositeArray[i].constraints[0].pointA.x;
        if (compositeArray[i].lock === true) {
          Body.setAngle(
            compositeArray[i].bodies[0],
            compositeArray[i].rotation
          );
        }
      }
    }

    // if object is motor then give it an angular velocity to make it turn
    if (compositeArray[i].isMotor === true) {
      Body.setAngularVelocity(
        compositeArray[i].bodies[0],
        compositeArray[i].motorSpeed * compositeArray[i].motorDir
      );
    }
  }
  // settings for rotating continuous gear in Rack and Pinion mode
  if (upDownModule === true) {
    if (rackPinionMod === true) {
      if (compositeArray[1].alternate === false) {
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
  }
});
