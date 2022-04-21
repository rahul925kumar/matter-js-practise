import React, { useEffect } from 'react';
import Matter from "matter-js";

const Demo = () => {
    useEffect(() => {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Body = Matter.Body,
            Composite = Matter.Composite,
            Composites = Matter.Composites,
            Constraint = Matter.Constraint,
            Common = Matter.Common,
            // Svg = Matter.Svg,
            // Query = Matter.Query,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Bodies = Matter.Bodies;
        var engine = Engine.create({
            constraintIterations: 10
        }),
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
        var ropeA = Composites.stack(100, 10, 19, 1, -5, 15, function (x, y) {

            return Bodies.rectangle(x, 5, 15, 20, {
                collisionFilter: { group: group },
                render: {
                    sprite: {
                        texture: chainpieces,
                        xScale: 0.5,
                        yscale: 0.3
                    }
                }
            });
        });
        Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
            render: {
                visible: false
            }
        });
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[0],
            pointB: { x: -20, y: 0 },
            pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
            stiffness: 0.45,
            length: 0,
            render: { visible: false },
        }));
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[18],
            pointB: { x: 0, y: -20 },
            pointA: { x: 250, y: 10 },
            stiffness: 0.45,
            length: 0,
            render: { visible: false },
        }));
        var locket = Bodies.rectangle(400, 400, 100, 100, {
            collisionFilter: { group: -1 },
            static: true,
            render: {
                sprite: {
                    texture: loquet
                }
            }
        });
        // engine.timing.timeScale = 0.1;
        var chainJoint = Bodies.rectangle(400, 200, 25, 10, {
            // collisionFilter: { group },
            static: true,
            render: {
                sprite: {
                    texture: joint,
                    xScale: -0.3,
                    yScale: -0.3
                }
            }
        });
        var jointConstraint = Constraint.create({
            bodyA: ropeA.bodies[9],
            pointA: { x: 0, y: 0 },
            bodyB: chainJoint,
            pointB: { x: 0, y: 10 },
            length: 0,
            render: { visible: false },
            stiffness: 0.5
        });
        var constraint1 = Constraint.create({
            bodyA: chainJoint,
            pointA: { x: 0, y: 0 },
            bodyB: locket,
            pointB: { x: 0, y: -70 },
            length: 0,
            render: { visible: false },
            static: true,
            stiffness: 1.0
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
        Composite.add(world, [chainJoint, jointConstraint, constraint1, locket]);
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

export default Demo;