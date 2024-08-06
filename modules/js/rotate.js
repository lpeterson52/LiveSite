// module/submodule indicator
rotateModule = true;
spurMod = true;
planetaryMod = false;
const kWindowWidth = 0.75 * 0.45;
const kWindowHeight = 0.65;
const kMotorSpeed = 0.051;
// change gear body when changing size when in rotating motion
function changeBodyRotate(index) {
    // remove ui motor sprite body
    if (compositeArray[index].bodies[1]) {
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    // remove gear body
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    // store constraint position values
    let tmpConstraintXPoint;
    if (index === 0) {
      tmpConstraintXPoint =
        window.innerWidth * kWindowWidth - (radius + toothHeight * 0.6);
    } else if (index === 1) {
      tmpConstraintXPoint =
        window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6);
      compositeArray[2].constraints[0].pointA.x =
        window.innerWidth * kWindowWidth +
        (compositeArray[1].radius + toothHeight * 0.6) * 2 +
        (compositeArray[2].radius + toothHeight * 0.6);
    } else {
      tmpConstraintXPoint =
        window.innerWidth * kWindowWidth +
        (compositeArray[1].radius + toothHeight * 0.6) * 2 +
        (compositeArray[2].radius + toothHeight * 0.6);
    }
    const tmpConstraintYPoint = window.innerHeight * kWindowHeight;
    // remove constraints
    Composite.remove(
      compositeArray[index],
      compositeArray[index].constraints[0]
    );
    // reset vertex array for drawing new gear
    verts2 = [];
    // draw the new gear
    drawGear();
    // add new drawn gear to composite
    Composite.add(
      compositeArray[index],
      Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
    );
    // add ui motor body for sprite
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
    compositeArray[index].radius = radius;
    for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
}
// change gear body when changing size when in planetary mechanism
// see changeBodyRotate
function changeBodyPlanetary(index) {
    if (compositeArray[index].bodies[1]) {
      Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
    }
    Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
    const tmpConstraintXPoint = compositeArray[0].constraints[0].pointA.x;;
    const tmpConstraintYPoint = compositeArray[0].constraints[0].pointA.y;
    Composite.remove(
      compositeArray[index],
      compositeArray[index].constraints[0]
    );
    verts2 = [];
    drawGear();
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
    for (let j = 0; j < compositeArray[index].bodies[0].parts.length; j++) {
      compositeArray[index].bodies[0].parts[j].render.strokeStyle = "#000000";
    }
  Body.setPosition(compositeArray[1].bodies[0], {
    x:
      window.innerWidth * kWindowWidth -
      (compositeArray[1].radius + toothHeight * 0.6),
    y: window.innerHeight * kWindowHeight,
  });
  Composite.remove(compositeArray[1], compositeArray[1].constraints[0]);
  Body.setPosition(compositeArray[1].bodies[0], {
    x:
      compositeArray[0].constraints[0].pointA.x -
      compositeArray[0].radius -
      compositeArray[1].radius -
      toothHeight * 0.6 * 2,
    y: window.innerHeight * kWindowHeight,
  });
  Composite.add(
    compositeArray[1],
    Constraint.create({
      pointA: {
        x: compositeArray[0].constraints[0].pointA.x,
        y: compositeArray[0].constraints[0].pointA.y,
      },
      bodyB: compositeArray[1].bodies[0],
      stiffness: 1,
    })
  );
}
// create new composite with gear and constraints
function addPlanetaryGearComposite(centerX, centerY, constraintX, constraintY) {
  if (radius === 80) {
    toothWidthDegree = 2;
  } else if (radius === 64) {
    toothWidthDegree = 3;
  } else if (radius === 48) {
    toothWidthDegree = 4;
  }
  toothWidth = toothWidthDegree / conversionFactor;
  verts2 = [];
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
      pointA: {
        x: compositeArray[0].constraints[0].pointA.x,
        y: compositeArray[0].constraints[0].pointA.y,
      },
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
  compositeArray[1].isMotor = true;
  compositeArray[1].motorSpeed = kMotorSpeed;
  compositeArray[1].motorDir = -1;
}
//////////////////////////////////////CHANGE GEAR SIZE//////////////////////////////////////
const kSteps = 0.5;
function changeGear1(rad) {
  // reset angle
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // set new radius
  radius = rad;
  compositeArray[0].radius = radius;
  // set new steps
  steps = radius * kSteps;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  // change the gear body
  changeBodyRotate(0);
}
// see smallGear1()
function changeGear2(rad) {   
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[1].radius = radius;
  steps = radius * kSteps;
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
// see smallGear1()
function changeGear3(rad) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[2].radius = radius;
  steps = radius * kSteps;
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
// see smallGear1()
function changeRotatingGear(rad) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[1].radius = radius;
  steps = radius * kSteps;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  removeComposite(compositeArray[1].bodies[0]);
  addPlanetaryGearComposite(
    compositeArray[0].constraints[0].pointA.x -
      compositeArray[0].radius -
      radius -
      toothHeight * 0.6 * 2,
    window.innerHeight * kWindowHeight,
    compositeArray[0].constraints[0].pointA.x,
    compositeArray[0].constraints[0].pointA.y
  );
}
// see smallGear1()
function changeStaticGear(rad) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[0].radius = radius;
  steps = radius * kSteps;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  changeBodyPlanetary(0);
}
///////////////////////////////////////////////////////////////////////////////////
// set motor as left or right gear
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
// switch mechanism when dropdown changes
function changeMech() {
  const string = document.getElementById("changeMech").value;
  if (string === "spur") {
    // change submodule indicator
    planetaryMod = false;
    spurMod = true;
    // remove whole composite
    // gear1Radius = compositeArray[1].radius
    // gear2Radius = compositeArray[0].radius
    removeComposite(compositeArray[0].bodies[0]);
    removeComposite(compositeArray[0].bodies[0]);
    if (compositeArray[1]) {
      removeComposite(compositeArray[0].bodies[0]);
      removeComposite(compositeArray[0].bodies[0]);
    }
    // add new gear composites
    // radius = gear1Radius
    // steps = (0.25 * radius)*2;
    addGearComposite(
      window.innerWidth * kWindowWidth - (radius + toothHeight * 0.6),
      window.innerHeight * kWindowHeight
    );
    // radius = gear2Radius
    // steps = (0.25 * radius)*2;
    addGearComposite(
      window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6),
      window.innerHeight * kWindowHeight
    );
    // radius = 80
    // steps = (0.25 * radius)*2;
    // addGearComposite((window.innerWidth)*(0.75*0.45)+((compositeArray[0].radius + (toothHeight*1)) + (compositeArray[1].radius + (toothHeight*1)) + (radius+(toothHeight*1))), (window.innerHeight)*(kWindowHeight));
    addGearComposite(
      window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6) * 3,
      window.innerHeight * kWindowHeight
    );
    // add rotating beam
    addRotateRect(
      150,
      10,
      compositeArray[2].constraints[0].pointA.x,
      compositeArray[2].constraints[0].pointA.y
    );
    // set properties of new objects in simulation
    compositeArray[0].isMotor = true;
    compositeArray[1].motorSpeed = kMotorSpeed;
    compositeArray[0].motorSpeed = kMotorSpeed;
    compositeArray[0].motorDir = -1;
    compositeArray[1].motorDir = 1;
  } else if (string === "planetary") {
    // set submodule indicators
    spurMod = false;
    planetaryMod = true;
    // remove all composites
    // gear1Radius = compositeArray[1].radius
    // gear2Radius = compositeArray[0].radius
    removeComposite(compositeArray[0].bodies[0]);
    removeComposite(compositeArray[0].bodies[0]);
    removeComposite(compositeArray[0].bodies[0]);
    removeComposite(compositeArray[0].bodies[0]);
    // add new gear composites
    // radius = gear1Radius
    // steps = (0.25 * radius)*2;
    addGearComposite(
      window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6),
      window.innerHeight * kWindowHeight
    );
    // radius = gear2Radius
    // steps = (0.25 * radius)*2;
    addPlanetaryGearComposite(
      window.innerWidth * kWindowWidth - (radius + toothHeight * 0.6),
      window.innerHeight * kWindowHeight,
      window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6),
      window.innerHeight * kWindowHeight
    );
    // set new properties of simulation objects
    compositeArray[1].isMotor = true;
    compositeArray[0].lock = true;
    compositeArray[0].motorSpeed = kMotorSpeed;
    compositeArray[1].motorSpeed = kMotorSpeed;
    compositeArray[1].motorDir = -1;
    compositeArray[0].motorDir = 1;
  }
}
// constant update
Events.on(engine, "beforeUpdate", function (event) {
  // if planetary submodule make linkage visible and caluculate distance between gears
  if (planetaryMod) {
    Body.setPosition(
      compositeArray[1].bodies[1],
      compositeArray[1].bodies[0].position
    );
    for (item of compositeArray) {
      if (item.constraints[0]) {
        item.constraints[0].render.visible = true;
      }
    } 
    const x1 = compositeArray[1].bodies[0].position.x;
    const x2 = compositeArray[0].constraints[0].pointA.x;
    const y1 = compositeArray[1].bodies[0].position.y;
    const y2 = compositeArray[0].constraints[0].pointA.y;
    planetaryBrace = Math.floor(
      Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
    );
    console.log(planetaryBrace);
  }
  // if rotating module set the angle of the beam to the same angle as the gear
  if (compositeArray[3]) {
    Body.setAngle(
      compositeArray[3].bodies[0],
      compositeArray[2].bodies[0].angle
    );
  }
});
////////////////////// RUN /////////////////////////////
// add gears when code first runs
addGearComposite(
  window.innerWidth * kWindowWidth - (radius + toothHeight * 0.6),
  window.innerHeight * kWindowHeight
);
addGearComposite(
  window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6),
  window.innerHeight * kWindowHeight
);
addGearComposite(
  window.innerWidth * kWindowWidth + (radius + toothHeight * 0.6) * 3,
  window.innerHeight * kWindowHeight
);
// add rotating beam
addRotateRect(
  150,
  10,
  compositeArray[2].constraints[0].pointA.x,
  compositeArray[2].constraints[0].pointA.y
);
// change properties of new gears
compositeArray[0].isMotor = true;
compositeArray[1].motorSpeed = kMotorSpeed;
compositeArray[0].motorSpeed = kMotorSpeed;
compositeArray[0].motorDir = -1;
compositeArray[1].motorDir = 1;
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine);
