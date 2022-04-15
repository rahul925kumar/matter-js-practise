import React, { useState, useEffect } from 'react';
import Matter, { World } from "matter-js";
import chainpieces from '../resized/9kt_gold_short_chain_1.png';
import locket from '../resized/LC2130-Y (1) (2).png';
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
        var engine = Engine.create(),
            world = engine.world;
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 1000,
                height: 600,
                wireframes: false,
                background: '#fff'
            }
        });
        Render.run(render);
        var runner = Runner.create();
        Runner.run(runner, engine);
        var group = Body.nextGroup(true);
        var ropeA = Composites.stack(100, 10, 25, 1, -5, 15, function (x, y) {
            return Bodies.rectangle(x, 5, 30, 20, {
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
            pointB: { x: -20, y: 0 },
            pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
            stiffness: 0.1,
            length: 1,
        }));
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[24],
            pointB: { x: 0, y: -20 },
            pointA: { x: 400, y: 20 },
            stiffness: 0.5,
            length: 1,
        }));
        console.log(ropeA.bodies[12].position.x, ropeA.bodies[12].position.y)
        var pendant = Bodies.rectangle(415, 15, 70, 90, {
            frictionAir: 0.005, render: {
                sprite: {
                    texture: locket
                }
            }
        });
        // console.log("TEST===", ropeA)
        Composite.add( ropeA, Constraint.create({ 
            // bodyA : ropeA.bodies[12],           
            bodyB: pendant,
            pointB : {x : 0, y:0},
            pointA: { x: 275, y: 475 },
            length: 1,
        }));
        group = Body.nextGroup(true);
        Composite.add(world, [ropeA, pendant, Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true })]);
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

export default Chain;