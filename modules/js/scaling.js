var scale = window.innerHeight/1011;
var world = engine.world

// make the world bounds a little bigger than the render bounds
world.bounds.min.x = 300;
world.bounds.min.y = 300;
world.bounds.max.x = window.innerWidth*0.75;
world.bounds.max.y = window.innerHeight;

// keep track of current bounds scale (view zoom)
var boundsScaleTarget = 1,
    boundsScale = {
        x: 1,
        y: 1
};


if (rackPinionModule === true){
  scale = scale -0.2
}

///////////////// Animation /////////////////////////////////////
Events.on(engine, 'beforeUpdate', function(event) {
  var world = engine.world,
      // mouse = mouseConstraint.mouse,
      translate;

  // mouse wheel controls zoom
  if(rackPinionModule){
    var scaleFactor = 1-scale+0.5;
  }
  else{
    var scaleFactor = 1-scale+0.1;
  }
  if (scaleFactor > 0.1) {
      if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1)) {
          boundsScaleTarget += scaleFactor;
      }
  }

  // if scale has changed
  if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
      // smoothly tween scale factor
      scaleFactor = (boundsScaleTarget - boundsScale.x) ;
      boundsScale.x += scaleFactor;
      boundsScale.y += scaleFactor;

      // scale the render bounds
      render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
      render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

      // translate so zoom is from centre of view
      translate = {
          x: render.options.width * scaleFactor * -0.5,
          y: render.options.height * scaleFactor * -0.5
      };

      Bounds.translate(render.bounds, translate);

      // update mouse
      // Mouse.setScale(mouse, boundsScale);
      // Mouse.setOffset(mouse, render.bounds.min);
  }
})

var renderOptions = render.options;
renderOptions.hasBounds = true;