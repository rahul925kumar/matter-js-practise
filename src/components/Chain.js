import React, { useEffect } from 'react';
import Matter from "matter-js";
import chainpieces from '../resized/9kt_gold_short_chain_1.png';
import locket from '../resized/LC2130-Y (1) (2).png';
import ImgSvg from '../resized/New-Project-_12_.svg';
import joint from '../resized/link (1).png';

const Chain = () => {
    useEffect(() => {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Body = Matter.Body,
            Composite = Matter.Composite,
            Composites = Matter.Composites,
            Constraint = Matter.Constraint,
            Common = Matter.Common,
            Svg = Matter.Svg,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Bodies = Matter.Bodies;
        var engine = Engine.create(),
            world = engine.world;
        Common.setDecomp(require('poly-decomp'));
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 1500,
                height: 600,
                wireframes: false,
                // background: '#fff'
            }
        });
        Render.run(render);
        var runner = Runner.create();
        Runner.run(runner, engine);
        var group = Body.nextGroup(true);
        var count = 0;
        var ropeA = Composites.stack(100, 10, 23, 1, -5, 15, function (x, y) {
            count++;
            if (count == '12') {
                return Bodies.circle(415, 15, 60, {
                    frictionAir: 0.005, render: {
                        sprite: {
                            texture: locket
                        }
                    }
                });
            } else {
                return Bodies.rectangle(x, 5, 30, 20, {
                    render: {
                        sprite: {
                            texture: chainpieces
                        }
                    }
                });
            }
        });
        Composites.chain(ropeA, 0.5, 0, -0.5, 0);
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[0],
            pointB: { x: -20, y: 0 },
            pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
            stiffness: 0.1,
            length: 1,
        }));
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[22],
            pointB: { x: 0, y: -20 },
            pointA: { x: 400, y: 20 },
            stiffness: 0.5,
            length: 1,
        }));
        /* var bodyA = Bodies.polygon(500, 400, 6, 30); */
        var bodyB = Bodies.polygon(600, 400, 7, 60); 
        var pendant = Bodies.rectangle(415, 15, 70, 90, {
            frictionAir: 0.005, render: {
                sprite: {
                    texture: locket
                }
            }
        });

        var constraint = Constraint.create({
            bodyA: ropeA.bodies[11],
            pointA: { x: 0, y: 0 },
            bodyB: pendant,
            pointB: { x: 0, y: 0 },
            stiffness: 0.002,
            damping: 0.1,
            length: 1.
        });

        /* Composite.add(ropeA, Constraint.create({
            bodyB: pendant,
            pointB: { x: 0, y: 0 },
            pointA: { x: 275, y: 475 },
            length: 1,
        })); */
        group = Body.nextGroup(true);
        Composite.add(world, [ropeA,  Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true })]);
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

       /*  if (typeof fetch !== 'undefined') {
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
                    console.log("TEST===", root);
                    var paths = select(root, 'path');
                    var vertexSets = paths.map(function (path) { return Svg.pathToVertices(path, 10); });
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
        } */

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 700, y: 600 }
        });
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function () {
                Matter.Render.stop(render);
                Matter.Runner.stop(runner);
            }
        };
    });
    return (
        <>
        </>
    )
}
export default Chain;