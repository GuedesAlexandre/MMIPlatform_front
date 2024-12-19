/* eslint-disable react/no-unknown-property */
"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import LoaderUi from "@/app/components/ui/LoaderUi";

interface ModelProps {
  modelPath: string;
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
};

const ModelViewer: React.FC = () => {
  return (
    <Canvas
      style={{ height: "65vh", width: "75vw" }}
      className="shadow-lg border-[0.8px] border-placeholder-color rounded-lg mx-auto mb-auto"
      camera={{ position: [-100, 45, 75], fov: 35 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={7} />
      <directionalLight position={[-10, -10, -5]} intensity={3} />
      <Suspense
        fallback={
          <Html>
            <LoaderUi sizeCustome="size-[50px]" />
          </Html>
        }
      >
        <Model modelPath="/elements/IUT_MEAUX.glb" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
