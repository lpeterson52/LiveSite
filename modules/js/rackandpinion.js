// module indicator and base variables
rackPinionModule = true;
let c = 369; //connector length
const rectBase = 600;
let originalWidth1;
let originalWidth2;
var newWidth1;
var newWidth2;
module.verticalSpace = 0;
// generate small gear
///////////////////////////GEAR SIZE///////////////////////////////////
function gear(rad) {
  angleFactor = 0.21;
  deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[0].constraints[0].pointA.x,
    y: compositeArray[0].constraints[0].pointA.y + 130,
  });
  Body.setAngle(compositeArray[1].bodies[0], 0);
  radius = rad;
  compositeArray[1].radius = radius;
  steps = 0.25 * radius * 2;
  toothWidthDegree = 4;
  toothWidth = toothWidthDegree / conversionFactor;
  if (compositeArray[1].alternate === false) {
    changeBodyContinuous(1);
  } else {
    changeBody(1);
  }
  compositeArray[1].constraints[0].pointA.x =
    window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8);
  if (shared === true) {
    if (flipY === true) {
      compositeArray[compositeArray.length - 3].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.45) + radius * 2 + toothHeight * 2 + 25;
    } else {
      compositeArray[compositeArray.length - 1].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.45) + radius * 2 + toothHeight * 2 + 25;
    }
  }
  if (paired === true) {
    if (flipY === true) {
      changeBody(compositeArray.length - 4);
      compositeArray[1].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) - (radius + toothHeight / 2);
      compositeArray[0].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) -
        (2 * radius + toothHeight) -
        toothHeight -
        5;
      compositeArray[compositeArray.length - 3].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) +
        (2 * radius + toothHeight) +
        toothHeight +
        5;
      compositeArray[compositeArray.length - 4].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) + radius + toothHeight / 2;
      compositeArray[compositeArray.length - 4].rotation = Math.PI;
      Body.setAngle(
        compositeArray[compositeArray.length - 4].bodies[0],
        Math.PI
      );
      compositeArray[1].rotation = 0;
    } else {
      changeBody(compositeArray.length - 2);
      compositeArray[1].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) - (radius + toothHeight / 2);
      compositeArray[0].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) -
        (2 * radius + toothHeight) -
        toothHeight -
        5;
      compositeArray[compositeArray.length - 1].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) +
        (2 * radius + toothHeight) +
        toothHeight +
        5;
      compositeArray[compositeArray.length - 2].constraints[0].pointA.x =
        window.innerWidth * (0.75 * 0.5) + radius + toothHeight / 2;
      compositeArray[compositeArray.length - 2].rotation = Math.PI;
      Body.setAngle(
        compositeArray[compositeArray.length - 2].bodies[0],
        Math.PI
      );
      compositeArray[1].rotation = 0;
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// change simulation when dropdown changes
function changeMotion() {
  const string = document.getElementById("changeMotion").value;
  if (string === "upDown") {
    // reset and remove all constraints
    reset();
    removeUIConstraints(compositeArray[0]);
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
    for (let i = compositeArray.length - 1; i > 1; i--) {
      removeComposite(compositeArray[i].bodies[0]);
    }
    // set all variables back to original values
    shared = false;
    paired = false;
    mirrored = false;
    openCloseMod = false;
    // reset angle
    Body.setAngle(compositeArray[1].bodies[0], 0);
    // set constraint positions
    compositeArray[1].constraints[0].pointA.y = window.innerHeight * 0.5;
    compositeArray[0].constraints[0].pointA.y = window.innerHeight * 0.5;
    compositeArray[1].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8);
    compositeArray[0].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45);
    // set positions
    Body.setPosition(compositeArray[1].bodies[0], {
      x: window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8),
      y: window.innerHeight * 0.5,
    });
    Body.setPosition(compositeArray[0].bodies[0], {
      x: compositeArray[0].bodies[0].position.x,
      y: window.innerHeight * 0.5 + 130,
    });
    compositeArray[0].constraints[0].stiffness = 0.001;
  } else if (string === "openClose") {
    // reset everything
    reset();
    // create constraints between ui components
    createUIConstraints(compositeArray[0], prevSpaceValue, prevPivotValue, 6);
    for (let i = compositeArray.length - 1; i > 1; i--) {
      removeComposite(compositeArray[i].bodies[0]);
    }
    // reset variables
    shared = false;
    paired = false;
    mirrored = false;
    openCloseMod = true;
    // reset angle
    Body.setAngle(compositeArray[1].bodies[0], 0);
    // set constraint positions
    compositeArray[1].constraints[0].pointA.y = window.innerHeight * 0.5;
    compositeArray[0].constraints[0].pointA.y = window.innerHeight * 0.5;
    // set body positions
    Body.setPosition(compositeArray[1].bodies[0], {
      x: window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8),
      y: window.innerHeight * 0.5,
    });
    Body.setPosition(compositeArray[0].bodies[0], {
      x: compositeArray[0].bodies[0].position.x,
      y: window.innerHeight * 0.5 + 130,
    });
    compositeArray[0].constraints[0].stiffness = 0.001;
    // add new open close beams
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
    // store original beam widths
    originalWidth1 = compositeArray[2].width;
    originalWidth2 = compositeArray[3].width;
    newWidth1 = originalWidth1;
    newWidth2 = originalWidth2;
    // create linkage constraints from beams
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[2].bodies[0]
    );
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[3].bodies[0]
    );
  }
}
// display new window when you try to mirror
function mirrorModal() {
  flipLabel = document.getElementById("flipYLabel");
  flipCheck = document.getElementById("flipYCheck");
  flipTitle = document.getElementById("flipYTitle");
  if (mirrored === false) {
    overlay3();
    if (openCloseMod != true) {
      flipCheck.style.visibility = "hidden";
      flipLabel.style.visibility = "hidden";
      flipTitle.style.visibility = "hidden";
    } else {
      flipCheck.style.visibility = "visible";
      flipLabel.style.visibility = "visible";
      flipTitle.style.visibility = "visible";
    }
  }
}
// function to mirror the current simulation
// paired = new gear and lingear set
// shared = share same gear but new lingear
function mirror() {
  mirrored = true;
  if (openCloseMod != true) {
    // check modal to see if paired is checked
    if (document.getElementById("paired").checked) {
      paired = true;
      // set new constraints positions
      compositeArray[0].constraints[0].pointA.x =
        compositeArray[0].constraints[0].pointA.x - (radius + toothHeight / 2);
      compositeArray[1].constraints[0].pointA.x =
        compositeArray[1].constraints[0].pointA.x - (radius + toothHeight / 2);
      // set new body positions and angles
      Body.setPosition(compositeArray[0].bodies[0], {
        x: compositeArray[0].constraints[0].pointA.x,
        y: compositeArray[0].constraints[0].pointA.y + 130,
      });
      Body.setAngle(compositeArray[1].bodies[0], 0);
      Body.setPosition(compositeArray[1].bodies[0], {
        x: compositeArray[1].constraints[0].pointA.x,
        y: compositeArray[1].constraints[0].pointA.y,
      });
      // add new gear composite
      addGearComposite(
        window.innerWidth * (0.75 * 0.45) +
          (radius + toothHeight * 1.8) +
          (radius + toothHeight / 2),
        compositeArray[0].constraints[0].pointA.y
      );
      // set if real motor or fake motor
      compositeArray[compositeArray.length - 1].realMotor = false;
      // set angle of new gear
      Body.setAngle(
        compositeArray[compositeArray.length - 1].bodies[0],
        Math.PI
      );
      // set motor properties of new gear
      compositeArray[compositeArray.length - 1].alternate = true;
      compositeArray[compositeArray.length - 1].isMotor = true;
      // add new lingear composite
      addLinGearComposite(
        compositeArray[1].bodies[0].position.x +
          radius * 3 +
          toothHeight * 2 +
          15,
        window.innerHeight * 0.5
      );
      // set position and rotation of new lingear
      Body.setPosition(compositeArray[compositeArray.length - 1].bodies[0], {
        x: compositeArray[compositeArray.length - 1].constraints[0].pointA.x,
        y: window.innerHeight * 0.5 + 130,
      });
      compositeArray[compositeArray.length - 1].rotation = Math.PI;
    } else if (document.getElementById("shared").checked) {
      // if shared checked
      shared = true;
      // reset angle
      Body.setAngle(compositeArray[1].bodies[0], 0);
      // set new constraint position
      compositeArray[0].constraints[0].pointA.y =
        compositeArray[1].constraints[0].pointA.y;
      // set new body position
      Body.setPosition(compositeArray[0].bodies[0], {
        x: compositeArray[0].bodies[0].position.x,
        y: compositeArray[1].constraints[0].pointA.y + 130,
      });
      // add new lingear
      addLinGearComposite(
        window.innerWidth * (0.75 * 0.45) + radius * 2 + toothHeight * 2 + 25,
        compositeArray[1].constraints[0].pointA.y
      );
      // set lingear positoin
      Body.setPosition(compositeArray[compositeArray.length - 1].bodies[0], {
        x: compositeArray[compositeArray.length - 1].bodies[0].position.x,
        y: compositeArray[1].constraints[0].pointA.y - 130,
      });
      // set lin gear rotation
      compositeArray[compositeArray.length - 1].rotation = Math.PI;
    }
  } else {
    // if paired is checked and open close module
    if (document.getElementById("paired").checked) {
      paired = true;
      // set new constraint positions
      compositeArray[0].constraints[0].pointA.x =
        compositeArray[0].constraints[0].pointA.x - (radius + toothHeight / 2);
      compositeArray[1].constraints[0].pointA.x =
        compositeArray[1].constraints[0].pointA.x - (radius + toothHeight / 2);
      // set new body positions and angles
      Body.setPosition(compositeArray[0].bodies[0], {
        x: compositeArray[0].constraints[0].pointA.x,
        y: compositeArray[0].constraints[0].pointA.y + 130,
      });
      Body.setAngle(compositeArray[1].bodies[0], 0);
      Body.setPosition(compositeArray[1].bodies[0], {
        x: compositeArray[1].constraints[0].pointA.x,
        y: compositeArray[1].constraints[0].pointA.y,
      });
      // add new gear composite
      addGearComposite(
        window.innerWidth * (0.75 * 0.45) +
          (radius + toothHeight * 1.8) +
          (radius + toothHeight / 2),
        compositeArray[0].constraints[0].pointA.y
      );
      // set gear as not real motor
      compositeArray[compositeArray.length - 1].realMotor = false;
      // set gear angle
      Body.setAngle(
        compositeArray[compositeArray.length - 1].bodies[0],
        Math.PI
      );
      // set motor properties
      compositeArray[compositeArray.length - 1].alternate = true;
      compositeArray[compositeArray.length - 1].isMotor = true;
      // add new lin gear
      addLinGearComposite(
        compositeArray[1].bodies[0].position.x +
          radius * 3 +
          toothHeight * 2 +
          15,
        compositeArray[0].constraints[0].pointA.y
      );
      // set position of new lingear
      Body.setPosition(compositeArray[compositeArray.length - 1].bodies[0], {
        x: compositeArray[compositeArray.length - 1].constraints[0].pointA.x,
        y: compositeArray[0].constraints[0].pointA.x,
      });
      // set rotation of lingear
      compositeArray[compositeArray.length - 1].rotation = Math.PI;
      // if flip checked
      if (document.getElementById("flipYCheck").checked) {
        flipY = true;
        // add new open close beams
        addRectComposite(
          300,
          5,
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x -
            200,
          compositeArray[1].constraints[0].pointA.y + 600
        );
        addRectComposite(
          -300,
          5,
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x +
            200,
          compositeArray[1].constraints[0].pointA.y + 600
        );
        // create new linkage constraints between open close beams
        createConstraintFakeRP(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 1].bodies[0]
        );
        createConstraintFakeRP(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 2].bodies[0]
        );
        // add ui constraints
        createUIConstraints(
          compositeArray[compositeArray.length - 3],
          prevSpaceValue,
          prevPivotValue,
          6
        );
      }
    } else if (document.getElementById("shared").checked) {
      // if shared and open close
      shared = true;
      // reset angle
      Body.setAngle(compositeArray[1].bodies[0], 0);
      Body.setPosition(compositeArray[0].bodies[0], {
        x: compositeArray[0].bodies[0].position.x,
        y: window.innerHeight * 0.5 + 130,
      });
      // add new lingear composite
      addLinGearComposite(
        window.innerWidth * (0.75 * 0.45) + radius * 2 + toothHeight * 2 + 25,
        compositeArray[1].constraints[0].pointA.y
      );
      Body.setPosition(compositeArray[compositeArray.length - 1].bodies[0], {
        x: compositeArray[compositeArray.length - 1].bodies[0].position.x,
        y: window.innerHeight * 0.5 - 130,
      });
      // set rotation of lingear
      compositeArray[compositeArray.length - 1].rotation = Math.PI;
      // if flip is checked from modal
      if (document.getElementById("flipYCheck").checked) {
        flipY = true;
        // add new open close rect beams
        addRectComposite(
          300,
          5,
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x -
            200,
          compositeArray[1].constraints[0].pointA.y + 600
        );
        addRectComposite(
          -300,
          5,
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x +
            200,
          compositeArray[1].constraints[0].pointA.y + 600
        );
        // create new rect linkage constraints
        createConstraintFakeRP(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 1].bodies[0]
        );
        createConstraintFakeRP(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 2].bodies[0]
        );
        // create ui constraints
        createUIConstraints(
          compositeArray[compositeArray.length - 3],
          prevSpaceValue,
          prevPivotValue,
          6
        );
      }
    }
  }
  // close modal
  overlay3();
}
// reset all objects in simulation
function reset() {
  // reset variables
  prevSpaceValue = 50;
  module.horizontalSpace = 50;
  prevPivotValue = 0;
  pivotValue = 0;
  mirrored = false;
  shared = false;
  paired = false;
  flipY = false;
  modified = false;
  alternatingGear();

  if (openCloseMod === true) {
    beamSpacing(50);
    // remove ui parts
    removeUIConstraints(compositeArray[0]);
    // delete all constraints
    deleteConstraint(
      compositeArray[compositeArray.length - 1].bodies[0],
      compositeArray[compositeArray.length - 3].bodies[0]
    );
    deleteConstraint(
      compositeArray[compositeArray.length - 2].bodies[0],
      compositeArray[compositeArray.length - 3].bodies[0]
    );
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[1].bodies[0], compositeArray[0].bodies[0]);
    // remove composites
    for (let i = compositeArray.length - 1; i > 1; i--) {
      removeComposite(compositeArray[i].bodies[0]);
    }
    // reset angles
    Body.setAngle(compositeArray[1].bodies[0], 0);
    // reset positions
    compositeArray[1].constraints[0].pointA.y = window.innerHeight * 0.5;
    compositeArray[0].constraints[0].pointA.y = window.innerHeight * 0.5;
    compositeArray[1].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8);
    compositeArray[0].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45);
    Body.setPosition(compositeArray[1].bodies[0], {
      x: window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8),
      y: window.innerHeight * 0.5,
    });
    Body.setPosition(compositeArray[0].bodies[0], {
      x: compositeArray[0].bodies[0].position.x,
      y: window.innerHeight * 0.5 + 130,
    });
    compositeArray[0].constraints[0].stiffness = 0.001;
    // add new open close beams
    addRectComposite(
      300,
      5,
      window.innerWidth * (0.75 * 0.45) - 200,
      compositeArray[1].constraints[0].pointA.y - 600
    );
    addRectComposite(
      -300,
      5,
      window.innerWidth * (0.75 * 0.45) + 200,
      compositeArray[1].constraints[0].pointA.y - 600
    );
    // create new linkage constraints
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[2].bodies[0]
    );
    createConstraintFake(
      compositeArray[0].bodies[0],
      compositeArray[3].bodies[0]
    );
    // add ui objects
    createUIConstraints(compositeArray[0], 50, 100, 6);
  } else {
    // remove composites
    for (let i = compositeArray.length - 1; i > 1; i--) {
      removeComposite(compositeArray[i].bodies[0]);
    }
    // reset angles
    Body.setAngle(compositeArray[1].bodies[0], 0);
    // reset constraint positions
    compositeArray[1].constraints[0].pointA.y = window.innerHeight * 0.5;
    compositeArray[0].constraints[0].pointA.y = window.innerHeight * 0.5;
    compositeArray[1].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8);
    compositeArray[0].constraints[0].pointA.x =
      window.innerWidth * (0.75 * 0.45);
    // set new positions
    Body.setPosition(compositeArray[1].bodies[0], {
      x: window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8),
      y: window.innerHeight * 0.5,
    });
    Body.setPosition(compositeArray[0].bodies[0], {
      x: compositeArray[0].bodies[0].position.x,
      y: window.innerHeight * 0.5 + 130,
    });
    compositeArray[0].constraints[0].stiffness = 0.001;
  }
}
function resetModule() {
  gear(80);
  reset();
}
function continuous() {
  compositeArray[1].alternate = false;
  changeBodyContinuous(1);
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[0].constraints[0].pointA.x,
    y: compositeArray[0].constraints[0].pointA.y + 130,
  });
  compositeArray[0].constraints[0].stiffness = 0.001;
  compositeArray[1].motorDir = 1;
}
function alternatingGear() {
  document.getElementById("mirror").disabled = false;
  compositeArray[0].constraints[0].pointA.y = window.innerHeight * 0.5;
  changeBody(1);
  Body.setPosition(compositeArray[0].bodies[0], {
    x: compositeArray[0].constraints[0].pointA.x,
    y: compositeArray[0].constraints[0].pointA.y + 130,
  });
  compositeArray[1].alternate = true;
  compositeArray[0].constraints[0].stiffness = 0.00001;
  compositeArray[1].motorDir = 1;
}
//////////////////////// ADD TO WORLD //////////////////////

// horizontal spacing
let prevSpaceValue = 50;
let changeSpaceWidth = 0;
var beamSpace = 50;
let modified = false;
function beamSpacing(value) {
  changeSpaceWidth = value - prevSpaceValue;
  if (openCloseMod) {
    if (compositeArray[2] && compositeArray[3]) {
      compositeArray[2].constraints[0].pointA.x =
        compositeArray[0].constraints[0].pointA.x - value;
      compositeArray[3].constraints[0].pointA.x =
        compositeArray[0].constraints[0].pointA.x - value * -1;
      if (flipY) {
        jointComposites[jointComposites.length - 3].constraints[0].pointA.x =
          jointComposites[jointComposites.length - 3].constraints[0].pointA.x +
          changeSpaceWidth;
        jointComposites[jointComposites.length - 4].constraints[0].pointA.x =
          jointComposites[jointComposites.length - 4].constraints[0].pointA.x -
          changeSpaceWidth;
        if (compositeArray[2].width === 300 && modified === false) {
          jointComposites[jointComposites.length - 1].constraints[0].pointA.x =
            jointComposites[jointComposites.length - 1].constraints[0].pointA
              .x - changeSpaceWidth;
          jointComposites[jointComposites.length - 2].constraints[0].pointA.x =
            jointComposites[jointComposites.length - 2].constraints[0].pointA
              .x + changeSpaceWidth;
        } else {
          modified = true;
          jointComposites[jointComposites.length - 1].constraints[0].pointA.x =
            jointComposites[jointComposites.length - 1].constraints[0].pointA
              .x + changeSpaceWidth;
          jointComposites[jointComposites.length - 2].constraints[0].pointA.x =
            jointComposites[jointComposites.length - 2].constraints[0].pointA
              .x - changeSpaceWidth;
        }
        if (paired) {
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x =
            compositeArray[5].constraints[0].pointA.x - value;
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x =
            compositeArray[5].constraints[0].pointA.x - value * -1;
        } else if (shared) {
          compositeArray[compositeArray.length - 2].constraints[0].pointA.x =
            compositeArray[4].constraints[0].pointA.x - value;
          compositeArray[compositeArray.length - 1].constraints[0].pointA.x =
            compositeArray[4].constraints[0].pointA.x - value * -1;
        }
      } else {
        jointComposites[jointComposites.length - 1].constraints[0].pointA.x =
          jointComposites[jointComposites.length - 1].constraints[0].pointA.x +
          changeSpaceWidth;
        jointComposites[jointComposites.length - 2].constraints[0].pointA.x =
          jointComposites[jointComposites.length - 2].constraints[0].pointA.x -
          changeSpaceWidth;
      }
    }
    console.log("BeamSpace Value = " + value);
  }
  prevSpaceValue = value;
  beamSpace = parseInt(value);
  compositeArray[0].constraints[1].render.lineWidth = 2;
  compositeArray[0].constraints[1].render.strokeStyle = "#666";
  if (mirrored) {
    if (openCloseMod) {
      compositeArray[
        compositeArray.length - 3
      ].constraints[1].render.lineWidth = 2;
      compositeArray[
        compositeArray.length - 3
      ].constraints[1].render.strokeStyle = "#666";
    } else {
      compositeArray[
        compositeArray.length - 1
      ].constraints[1].render.lineWidth = 2;
      compositeArray[
        compositeArray.length - 1
      ].constraints[1].render.strokeStyle = "#666";
    }
  }
}
// vertical spacing
let prevPivotValue = 100;
const initialPivotValue = 100;
let pivotValue = 100;
let changePivotHeight;
function pivotHeight(value) {
  if (openCloseMod) {
    if (compositeArray[2] && compositeArray[3]) {
      changePivotHeight = value - prevPivotValue;
      if (flipY) {
        jointComposites[jointComposites.length - 1].constraints[0].pointA.y =
          jointComposites[jointComposites.length - 1].constraints[0].pointA.y +
          changePivotHeight;
        jointComposites[jointComposites.length - 2].constraints[0].pointA.y =
          jointComposites[jointComposites.length - 2].constraints[0].pointA.y +
          changePivotHeight;
        jointComposites[jointComposites.length - 3].constraints[0].pointA.y =
          jointComposites[jointComposites.length - 3].constraints[0].pointA.y -
          changePivotHeight;
        jointComposites[jointComposites.length - 4].constraints[0].pointA.y =
          jointComposites[jointComposites.length - 4].constraints[0].pointA.y -
          changePivotHeight;
      } else {
        jointComposites[jointComposites.length - 1].constraints[0].pointA.y =
          jointComposites[jointComposites.length - 1].constraints[0].pointA.y -
          changePivotHeight;
        jointComposites[jointComposites.length - 2].constraints[0].pointA.y =
          jointComposites[jointComposites.length - 2].constraints[0].pointA.y -
          changePivotHeight;
      }
      prevPivotValue = value;
      pivotValue = value;
      console.log("Pivot Value = " + value);
    }
  } else {
    changePivotHeight = value - prevPivotValue;
    prevPivotValue = value;
    pivotValue = value;
    console.log("Pivot Value = " + value);
  }
  compositeArray[0].constraints[2].render.lineWidth = 2;
  compositeArray[0].constraints[2].render.strokeStyle = "#666";
  if (mirrored) {
    if (openCloseMod) {
      compositeArray[
        compositeArray.length - 3
      ].constraints[2].render.lineWidth = 2;
      compositeArray[
        compositeArray.length - 3
      ].constraints[2].render.strokeStyle = "#666";
    } else {
      compositeArray[
        compositeArray.length - 1
      ].constraints[2].render.lineWidth = 2;
      compositeArray[
        compositeArray.length - 1
      ].constraints[2].render.strokeStyle = "#666";
    }
  }
}

// constraint position along beam
function constraintPosition(value) {
  if (openCloseMod) {
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[0].bodies[0]);
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
    compositeArray[2].width = originalWidth1 - value;
    compositeArray[3].width = originalWidth2 - -value;
    createConstraintFake2(
      compositeArray[0].bodies[0],
      compositeArray[2].bodies[0],
      -value,
      originalWidth1
    );
    createConstraintFake2(
      compositeArray[0].bodies[0],
      compositeArray[3].bodies[0],
      value,
      originalWidth2
    );
    if (flipY) {
      compositeArray[compositeArray.length - 2].width = originalWidth1 - value;
      compositeArray[compositeArray.length - 1].width = originalWidth2 - -value;
      if (paired) {
        deleteConstraint(
          compositeArray[compositeArray.length - 1].bodies[0],
          compositeArray[compositeArray.length - 3].bodies[0]
        );
        deleteConstraint(
          compositeArray[compositeArray.length - 2].bodies[0],
          compositeArray[compositeArray.length - 3].bodies[0]
        );
        createConstraintFake2(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 2].bodies[0],
          -value,
          originalWidth1
        );
        createConstraintFake2(
          compositeArray[compositeArray.length - 3].bodies[0],
          compositeArray[compositeArray.length - 1].bodies[0],
          value,
          originalWidth2
        );
      } else if (shared) {
        deleteConstraint(
          compositeArray[compositeArray.length - 1].bodies[0],
          compositeArray[4].bodies[0]
        );
        deleteConstraint(
          compositeArray[compositeArray.length - 2].bodies[0],
          compositeArray[4].bodies[0]
        );
        createConstraintFake2(
          compositeArray[4].bodies[0],
          compositeArray[compositeArray.length - 2].bodies[0],
          -value,
          originalWidth1
        );
        createConstraintFake2(
          compositeArray[4].bodies[0],
          compositeArray[compositeArray.length - 1].bodies[0],
          value,
          originalWidth2
        );
      }
    }
    console.log("constraintPosition Value = " + value);
  }
}
// add mouse constraint to world

///////////////// Animation /////////////////////////////////////

Events.on(engine, "beforeUpdate", function (event) {});
// called every frame after physics is applied
// same as above
// calculate angle to rotate open close beams
Events.on(engine, "afterUpdate", function (event) {
  if (openCloseMod === true) {
    const bottom = compositeArray[0].constraints[0].pointA.y - 600;
    const top = compositeArray[0].bodies[0].position.y - 200 - pivotValue;
    const b = top - bottom;
    const a = compositeArray[2].width;
    const angleC = Math.acos((a * a + b * b - c * c) / (2 * a * b));
    if (angleC) {
      Body.setAngle(compositeArray[2].bodies[0], angleC - 1.5708);
      Body.setAngle(compositeArray[3].bodies[0], -(angleC - 1.5708));
      if (flipY) {
        const bottom2 =
          compositeArray[compositeArray.length - 3].constraints[0].pointA.y +
          600;
        const top2 =
          compositeArray[compositeArray.length - 3].bodies[0].position.y +
          200 +
          pivotValue;
        const b2 = bottom2 - top2;
        const a2 = compositeArray[compositeArray.length - 1].width;
        const angleC2 = Math.acos((a2 * a2 + b2 * b2 - c * c) / (2 * a2 * b2));
        if (paired) {
          Body.setAngle(
            compositeArray[compositeArray.length - 2].bodies[0],
            angleC2 - 1.5708
          );
          Body.setAngle(
            compositeArray[compositeArray.length - 1].bodies[0],
            -(angleC2 - 1.5708)
          );
        } else if (shared) {
          Body.setAngle(
            compositeArray[compositeArray.length - 2].bodies[0],
            angleC2 - 1.5708
          );
          Body.setAngle(
            compositeArray[compositeArray.length - 1].bodies[0],
            -(angleC2 - 1.5708)
          );
        }
      }
    }
    if (flipY) {
      Body.setVelocity(compositeArray[compositeArray.length - 1].bodies[0], {
        x: 0,
        y: 0,
      });
      Body.setVelocity(compositeArray[compositeArray.length - 2].bodies[0], {
        x: 0,
        y: 0,
      });
    }
    Body.setVelocity(compositeArray[2].bodies[0], { x: 0, y: 0 });
    Body.setVelocity(compositeArray[3].bodies[0], { x: 0, y: 0 });
    compositeArray[2].constraints[0].pointA.x =
      compositeArray[0].constraints[0].pointA.x - beamSpace;
    compositeArray[3].constraints[0].pointA.x =
      compositeArray[0].constraints[0].pointA.x - beamSpace * -1;
    if (paired || shared) {
      if (flipY) {
        compositeArray[compositeArray.length - 2].constraints[0].pointA.x =
          compositeArray[compositeArray.length - 3].constraints[0].pointA.x -
          beamSpace;
        compositeArray[compositeArray.length - 1].constraints[0].pointA.x =
          compositeArray[compositeArray.length - 3].constraints[0].pointA.x -
          beamSpace * -1;
      }
    }
  }
  if (paired === true) {
    for (let i = 2; i < compositeArray.length; i++) {
      if (compositeArray[i].shape === "linGear") {
        Body.setPosition(compositeArray[i].bodies[0], {
          x: compositeArray[i].constraints[0].pointA.x,
          y: compositeArray[0].bodies[0].position.y,
        });
      }
    }
  }
  if (shared === true) {
    for (let i = 2; i < compositeArray.length; i++) {
      if (compositeArray[i].shape === "linGear") {
        const difference =
          compositeArray[0].bodies[0].position.y -
          compositeArray[0].constraints[0].pointA.y;
        Body.setPosition(compositeArray[i].bodies[0], {
          x: compositeArray[i].constraints[0].pointA.x,
          y: compositeArray[i].constraints[0].pointA.y - difference,
        });
      }
    }
  }
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
        compositeArray[0].constraints[0].pointA.y + 130
      ) {
        Body.setPosition(compositeArray[0].bodies[0], {
          x: compositeArray[0].bodies[0].position.x,
          y: compositeArray[0].constraints[0].pointA.y + 130,
        });
        Body.setVelocity(compositeArray[0].bodies[0], { x: 0, y: 0 });
      } else {
        Body.setVelocity(compositeArray[0].bodies[0], { x: 0, y: 3 });
      }
    }
  }
});

////////////////////// RUN /////////////////////////////

// add initial objects to simulation when code first runs
addLinGearComposite(
  window.innerWidth * (0.75 * 0.45),
  window.innerHeight * 0.5
);
addGearComposite(
  window.innerWidth * (0.75 * 0.45) + (radius + toothHeight * 1.8),
  window.innerHeight * 0.5
);
Body.setPosition(compositeArray[0].bodies[0], {
  x: compositeArray[0].bodies[0].position.x,
  y: window.innerHeight * 0.5 + 130,
});
compositeArray[1].isMotor = true;
compositeArray[1].alternate = true;
// Engine.run(engine);
Render.run(render);
// Runner.run(engine);
Runner.start(runner, engine);
