var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create();
var rest = 0.9,
    space = 600 / 5;

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

var locketImage = Bodies.rectangle(200, 200, 64, 64, {
    isStatic: true,
    render: {
        sprite: {
            texture: `https://cdn.shopify.com/s/files/1/0510/9488/0442/t/17/assets/550.png?v=1649064580`,
            desc: `TESTING`
        }
    }
});
World.add(engine.world, locketImage);

const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomIntInRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

// Add mouse constraint
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse
});
World.add(engine.world, mouseConstraint);

render.mouse = mouse;

const runner = Matter.Runner.create();
Matter.Events.on(mouseConstraint, "mousedown", event => {
    if (mouseConstraint.body) {
        if (mouseConstraint.body.isStatic == false) {
            Matter.Composite.remove(engine.world, mouseConstraint.body);

            let charm_id = mouseConstraint.body.render.sprite.productId;
            deleteCharmDiv(charm_id);
            //         console.log("====", charm_id)
            let charmsArray = JSON.parse(localStorage.getItem("charmsID"));
            for (let j = 0; j < charmsArray.length; j++) {
                if (charm_id == charmsArray[j]) {

                    charmsArray.splice(j, 1);
                    localStorage.setItem("charmsID", JSON.stringify(charmsArray))
                    break;
                }
            }
        }
    }
});

Matter.Runner.start(runner, engine);
Matter.Render.run(render);

const floor = Bodies.rectangle(200, 410, 400, 10, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'
    }
});
const leftWall = Bodies.rectangle(110, 200, 50, 425, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'
    }
});
const rightWall = Bodies.rectangle(425, 200, 330, 400, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'
    }
});
World.add(engine.world, [floor, rightWall, leftWall]);
const charmsArray = JSON.parse(localStorage.getItem("charmsID"));
for (let i = 0; i < charmsArray.length; i++) {
    const x = randomInRange(190, 230);
    let tagElement = document.getElementById(charmsArray[i])
    let imageSrc = tagElement.getAttribute("src")

    var productData = Charms.find(x => x.id === Number(charmsArray[i]))
    console.log("productData", productData)
    var charmImage = Bodies.rectangle(x, 350, 15, 15, {
        render: {
            sprite: {
                texture: productData.featured_image.src,
                productId: charmsArray[i]
            }
        },
        restitution: 0.5
    });
    //       World.add(engine.world, charmImage);
}


//   World.add(engine.world, ground);

function animateCharms(image) {
    //     console.log("image", image)
    var charmsArray = JSON.parse(localStorage.getItem("charmsID"));
    if (charmsArray.length < 5) {
        const x = randomInRange(200, 250);
        var charmImage = Bodies.rectangle(x, 350, 15, 15, {
            restitution: rest,
            render: {
                sprite: {
                    texture: image._element.currentSrc,
                    //           texture : `https://cdn.shopify.com/s/files/1/0510/9488/0442/t/17/assets/CC6104-Y-V1_100x_1.png?v=1649070885`,
                    productId: image._element.id
                }
            }
        });


        charmsArray.push(image._element.id);
        addToCartCharm(image._element.id)
        localStorage.setItem("charmsID", JSON.stringify(charmsArray))
        World.add(engine.world, charmImage);
    } else {
        alert("Can't add more than five Charms.")
        return false;
    }
}

function changeLocket(image, id) {

    console.log(image, id)
}

function deleteCharmDiv(charm_id) {
    let length = document.getElementsByClassName('charms').length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            let checkId = document.getElementsByClassName('charms')[i].getAttribute('id')
            if (checkId == charm_id) {
                document.getElementsByClassName('charms')[i].remove()
                break;
            }
        }
    }


}

var addCircle = function () {
    return Bodies.circle(Math.random() * 150 + 30, 30, 30);
};

Engine.run(engine);

Render.run(render);




function circleLocketScript() {

}


