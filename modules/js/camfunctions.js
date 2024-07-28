function changeBodyToCam(index) {
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
