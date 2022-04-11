var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint;
var engine = Engine.create();
var render = Render.create({
    element: document.getElementById('canvas-container'),
    engine: engine,
    options: {
        width: 400,
        height: 600,
        background: '#fff',
        wireframes: false
    }
});
const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomIntInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

// Add mouse constraint
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse
});
World.add(engine.world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;
const runner = Matter.Runner.create();
Matter.Events.on(runner, "tick", event => {
    if (mouseConstraint.body) {
        if (mouseConstraint.body.isStatic == false) {
            Matter.Composite.remove(engine.world, mouseConstraint.body);
            let charm_id = mouseConstraint.body.render.sprite.productId;
            let charmsArray = JSON.parse(localStorage.getItem("charmsID"));
            for (let j = 0; j < charmsArray.length; j++) {
                if (charm_id == charmsArray[j]) {
                    console.log("====", charm_id)
                    //         	charmsArray.pop(charm_id);
                    charmsArray.splice(j, 1);
                    localStorage.setItem("charmsID", JSON.stringify(charmsArray))
                    console.log("True")
                    return false;
                }
            }
        }
    }
});
Matter.Runner.start(runner, engine);
Matter.Render.run(render);
const charmsArray = JSON.parse(localStorage.getItem("charmsID"));
const ground = Bodies.rectangle(400, 200, 810, 15, { isStatic: true, background: '#fff' });
for (let i = 0; i < charmsArray.length; i++) {
    const x = randomInRange(50, 550);
    const y = randomInRange(0, 50);
    const radius = randomInRange(25, 50);
    const sides = randomIntInRange(3, 6);
    let tagElement = document.getElementById(charmsArray[i])
    let imageSrc = tagElement.getAttribute("src")
    var charmImage = Bodies.rectangle(x, y, radius, sides, {
        render: {
            sprite: {
                texture: imageSrc,
                productId: charmsArray[i]
            }
        },
        restitution: 0.5
    });
    World.add(engine.world, charmImage);
}
World.add(engine.world, ground);
function animateCharms(image) {
    const x = randomInRange(50, 750);
    const y = randomInRange(0, 50);
    const radius = randomInRange(25, 50);
    const sides = randomIntInRange(3, 6);
    console.log("===", image)
    var charmImage = Bodies.rectangle(x, y, radius, sides, {
        render: {
            sprite: {
                texture: image._element.currentSrc,
                productId: image._element.id
            }
        }
    });
    var charmsArray = JSON.parse(localStorage.getItem("charmsID"));
    charmsArray.push(image._element.id);
    localStorage.setItem("charmsID", JSON.stringify(charmsArray))
    World.add(engine.world, charmImage);
}
Engine.run(engine);
Render.run(render);