import React, { useEffect } from 'react';
import Matter from "matter-js";
import chainpieces from '../resized/9kt_gold_short_chain_1.png';
import locket from '../resized/LC2130-Y (1) (1).png';
import ImgSvg from '../resized/New-Project-_12_.svg';
import joint from '../resized/LC2130-Y (2) (4).png';

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
            Query = Matter.Query,
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
                height: 800,
                wireframes: false,
                background: '#fff'
            }
        });
        Render.run(render);
        var runner = Runner.create();
        Runner.run(runner, engine);
        var group = Body.nextGroup(true);
        var count = 0;
        var ropeA = Composites.stack(100, 10, 19, 1, -5, 15, function (x, y) {
            count++;
            if (count == '9') {
                return Bodies.circle(x, 15, 10, {
                    frictionAir: 0.005, render: {
                        sprite: {
                            texture: joint
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
            bodyB: ropeA.bodies[18],
            pointB: { x: 0, y: -20 },
            pointA: { x: 400, y: 20 },
            stiffness: 0.5,
            length: 1,
        }));
        var bodyB = Bodies.circle(400, 400, 60, {
            collisionFilter: { group: -1 },
            static: true,
            render: {
                sprite: {
                    texture: locket
                }
            }
        });
        var constraint1 = Constraint.create({
            bodyA: ropeA.bodies[8],
            pointA: { x: 0, y: 0 },
            bodyB: bodyB,
            pointB: { x: -10, y: 10 },
            length: 40,
            stiffness: 0.03
        });


        Composite.add(world, [bodyB, constraint1]);

        group = Body.nextGroup(true);
        Composite.add(world, [ropeA, Bodies.rectangle(400, 600, 1700, 50.5, { isStatic: true })]);
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
                    var terrain = Bodies.fromVertices(200, 310, vertexSets, {
                        //  isStatic: true,
                        render: {
                            fillStyle: 'transparent',
                            strokeStyle: '#fff',
                            lineWidth: 1
                        }
                    }, true);
                    // return terrain;
                    // Composite.add(engine.world, terrain);
                    var bodyOptions = {
                        frictionAir: 0,
                        friction: 0.0001,
                        restitution: 0.6
                    };
                    Composite.add(world, Composites.stack(80, 100, 10, 20, 10, 10, function (x, y) {
                        if (Query.point([terrain], { x: x, y: y }).length === 0) {
                            return Bodies.rectangle(x, y, 15, 15, bodyOptions);
                        }
                    }));
                });
        } else {
            Common.warn('Fetch is not available. Could not load SVG.');
        }

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