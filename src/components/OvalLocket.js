import React, { useState, useEffect } from 'react';
import Matter, { World } from "matter-js";
// import locket from '../resized/New-Project-_4_heart.svg';
import ImgSvg from '../resized/New-Project-_34_.svg';
import locket from '../resized/oval_locket.png';
import heartSvg from '../resized/heart.svg';


const OvalLocket = () => {
    useEffect(() => {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Query = Matter.Query,
            Svg = Matter.Svg,   
            Bodies = Matter.Bodies;
        var Events = Matter.Events;
        // 1. setup engine
        var engine = Engine.create();
        Engine.run(engine);
        Common.setDecomp(require('poly-decomp'));

        // 2. setup render
        var render = Render.create({
            element: document.getElementById('test'),
            id: 'test',
            engine: engine,
            options: {
                width: 400,
                height: 400,
                background: locket,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                wireframes: false
            },
                
        });
        Render.run(render);
        var locketImage = Bodies.rectangle(200, 200, 200, 300, {
            isStatic: true,
            render: {
                sprite: {
                    texture: locket,
                    wireframes: '#14151f'
                }
            }
        })
        var mouse = Mouse.create(render.canvas);
        var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse
        });
        World.add(engine.world, mouseConstraint);
        // keep the mouse in sync with rendering
        render.mouse = mouse;

        Events.on(mouseConstraint, "tick", event => {
            console.log("Hello")
            var source = event.source;
            var mouse = event.mouse;

            if (source.body === null) {
                var box = Bodies.rectangle(mouse.position.x, mouse.position.y, 20, 20, {
                    render: {
                        sprite: {
                            texture: `https://cdn.shopify.com/s/files/1/0510/9488/0442/products/LC2133-Y-V1.jpg?v=1637979113`,
                        }
                    }
                });
                World.add(engine.world, box);
            }
        });
        var box = Bodies.rectangle(200, 320, 15, 15, {
            render: {
                sprite: {
                    // texture: `https://cdn.shopify.com/s/files/1/0510/9488/0442/t/17/assets/CC6104-Y-V1_100x_1.png?v=1649070885`
                }
            }
        });
        var box2 = Bodies.rectangle(200, 320, 15, 15, {
            render: {
                sprite: {
                    // texture: `https://cdn.shopify.com/s/files/1/0510/9488/0442/t/17/assets/CC6104-Y-V1_100x_1.png?v=1649070885`
                }
            }
        });
        var box3 = Bodies.rectangle(200, 320, 15, 15)
        var box4 = Bodies.rectangle(200, 320, 15, 15)
        var box5 = Bodies.rectangle(200, 320, 15, 15)
        World.add(engine.world, [box, box3, box4, box5]);
        World.add(engine.world, box2);
        const floor = Bodies.rectangle(200, 470, 400, 10, {
            isStatic: true,
            render: {
                // fillStyle: 'transparent'
            }
        });
        World.add(engine.world, floor);
        // World.add(engine.world, locketImage);
        if (typeof fetch !== 'undefined') {
            var select = function (root, selector) {
                return Array.prototype.slice.call(root.querySelectorAll(selector));
            };
            var loadSvg = function (url) {
                return fetch(url)
                    .then(function (response) { return response.text(); })
                    .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
            };

            loadSvg(ImgSvg)
                .then(function (root) {
                    var paths = select(root, 'path');
                    var vertexSets = paths.map(function (path) { return Svg.pathToVertices(path, 10); });
                    console.log("TEST===", paths);

                    var terrain = Bodies.fromVertices(200, 310, vertexSets, {
                        isStatic: true,
                        render: {
                            fillStyle: 'transparent',
                            strokeStyle: '#060a19',
                            lineWidth: 1
                        }
                    }, true);

                    Composite.add(engine.world, terrain);


                });
        } else {
            Common.warn('Fetch is not available. Could not load SVG.');
        }

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });
        Composite.add(engine.world, mouseConstraint);
        // keep the mouse in sync with rendering
        render.mouse = mouse;
    });

    return (
        <>
            <div id="test"> Oval Locket Component</div>
        </>
    )
}
export default OvalLocket;
