import React, { useState, useEffect } from 'react';
import Matter, { World } from "matter-js";

import ImgSvg from '../resized/New-Project-_1_.svg';


const Terrian = () => {
    console.log("===", ImgSvg)
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

        // provide concave decomposition support library
        Common.setDecomp(require('poly-decomp'));

        // create engine
        var engine = Engine.create(),
            world = engine.world;

        // create renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 1800,
                height: 600
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        if (typeof fetch !== 'undefined') {
            var select = function (root, selector) {
                return Array.prototype.slice.call(root.querySelectorAll(selector));
            };

            var loadSvg = function (url) {
                return fetch(url)
                    .then(function (response) { return response.text(); })
                    .then(function (raw) { return (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'); });
            };

            loadSvg('https://raw.githubusercontent.com/liabru/matter-js/014ef77d1e30b44cb65098c0efc9c9d623a40496/demo/svg/terrain.svg')
                .then(function (root) {
                    // console.log("")
                    var paths = select(root, 'path');
                    console.log("TEST===", paths);
                    var vertexSets = paths.map(function (path) {
                        console.log(path)
                        return Svg.pathToVertices(path, 30);
                    });

                    var terrain = Bodies.fromVertices(100, 350, vertexSets, {
                        isStatic: true,
                        render: {
                            fillStyle: 'transparent',
                            strokeStyle: '#060a19',
                            lineWidth: 1
                        }
                    }, true);

                    Composite.add(world, terrain);

                    var bodyOptions = {
                        frictionAir: 0,
                        friction: 0.0001,
                        restitution: 0.6
                    };
                    var count = 0;
                    Composite.add(world, Composites.stack(80, 100, 10, 20, 10, 10, function (x, y) {
                        if (Query.point([terrain], { x: x, y: y }).length === 0) {

                            return Bodies.polygon(x, y, 15, 15, bodyOptions);
                        }
                    }));
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

        Composite.add(world, mouseConstraint);

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
            <div id="test"> Hello </div>
        </>
    )
}


export default Terrian;
