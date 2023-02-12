/* eslint-disable react/display-name */
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

const Planets = forwardRef((props, ref) => {

  const { camera } = useThree();

  useImperativeHandle(ref, () => ({
    rotateLeft() {
      gsap.to(all.current.rotation, {
        duration: 0.5,
        y: all.current.rotation.y + Math.PI / 2,
      });
    },

    rotateRight() {
      gsap.to(all.current.rotation, {
        duration: 0.5,
        y: all.current.rotation.y - Math.PI / 2,
      });
    },

    resetRotation() {
      gsap.to(all.current.rotation, { duration: 0.8, y: 0 });
    },

    cameraFocus() {
      gsap.to(camera.position, { x: 30, y: 2, duration: 0.5 });
    },

    cameraBlur() {
      gsap.to(camera.position, { x: 40, y: 7, duration: 0.5 });
    },
  }));

  const earth = useRef();
  const cloud = useRef();
  const mercury = useRef();
  const mars = useRef();
  const venus = useRef();

  const all = useRef();

  const mutalHeight = -5;

  const geometry = new THREE.SphereGeometry(5, 100, 100);

  useFrame(() => {
    earth.current.rotation.y += 0.001;
    cloud.current.rotation.y += 0.0013;
    mars.current.rotation.y += 0.0005;
    venus.current.rotation.y += 0.0005;
    mercury.current.rotation.y += 0.0005;
  });

  return (
    <>
      <group ref={all}>
        <mesh
          ref={earth}
          castShadow={true}
          receiveShadow={true}
          geometry={geometry}
          material={
            new THREE.MeshPhongMaterial({
              map: useTexture("/images/earth.png"),
              bumpMap: useTexture("/images/earth-bump-map.png"),
              bumpScale: 15,
            })
          }
          position={[20, mutalHeight, 0]}
        />
        <mesh
          ref={cloud}
          geometry={new THREE.SphereGeometry(5.1, 100, 100)}
          material={
            new THREE.MeshStandardMaterial({
              map: useTexture("/images/earth-cloud-map.png"),
              transparent: true,
            })
          }
          position={[20, mutalHeight, 0]}
          castShadow={true}
          receiveShadow={true}
        />
        <mesh
          ref={mercury}
          castShadow={true}
          receiveShadow={true}
          geometry={geometry}
          material={
            new THREE.MeshStandardMaterial({
              map: useTexture("/images/mercury.png"),
              bumpMap: useTexture("/images/mercury-bump-map.png"),
              bumpScale: 0.2,
            })
          }
          position={[0, mutalHeight, 20]}
        />
        <mesh
          ref={venus}
          castShadow={true}
          receiveShadow={true}
          geometry={geometry}
          material={
            new THREE.MeshStandardMaterial({
              map: useTexture("/images/venus.png"),
              bumpMap: useTexture("/images/venus-bump-map.png"),
              bumpScale: 0.2,
            })
          }
          position={[-20, mutalHeight, 0]}
        />
        <mesh
          ref={mars}
          castShadow={true}
          receiveShadow={true}
          geometry={geometry}
          material={
            new THREE.MeshStandardMaterial({
              map: useTexture("/images/mars.png"),
              bumpMap: useTexture("/images/mars-bump-map.png"),
              bumpScale: 10,
            })
          }
          position={[0, mutalHeight, -20]}
        />
      </group>
    </>
  );
});

export default Planets;