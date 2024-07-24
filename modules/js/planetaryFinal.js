// module indicator
planetaryModule = true;
planetaryMod = 1;
// planetary change body function
function changeBodyPlanetary(index) {
  // remove ui bodies for sprites
  if (compositeArray[index].bodies[1]) {
    Composite.remove(compositeArray[index], compositeArray[index].bodies[1]);
  }
  // remove bodies
  Composite.remove(compositeArray[index], compositeArray[index].bodies[0]);
  // store x and y constraint values
  let tmpConstraintXPoint;
  if (index === 0) {
    tmpConstraintXPoint = compositeArray[0].constraints[0].pointA.x;
  } else {
    tmpConstraintXPoint = compositeArray[0].constraints[0].pointA.x;
  }
  const tmpConstraintYPoint = compositeArray[0].constraints[0].pointA.y;
  // remove constraints from composites
  Composite.remove(compositeArray[index], compositeArray[index].constraints[0]);
  // reset vertex array
  verts2 = [];
  // draw new gear
  drawGear();
  // add new gear
  Composite.add(
    compositeArray[index],
    Bodies.fromVertices(tmpConstraintXPoint, tmpConstraintYPoint, [verts2])
  );
  // add ui body
  if (compositeArray[index].shape === "gear") {
    Composite.add(
      compositeArray[index],
      Bodies.circle(tmpConstraintXPoint, tmpConstraintYPoint, 1)
    );
  }
  // add constraints to composite
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
      window.innerWidth * (0.75 * 0.45) -
      (compositeArray[1].radius + toothHeight * 0.6),
    y: window.innerHeight * 0.65,
  });
  Composite.remove(compositeArray[1], compositeArray[1].constraints[0]);
  Body.setPosition(compositeArray[1].bodies[0], {
    x:
      compositeArray[0].constraints[0].pointA.x -
      compositeArray[0].radius -
      compositeArray[1].radius -
      toothHeight * 0.6 * 2,
    y: window.innerHeight * 0.65,
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
// draw and create planetary gear
function addPlanetaryGearComposite(centerX, centerY, constraintX, constraintY) {
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
      pointA: { x: constraintX, y: constraintY },
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
  compositeArray[1].motorSpeed = 0.051;
  compositeArray[1].motorDir = -1;
}
//////////////////////////////////GEAR SIZES/////////////////////////////////////
//small = 48
//medium = 64
//large = 80
function gear1(rad) {
  // reset angles
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  // define radius
  radius = rad;
  compositeArray[1].radius = radius;
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  // remove composite
  removeComposite(compositeArray[1].bodies[0]);
  // create new planetary gear composite
  addPlanetaryGearComposite(
    compositeArray[0].constraints[0].pointA.x -
      compositeArray[0].radius -
      radius -
      toothHeight * 0.6 * 2,
    window.innerHeight * 0.65,
    compositeArray[0].constraints[0].pointA.x,
    compositeArray[0].constraints[0].pointA.y
  );
}

function gear2(rad) {
  Body.setAngle(compositeArray[0].bodies[0], 0);
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[0].radius = radius;
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  changeBodyPlanetary(0);
}
////////////////////////////////////////////////////////////////////////////////////////////////
Events.on(engine, "beforeUpdate", function (event) {
  Body.setPosition(
    compositeArray[1].bodies[1],
    compositeArray[1].bodies[0].position
  );
  for (let i = 0; i < compositeArray.length; i++) {
    if (compositeArray[i].constraints[0]) {
      compositeArray[i].constraints[0].render.visible = true;
    }
  }
  // track brace distance
  const x1 = compositeArray[1].bodies[0].position.x;
  const x2 = compositeArray[0].constraints[0].pointA.x;
  const y1 = compositeArray[1].bodies[0].position.y;
  const y2 = compositeArray[0].constraints[0].pointA.y;
  planetaryBrace = Math.floor(
    Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  );
});
////////////////////// RUN /////////////////////////////
// add initial parts first time cod runs
addGearComposite(
  window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 0.6),
  window.innerHeight * 0.65
);
addPlanetaryGearComposite(
  window.innerWidth * (0.75 * 0.45) - (radius + toothHeight * 0.6),
  window.innerHeight * 0.65,
  window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 0.6),
  window.innerHeight * 0.65
);
compositeArray[1].isMotor = true;
compositeArray[0].lock = true;
compositeArray[0].motorSpeed = 0.051;
compositeArray[1].motorSpeed = 0.051;
compositeArray[1].motorDir = -1;
compositeArray[0].motorDir = 1;
console.log(compositeArray[0].constraints[0]);
// run the engine
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine);
