import React, { useEffect } from 'react';
import Matter from "matter-js";
import chainpieces from '../resized/9kt_gold_short_chain_1.png';
import locket from '../resized/LC2130-Y (1) (2).png';
const Demo = () => {
    useEffect(() => {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Body = Matter.Body,
            Constraint = Matter.Constraint,
            Composite = Matter.Composite,
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
                width: 800,
                height: 600,
                // showAxes: true,
                // showConvexHulls: true
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var size = 200,
            x = 200,
            y = 200,
            partA = Bodies.rectangle(x, y, size, size / 5),
            partB = Bodies.rectangle(x, y, size / 5, size, { render: partA.render });
        size = 150;
        x = 400;
        y = 300;
        var compoundBodyB = Bodies.rectangle(x, y, 150, 150, {
            frictionAir: 0.005, render: {
                sprite: {
                    texture: `https://cdn.loquetlondon.com/media/catalog/product/cache/60eb685ba7fa125cc536e55016cf562a/1/_/1_yellow_gold_jupiter_locket_sprite_vo2.png`
                }
            }
        });
        var pendant = Bodies.rectangle(415, 15, 70, 90, {
            frictionAir: 0.005
        });
        var constraint = Constraint.create({
            pointA: { x: 400, y: 100 },
            bodyB: compoundBodyB,
            pointB: { x: 0, y: 0 }
        });
        Composite.add(world, [
            // compoundBodyA,
            compoundBodyB,
            constraint,
            Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true })
        ]);
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

        Composite.add(world, pendant, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
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

export default Demo;