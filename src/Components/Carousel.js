import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function CarouselScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x4d0d6e, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Create walls
    const wallGeometry = new THREE.PlaneGeometry(30, 73.0);
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.z = -15;
    wall2.position.z = 15;
    scene.add(wall1, wall2);

    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.z = -15;
    wall2.position.z = 15;
    wall3.rotation.y = Math.PI / 2;
    wall3.position.x = -15;
    wall4.rotation.y = Math.PI / 2;
    wall4.position.x = 15;
    scene.add(wall1, wall2, wall3, wall4);

    
    // Create the first circle geometry
    const radius = 5;
    const circleGeometry1 = new THREE.CircleGeometry(radius, 32);
    const circleMaterial1 = new THREE.MeshBasicMaterial({ color: 0x900000 });
    const circle1 = new THREE.Mesh(circleGeometry1, circleMaterial1);
    circle1.position.y = 0.5;
    circle1.rotation.x = -Math.PI / 2; // Rotate the circle to be parallel to the floor
    scene.add(circle1);
    // Create the circular bar
const barGeometry = new THREE.CylinderGeometry(radius * 0.9, radius * 0.9, 0.1, 32);
const barMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
const bar = new THREE.Mesh(barGeometry, barMaterial);
bar.position.y = 0.66; // Position it above the base
scene.add(bar);
    // Create the second circle geometry
const circleGeometry2 = new THREE.CircleGeometry(radius, 35);
const circleMaterial2 = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 0 });
const circle2 = new THREE.Line(circleGeometry2, circleMaterial2);
circle2.position.y = 0.2; // Slightly higher position to overlay the first circle
circle2.rotation.x = -Math.PI / 2; // Rotate the circle to be parallel to the floor
circle1.add(circle2);
const baseGeometry = new THREE.CylinderGeometry(radius * 1.2, radius * 1.2, 0.4, 32);
const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x60005D });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.y = 0.25; // Position it below the circle
scene.add(base);
// Add decorative lights
const light1 = new THREE.PointLight(0xff0000, 1, 5);
light1.position.set(radius * 1.2, 0, radius * 0.6);
scene.add(light1);

const light2 = new THREE.PointLight(0x00ff00, 1, 5);
light2.position.set(radius * 0.6, 0, radius * 1.2);
scene.add(light2);

const light3 = new THREE.PointLight(0x0000ff, 1, 5);
light3.position.set(-radius * 0.6, 0, radius * 1.2);
scene.add(light3);

const light4 = new THREE.PointLight(0xffff00, 1, 5);
light4.position.set(-radius * 1.2, 0, radius * 0.6);
scene.add(light4);

const light5 = new THREE.PointLight(0xff00ff, 1, 5);
light5.position.set(-radius * 1.2, 0, -radius * 0.6);
scene.add(light5);

const light6 = new THREE.PointLight(0x00ffff, 1, 5);
light6.position.set(-radius * 0.6, 0, -radius * 1.2);
scene.add(light6);

const light7 = new THREE.PointLight(0xffffff, 1, 5);
light7.position.set(radius * 0.6, 0, -radius * 1.2);
scene.add(light7);

const light8 = new THREE.PointLight(0xff00ff, 1, 5);
light8.position.set(radius * 1.2, 0, -radius * 0.6);
scene.add(light8);
// Create white spheres for the point lights
const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const lightSphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere1.position.copy(light1.position);
scene.add(lightSphere1);

const lightSphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere2.position.copy(light2.position);
scene.add(lightSphere2);

const lightSphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere3.position.copy(light3.position);
scene.add(lightSphere3);

const lightSphere4 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere4.position.copy(light4.position);
scene.add(lightSphere4);

const lightSphere5 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere5.position.copy(light5.position);
scene.add(lightSphere5);

const lightSphere6 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere6.position.copy(light6.position);
scene.add(lightSphere6);

const lightSphere7 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere7.position.copy(light7.position);
scene.add(lightSphere7);

const lightSphere8 = new THREE.Mesh(sphereGeometry, sphereMaterial);
lightSphere8.position.copy(light8.position);
scene.add(lightSphere8);



    // Create models
    const models = [];

    // Model 1
    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const model1 = new THREE.Mesh(geometry1, material1);
    models.push(model1);

    // Model 2
    const geometry2 = new THREE.BoxGeometry(1, 1, 1);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const model2 = new THREE.Mesh(geometry2, material2);
    models.push(model2);

    // Model 3
    const geometry3 = new THREE.BoxGeometry(1, 1, 1);
    const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const model3 = new THREE.Mesh(geometry3, material3);
    models.push(model3);

    // Model 4
    const geometry4 = new THREE.BoxGeometry(1, 1, 1);
    const material4 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const model4 = new THREE.Mesh(geometry4, material4);
    models.push(model4);

    // Model 5
    const geometry5 = new THREE.BoxGeometry(1, 1, 1);
    const material5 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const model5 = new THREE.Mesh(geometry5, material5);
    models.push(model5);

    // Add models to the second circle (circle2)
    models.forEach((model, index) => {
      const angle = (index / models.length) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      model.position.set(x, 0, z);
      circle2.add(model);
    });

    // Add the second circle (circle2) to the first circle (circle1)
    circle1.add(circle2);

    // Create the rectangle bisecting the carousel
    const rectangleGeometry = new THREE.PlaneGeometry(radius * 2.6, radius * 2.19);
    const rectangleMaterial = new THREE.MeshBasicMaterial({ color: 0x200060, side: THREE.DoubleSide });
    const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
    rectangle.position.y = 0.75; // Position it above the floor
    scene.add(rectangle);

    

    // Add OrbitControls with restricted camera movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2 -.08; // Restrict camera movement to not go below the floor
    controls.minDistance = radius + 5; // Minimum distance from the origin
    controls.maxDistance = radius + 4; // Maximum distance from the origin
    controls.minAzimuthAngle = -Math.PI / 2 +.1; // Restrict horizontal movement to the left half
    controls.maxAzimuthAngle = Math.PI / 2 -.1; // Restrict horizontal movement to the right half

    // Create lines from top center to model vertices
const topCenter = new THREE.Vector3(-1, 5, 8);

// Create a spotlight
const spotlightColor = 0xffffff;
const spotlightIntensity = 1;
const spotlightPosition = new THREE.Vector3(-1, 5, 8);
const spotlightTarget = new THREE.Vector3(0, 0, 0);

const spotlight = new THREE.SpotLight(spotlightColor, spotlightIntensity);
spotlight.position.copy(spotlightPosition);
spotlight.target.position.copy(spotlightTarget);
scene.add(spotlight);
scene.add(spotlight.target);

// Iterate through the models and create lines for each vertex
for (let i = 0; i < models.length; i++) {
  const model = models[i];
  const vertices = model.geometry.attributes.position;

  for (let j = 0; j < vertices.count; j++) {
    const vertex = new THREE.Vector3();
    vertex.fromBufferAttribute(vertices, j);
    vertex.applyMatrix4(model.matrixWorld); // Apply the model's world matrix

    const lineGeometry = new THREE.BufferGeometry().setFromPoints([topCenter, vertex]);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.Line(lineGeometry, lineMaterial);

    scene.add(line);
  }
}

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate models around their own centers
      models.forEach((model) => {
        model.rotation.y += 0.013;
        circle2.rotation.y += 0.0008
      });

      controls.update();

      renderer.render(scene, camera);
    }
    animate();

    // Clean up
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
}

export default CarouselScene;