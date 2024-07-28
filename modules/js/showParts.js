function showParts() {
  // define initial variables
  numLargeGear = 0;
  numMediumGear = 0;
  numSmallGear = 0;
  numLargeCrank = 0;
  numMediumCrank = 0;
  numSmallCrank = 0;
  numLinearGear = 0;
  numLargeCam = 0;
  numMediumCam = 0;
  numSmallCam = 0;
  let continuous = 0;
  let crankLength = 0;
  let mirror = 0;
  let camType;
  let flappingModule = 0;
  let motor = 0;
  let spurFlap = 0;
  let spurRotate = 0;
  let rotateGear = 0;
  let spur1Radius = 0;
  let spur2Radius = 0;
  let spur3Radius = 0;
  const walkBottom =
    (compositeArray[0].width * 3 +
      Math.sqrt(
        compositeArray[0].width * compositeArray[0].width +
          compositeArray[0].height * compositeArray[0].height
      )) *
    1.251 *
    1.251;
  const walkMiddle =
    (compositeArray[0].width * 3 + walkingVert * 2) * 1.251 * 1.251;
  const walkTop =
    ((compositeArray[0].width * 3 +
      Math.sqrt(
        compositeArray[0].width * compositeArray[0].width +
          compositeArray[0].height * compositeArray[0].height
      ) +
      walkingVert) *
      1.251 +
      100) *
    1.251;
  const walkLinkage = (linkageLength * 2 + 100 * 3) * 1.251 * 1.251;
  const triSpace = walkingVert * 1.251 * 1.251;
  const walkLink = linkageLength * 1.251 * 1.251;
  // loop through all composites and classify the objects that exist
  for (body of compositeArray) {
    // if shape is continuous then draw continuous gear unless it is in rotate, spur, or planetary module
    if (body.shape === "gear") {
      if (body.alternate === false) {
        continuous = 1;
        if (rotateModule || spurModule || planetaryModule) {
          continuous = 0;
        }
      }
      // if radius is 80 add value to numLargeGear
      if (body.radius === 80) {
        numLargeGear++;
      }
      // if 64 add value to numMediumGear
      else if (body.radius === 64) {
        numMediumGear++;
      }
      // if 48 add value to numSmallGear
      else if (body.radius === 48) {
        numSmallGear++;
      }
    }
    // if cam draw specific cam shape
    if (
      body.shape === "cam" ||
      body.shape === "shell"
    ) {
      if (body.shape === "shell") {
        camType = 1;
      }
      if (body.shape === "cam") {
        camType = 0;
      }
      if (body.radius === 80) {
        numLargeCam++;
      } else if (body.radius === 64) {
        numMediumCam++;
      } else if (body.radius === 48) {
        numSmallCam++;
      }
    }
    // if crank module then add value to large medium or small crank
    if (body.shape === "circleCrank") {
      crankLength = 350 + parseInt(module.pivot2Point);
      if (body.radius === 132) {
        numLargeCrank++;
      } else if (body.radius === 116) {
        numMediumCrank++;
      } else if (body.radius === 100) {
        numSmallCrank++;
      }
    }
    // track if there is mirroring or not
    if (body.shape === "linGear") {
      if (mirrored === true) {
        mirror = 1;
      }
      numLinearGear++;
    }
  }
  // if flapping module track which side the motor is on
  if (flapModule) {
    flappingModule = 1;
    if (compositeArray[0].isMotor) {
      motor = 0;
    } else {
      motor = 1;
    }
  }
  // if spur or rotate module track properties of specific gears
  if (spurModule || rotateModule) {
    if (compositeArray[2]) {
      if (compositeArray[2].shape === "gear") {
        spurRotate = 1;
        rotateGear = compositeArray[2].radius;
        spur1Radius = compositeArray[0].radius;
        spur2Radius = compositeArray[1].radius;
        spur3Radius = compositeArray[2].radius;
      } else {
        spurFlap = 1;
      }
    }
  }
  if (walkingModule) {
  }
  // convert variable values to string
  const largeGears = numLargeGear.toString();
  const mediumGears = numMediumGear.toString();
  const smallGears = numSmallGear.toString();
  const linGears = numLinearGear.toString();
  const largeCranks = numLargeCrank.toString();
  const mediumCranks = numMediumCrank.toString();
  const smallCranks = numSmallCrank.toString();
  const largeCam = numLargeCam.toString();
  const mediumCam = numMediumCam.toString();
  const smallCam = numSmallCam.toString();
  continuous = continuous.toString();
  crankLength = crankLength.toString();
  mirror = mirror.toString();
  const connectorLength = module.connectorLength;
  const beamLength = newWidth1;
  const horizontalSpace = module.horizontalSpace * 2;
  let constraintLength =
    parseInt(module.connectorLength) +
    parseInt(300 + module.beamWidth) +
    parseInt(4 * module.horizontalSpace);
  if (!compositeArray[2] || !compositeArray[3] || rotateModule) {
    constraintLength = 0;
  }
  // store variables in local browser storage so that they can be accessed when the page changes
  localStorage.setItem("largeGears", largeGears);
  localStorage.setItem("mediumGears", mediumGears);
  localStorage.setItem("smallGears", smallGears);
  localStorage.setItem("largeCranks", largeCranks);
  localStorage.setItem("mediumCranks", mediumCranks);
  localStorage.setItem("smallCranks", smallCranks);
  localStorage.setItem("linGears", linGears);
  localStorage.setItem("largeCam", largeCam);
  localStorage.setItem("mediumCam", mediumCam);
  localStorage.setItem("smallCam", smallCam);
  localStorage.setItem("constraintLength", constraintLength);
  localStorage.setItem("connectorLength", connectorLength);
  localStorage.setItem("beamLength", beamLength);
  localStorage.setItem("horizontalSpace", horizontalSpace);
  localStorage.setItem("continuous", continuous);
  localStorage.setItem("crankLength", crankLength);
  localStorage.setItem("mirror", mirror);
  if (shared) {
    localStorage.setItem("shared", 1);
  } else {
    localStorage.setItem("shared", 0);
  }
  if (paired) {
    localStorage.setItem("paired", 1);
  } else {
    localStorage.setItem("paired", 0);
  }
  localStorage.setItem("flappingModule", flappingModule);
  localStorage.setItem("gear1Spacing", gear1Spacing);
  localStorage.setItem("gear2Spacing", gear2Spacing);
  localStorage.setItem("beamSpace", beamSpace);
  localStorage.setItem("verticalSpacing", verticalSpacing);
  localStorage.setItem("flapBeamHeightL", module.flapBeamHeightL + 150);
  localStorage.setItem("flapBeamHeightR", module.flapBeamHeightR + 150);
  localStorage.setItem("flapBeamOffset", module.flapBeamOffset + 50);
  localStorage.setItem("flapBeamWidthL", module.flapBeamWidthL + 300);
  localStorage.setItem("flapBeamWidthR", module.flapBeamWidthR + 300);
  localStorage.setItem("flapVerticalSpace", module.verticalSpace + 300);
  localStorage.setItem("flapHorizontalSpace", module.horizontalSpace + 100);
  localStorage.setItem("flapConnectorLengthR", flapConnectorR);
  localStorage.setItem("flapConnectorLengthL", flapConnectorL);
  localStorage.setItem("motor", motor);
  localStorage.setItem("camType", camType);
  localStorage.setItem("spurFlap", spurFlap);
  localStorage.setItem("spurRotate", spurRotate);
  localStorage.setItem("rotateGear", rotateGear);
  localStorage.setItem("spur1Radius", spur1Radius);
  localStorage.setItem("spur2Radius", spur2Radius);
  localStorage.setItem("spur3Radius", spur3Radius);
  localStorage.setItem("spurBeamLength", module.spurBeamLength + 150);
  if (planetaryModule || rotateModule) {
    if (planetaryMod) {
      localStorage.setItem("planetaryModule", 1);
      localStorage.setItem("planetaryBraceLength", planetaryBrace);
      localStorage.setItem("planetaryGearRadius", compositeArray[0].radius);
    }
  } else {
    localStorage.setItem("planetaryModule", 0);
  }
  if (walkingModule) {
    localStorage.setItem("walkingModule", 1);
    localStorage.setItem("walkTop", walkTop);
    localStorage.setItem("walkMiddle", walkMiddle);
    localStorage.setItem("walkBottom", walkBottom);
    localStorage.setItem("walkLinkage", walkLinkage);
    localStorage.setItem("triWidth", compositeArray[0].width * 1.251 * 1.251);
    localStorage.setItem("triHeight", compositeArray[0].height * 1.251 * 1.251);
    localStorage.setItem("triSpace", triSpace);
    localStorage.setItem("walkLink", walkLink);
  } else {
    localStorage.setItem("walkingModule", 0);
  }
  // window.location.href="./jsPDF/parts.html"
  // navigate the window to the parts.html page and open it in a new tab
  window.open("./jsPDF/parts.html", "_blank");
}
