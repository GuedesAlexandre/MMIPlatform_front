/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  modelPath: string;
  showWalls: boolean;
}

const Model: React.FC<ModelProps> = ({ modelPath, showWalls }) => {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (
        child.isMesh &&
        (child.name.startsWith("wall") || child.name.startsWith("window"))
      ) {
        child.visible = showWalls;

        if (showWalls && child.name.startsWith("window")) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0x88ccee),
            roughness: 0,
            metalness: 0.1,
            transmission: 0.9,
            transparent: true,
            opacity: 0.8,
            ior: 1.5,
            thickness: 0.25,
          });
        }
      }
    });
  }, [showWalls, scene]);

  return <primitive object={scene} />;
};

export default Model;