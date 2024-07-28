const kWindowWidth = 0.75 * 0.45;
const kInputLineWidth = 4;
const kInputStrokeStyle = "#FF3318";
function flapBeamWidthInputL(value) {
  if (document.getElementById("flapBeamWidthL")) {
    module.flapBeamWidthL = parseInt(value);
    compositeArray[3].bodies[0].parts[1].render.strokeStyle = kInputStrokeStyle;
    compositeArray[3].bodies[0].parts[1].render.lineWidth = kInputLineWidth;
  }
}
function flapBeamWidthInputR(value) {
  if (document.getElementById("flapBeamWidthR")) {
    module.flapBeamWidthR = parseInt(value);
    compositeArray[2].bodies[0].parts[1].render.strokeStyle = kInputStrokeStyle;
    compositeArray[2].bodies[0].parts[1].render.lineWidth = kInputLineWidth;
  }
}
function flapBeamWidthInput(value) {
  flapBeamWidthInputR(value);
  flapBeamWidthInputL(value);
}
function flapHeightInputL(value) {
  module.flapBeamHeightL = parseInt(value);
  compositeArray[3].bodies[0].parts[2].render.strokeStyle = kInputStrokeStyle;
  compositeArray[3].bodies[0].parts[2].render.lineWidth = kInputLineWidth;
}
function flapHeightInputR(value) {
  module.flapBeamHeightR = parseInt(value);
  compositeArray[2].bodies[0].parts[2].render.strokeStyle = kInputStrokeStyle;
  compositeArray[2].bodies[0].parts[2].render.lineWidth = kInputLineWidth;
}
function flapHeightInput(value) {
  flapHeightInputR(value);
  flapHeightInputL(value);
}
function flapOffsetInput(value) {
  module.flapBeamOffset = parseInt(value);
  for (let j = 1; j < 3; j++) {
    compositeArray[2].bodies[0].parts[j].render.strokeStyle = kInputStrokeStyle;
    compositeArray[3].bodies[0].parts[j].render.strokeStyle = kInputStrokeStyle;
    compositeArray[2].bodies[0].parts[j].render.lineWidth = kInputLineWidth;
    compositeArray[3].bodies[0].parts[j].render.lineWidth = kInputLineWidth;
  }
}
const kLengthLineWidth = 2;
const kLengthStrokeStyle = "#666";
function flapConstraintLengthL(value) {
  // change c value so that the distance calculated between beam and object is different
  // c is used in the beforeUpdate function in the individual module js files
  c = parseInt(value);
  jointComposites[
    jointComposites.length - 2
  ].constraints[0].render.lineWidth = kLengthLineWidth;
  jointComposites[
    jointComposites.length - 2
  ].constraints[0].render.strokeStyle = kLengthStrokeStyle;
}
function flapConstraintLengthR(value) {
  // change c value so that the distance calculated between beam and object is different
  // c is used in the beforeUpdate function in the individual module js files
  c2 = -parseInt(value);
  jointComposites[
    jointComposites.length - 1
  ].constraints[0].render.lineWidth = kLengthLineWidth;
  jointComposites[
    jointComposites.length - 1
  ].constraints[0].render.strokeStyle = kLengthStrokeStyle;
}
function flapConstraintLength(value) {
  flapConstraintLengthL(value);
  flapConstraintLengthR(value);
}
function flapBeamWidthR(value) {
    Body.setAngle(compositeArray[0].bodies[0], 0);
    Body.setAngle(compositeArray[1].bodies[0], 0);
    deleteConstraint(compositeArray[2].bodies[0], compositeArray[1].bodies[0]);
    deleteConstraint(compositeArray[3].bodies[0], compositeArray[0].bodies[0]);
    removeComposite(compositeArray[2].bodies[0]);
    removeComposite(compositeArray[2].bodies[0]);
    addFlapRectComposite(
      window.innerWidth * kWindowWidth + (300 / 2 + 60),
      compositeArray[0].constraints[0].pointA.y - rectBase - 87,
      7,
      150 + module.flapBeamHeightR,
      module.flapBeamOffset + 50,
      module.flapBeamWidthR + 300
    );
    addFlapRectComposite(
      window.innerWidth * kWindowWidth - (300 / 2 + 60),
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
      window.innerWidth * kWindowWidth + (300 / 2 + 60),
      compositeArray[0].constraints[0].pointA.y - rectBase - 87,
      7,
      150 + module.flapBeamHeightR,
      module.flapBeamOffset + 50,
      module.flapBeamWidthR + 300
    );
    addFlapRectComposite(
      window.innerWidth * kWindowWidth - (300 / 2 + 60),
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
      window.innerWidth * kWindowWidth + (300 / 2 + 60),
      compositeArray[0].constraints[0].pointA.y - rectBase - 87,
      7,
      150 + module.flapBeamHeightR,
      module.flapBeamOffset + 50,
      module.flapBeamWidthR + 300
    );
    addFlapRectComposite(
      window.innerWidth * kWindowWidth - (300 / 2 + 60),
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
      window.innerWidth * kWindowWidth + (300 / 2 + 60),
      compositeArray[0].constraints[0].pointA.y - rectBase - 87,
      7,
      150 + module.flapBeamHeightR,
      module.flapBeamOffset + 50,
      module.flapBeamWidthR + 300
    );
    addFlapRectComposite(
      window.innerWidth * kWindowWidth - (300 / 2 + 60),
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
      window.innerWidth * kWindowWidth + (300 / 2 + 60),
      compositeArray[0].constraints[0].pointA.y - rectBase - 87,
      7,
      150 + module.flapBeamHeight,
      module.flapBeamOffset + 50,
      module.beamWidth + 300
    );
    addFlapRectComposite(
      window.innerWidth * kWindowWidth - (300 / 2 + 60),
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
      window.innerWidth * kWindowWidth + (module.horizontalSpace + 100) / 2;
    compositeArray[3].constraints[0].pointA.x =
      window.innerWidth * kWindowWidth - (module.horizontalSpace + 100) / 2;
  }
  function flapVerticalSpace(value) {
    Body.setAngle(compositeArray[0].bodies[0], 0);
    Body.setAngle(compositeArray[1].bodies[0], 0);
    const change =
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
