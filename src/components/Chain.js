import React, { useState, useEffect } from 'react';
import Matter, { World } from "matter-js";
import chainpieces from '../resized/9kt_gold_short_chain_1.png';
const Chain = () => {
    useEffect(() => {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Body = Matter.Body,
            Composite = Matter.Composite,
            Composites = Matter.Composites,
            Constraint = Matter.Constraint,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Bodies = Matter.Bodies;

        // create engine
        var engine = Engine.create(),
            world = engine.world;

        // create renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 1500,
                height: 600,
                // showAngleIndicator: true,
                // showCollisions: true,
                // showVelocity: true,
                wireframes: false,
                background: '#fff'
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var group = Body.nextGroup(true);

        var ropeA = Composites.stack(100, 50, 20, 1, 5, 5, function (x, y) {
            return Bodies.rectangle(x, y, 30, 10, {
                render: {
                    sprite: {
                        texture: chainpieces
                    }
                }
            });
        });

        Composites.chain(ropeA, 0.5, 0, -0.5, 0);
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[0],
            pointB: { x: -25, y: 0 },
            pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
            stiffness: 0.1,
        }));
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[19],
            pointB: { x: 25, y: 0 },
            pointA: { x: 400, y: -45 },
            stiffness: 0.1,
        }));
        console.log("ropeA.bodies[0]", ropeA.bodies[19].position.y)
        group = Body.nextGroup(true);
        var ball = Bodies.circle(100, 400, 50, { frictionAir: 0.005 });
        Composite.add(world, [ropeA, ball, Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true })]);
        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        // visible: false
                    }
                }
            });
        Composite.add(world, mouseConstraint);
        // keep the mouse in sync with rendering
        render.mouse = mouse;
        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 700, y: 600 }
        });
        // context for MatterTools.Demo
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