import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const scene = new THREE.Scene(); // <Canvas>

const group = new THREE.Group(); // <group>

const mesh = new THREE.Mesh(); // <mesh />
const material = new THREE.MeshNormalMaterial(); // <meshNormalMaterial />
const geometry = new THREE.BoxGeometry(2, 2, 2); // <boxGeometry />

mesh.material = material;
mesh.geometry = geometry;

scene.background = new THREE.Color(0xffffff);

group.add(mesh);
scene.add(group);
const myBox = new THREE.BoxGeometry(1, 2, 3);

function Cylinder3d(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={event => click(!clicked)}
      onPointerOver={event => hover(true)}
      onPointerOut={event => hover(false)}
    >
      {/* <cylinderGeometry args={[1, 1, 1]} /> */}
      <meshStandardMaterial
        wireframe={props.wireframe}
        color={hovered ? "hotpink" : "orange"}
      />
      <sphereGeometry args={[1, 20, 20]} />
    </mesh>
  );
}

export default Cylinder3d;
