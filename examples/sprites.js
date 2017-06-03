window.onload = () => { 
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Events = Matter.Events;


    // create engine
    let engine = Engine.create(),
        world = engine.world;

    // create renderer
    let render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: Math.min(document.documentElement.clientWidth, 1920),
            height: Math.min(document.documentElement.clientHeight, 1080),
            background: './img/back.png',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    let runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    const offset = 10;
    const options = { 
        isStatic: true
    };

    world.bodies = [];

    // these static walls will not be rendered in this sprites example, see options
    World.add(world, [
        Bodies.rectangle(400, 600, 800, 1, options)
    ]);

    addYasai =  function(mX, mY) {
      let yasai = Composites.stack(mX, mY, 1, 1, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 30, 30, {
          frictionAir: 0,
          friction: 0.7,
          render: {
            sprite: {
              texture: './img/yasai.png'
            },
          }
        })
      });
      World.add(world, yasai);
    }

    let jiro = Composites.stack(230, 525, 1, 1, 0, 0, function(x, y) {
      return Bodies.rectangle(x, y, 340, 140, {
        frictionAir: 0.3,
        friction: 0.7,
        render: {
          sprite: {
            texture: './img/don.png'
          },
        }
      })
    });

    World.add(world, jiro);


    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    Events.on(mouseConstraint, 'mousedown', function(event) {
      addYasai(event.mouse.mousedownPosition.x, event.mouse.mousedownPosition.y);
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};
