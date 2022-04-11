import React, { useState, useEffect } from 'react';
import Matter, { World } from "matter-js";
import locket from '../../src/resized/5502.png';
import charm from '../../src/resized/New-Project-_1_.svg';



const Test = () => {
    useEffect(() => {
        var Engine = Matter.Engine;
        var Render = Matter.Render;
        var Bodies = Matter.Bodies;
        var Mouse = Matter.Mouse;
        var MouseConstraint = Matter.MouseConstraint;
        var Events = Matter.Events;

        // 1. setup engine
        var engine = Engine.create();
        Engine.run(engine);

        // 2. setup render
        var render = Render.create({
            element: document.getElementById('test'),
            id: 'test',
            engine: engine,
            options: {
                width: 400,
                height: 600,
                background: '#fff',
                wireframes: false
            }
        });
        Render.run(render);

        // 3. get world from engine
        var world = engine.world;
        const DEGREES_TO_RADIANS = Math.PI / 180;
        const randomInRange = (min, max) => Math.random() * (max - min) + min;
        const randomIntInRange = (min, max) =>
            Math.floor(Math.random() * (max - min + 1) + min);

        var locketImage = Bodies.rectangle(200, 200, 64, 64, {
            isStatic: true,
            render: {
                sprite: {
                    texture: locket
                }
            }
        })
        World.add(world, locketImage);

        // var box1 = Bodies.rectangle(180, 350, 15, 15, {
        //     render: {
        //         sprite: {
        //             texture: charm
        //         }
        //     }
        // });
        // World.add(world, box1);

        // document.querySelector("canvas").addEventListener("mousedown", () => {
        //     for (let i = 0; i < 1; i++) {
        //         const x = randomInRange(200, 250);
        //         const y = randomInRange(330, 340);
        //         const radius = randomInRange(10, 20);
        //         const sides = randomIntInRange(3, 6);
        //         console.log(x, y, radius, sides);
        //         const body = Bodies.rectangle(x, y, 15, 15, {
        //             render: {
        //                 sprite: {
        //                     texture: charm
        //                 }
        //             }
        //         });
        //         World.add(engine.world, body);
        //     }
        // });


        const floor = Bodies.rectangle(200, 410, 400, 0.5, {
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

        World.add(world, [floor, rightWall, leftWall]);

        var colorA = '#f55a3c',
            colorB = '#f5d259'
        var circle1 = Bodies.circle(200, 350, 55, {
            isStatic: true,
            isSensor: true,
            render: {
                fillStyle: 'transparent',
                lineWidth: 1
            }
        });
        World.add(world, circle1);

        // Add mouse constraint
        var mouse = Mouse.create(render.canvas);
        var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse
        });
        const body = Bodies.circle(180, 280, 60, {
            render: {
                sprite: {
                    texture: charm,
                    wireframes: false
                }
            }
        });
        // World.add(engine.world, body);
        World.add(world, mouseConstraint);
        // keep the mouse in sync with rendering
        render.mouse = mouse;
        console.log(mouseConstraint)

        Events.on(mouseConstraint, "tick", event => {
            console.log("Hello")
            var source = event.source;
            var mouse = event.mouse;

            if (source.body === null) {
                var box = Bodies.rectangle(mouse.position.x, mouse.position.y, 20, 20, {
                    render: {
                        sprite: {
                            texture: `https://cdn.shopify.com/s/files/1/0510/9488/0442/products/LC2133-Y-V1.jpg?v=1637979113`
                        }
                    }
                });
                World.add(world, box);
            }
        });

        // button.addEventListener('click', event => {
        //     event.preventDefault();
        //     World.clear(world);
        //     Engine.clear(engine);
        //     Render.stop(render);
        //     Runner.stop(runner);
        //     render.canvas.remove();
        //     render.canvas = null;
        //     render.context = null;
        //     render.textures = {};
        //     console.log('reset clicked');
        //     document.querySelector('.winner').classList.add('hidden');
        //     document.querySelector('.options').classList.remove('hidden');
        // });

        const runner = Matter.Runner.create();
        Matter.Events.on(runner, "tick", event => {
            if (mouseConstraint.body) {
                if (mouseConstraint.body.isStatic == false) {
                    console.log("mouseConstraint", mouseConstraint.body)
                    // Matter.Composite.remove(engine.world, mouseConstraint.body);
                }
            }
        });
        Matter.Runner.start(runner, engine);
        Matter.Render.run(render);


        function create1x3Block(x, y) {
            const box = Bodies.rectangle(50, 50, 70, 220, {
                render: {
                    fillStyle: "brown"
                }
            });
            // World.add(world, box);
        }

        create1x3Block();
    });

    return (
        <>
            <div id="test"></div>
        </>
    )
}


export default Test;
