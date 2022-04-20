import React, { useEffect } from 'react';
import Matter, { Svg, Query, stack } from "matter-js";
import chainpieces from '../resized/9kt_gold_short_chain_1.png';
import loquet from '../resized/rectabgle_loquet.png';
import ImgSvg from '../resized/New-Project-_12_.svg';

const Demo = () => {
    useEffect(() => {
        var Engine = Matter.Engine,
            Events = Matter.Events,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Body = Matter.Body,
            Composite = Matter.Composite,
            Composites = Matter.Composites,
            Constraint = Matter.Constraint,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Bodies = Matter.Bodies,
            Vector = Matter.Vector;

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
                wireframes: false
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var group = Body.nextGroup(true),
            length = 200,
            width = 25;

        var pendulum = Composites.stack(350, 160, 2, 1, -20, 0, function (x, y) {
            return Bodies.rectangle(x, y, length, width, {
                collisionFilter: { group: group },
                frictionAir: 0,
                chamfer: 5,
                render: {
                    fillStyle: 'transparent',
                    lineWidth: 1
                }
            });
        });

        // engine.gravity.scale = 0.002;

        Composites.chain(pendulum, 0.5, 0, -0.5, 0, {
            stiffness: 0.9,
            length: 0,
            angularStiffness: 0.7,
            render: {
                strokeStyle: '#4a485b'
            }
        });

        Composite.add(pendulum, Constraint.create({
            bodyB: pendulum.bodies[0],
            pointB: { x: -length * 0.42, y: 0 },
            pointA: { x: pendulum.bodies[0].position.x - length * 0.42, y: pendulum.bodies[0].position.y },
            // stiffness: 0.9,
            length: 0,
            render: {
                strokeStyle: '#4a485b'
            }
        }));
        var lowerArm = pendulum.bodies[1];
        // Body.rotate(lowerArm, -Math.PI * 0.3, {
        //     x: lowerArm.position.x - 100,
        //     y: lowerArm.position.y
        // });
        Composite.add(world, pendulum);
        var trail = [];

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

        Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

       
    })
    return (
        <>

        </>
    )
}

export default Demo;