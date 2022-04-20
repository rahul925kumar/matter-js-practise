import React, { useEffect } from 'react';
import Matter from "matter-js";
import chainpieces from '../resized/9kt_gold_short_chain_1 (1).png';
// import locket from '../resized/LC2130-Y (3) (1).png';
import loquet from '../resized/rectabgle_loquet.png';
/* import ImgSvg from '../resized/New-Project-_12_.svg';*/
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
                // background: '#fff'
            }
        });
        Render.run(render);
        var runner = Runner.create();
        Runner.run(runner, engine);
        var group = Body.nextGroup(true);
        var count = 0;
        var ropeA = Composites.stack(100, 10, 19, 1, -5, 15, function (x, y) {
            // count++;
            // if (count == '9') {
            //     return Bodies.rectangle(x, 5, 25, 10, {
            //         collisionFilter: { group },
            //         render: {
            //             sprite: {
            //                 texture: chainpieces
            //             }
            //         }
            //     });
            // } else {
            return Bodies.rectangle(x, 5, 15, 20, {
                collisionFilter: { group },
                render: {
                    sprite: {
                        texture: chainpieces
                    }
                }
            });
            // }
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
            render: { visible: true },
        }));
        Composite.add(ropeA, Constraint.create({
            bodyB: ropeA.bodies[18],
            pointB: { x: 0, y: -20 },
            pointA: { x: 250, y: 10 },
            stiffness: 0.45,
            length: 0,
            render: { visible: true },
        }));
        var locket = Bodies.rectangle(400, 400, 100, 100, {
            collisionFilter: { group: -1 },
            static: true,
            render: {
                sprite: {
                    // texture: loquet
                }
            }
        });
        var constraint1 = Constraint.create({
            bodyA: ropeA.bodies[8],
            pointA: { x: 0, y: 0 },
            bodyB: locket,
            pointB: { x: 0, y: -30 },
            length: 40,
            render: { visible: false },
            // stiffness: 0.1
        });




        
        var chainJoint = Bodies.rectangle(400, 200, 25, 10, {
            collisionFilter: { group },
            render: {
                sprite: {
                    texture: joint
                }
            }
        });





        // Composite.add(world, [locket, constraint1]);
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
export default Chain;