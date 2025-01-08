/* eslint-disable react/no-unknown-property */
"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import LoaderUi from "@/app/components/ui/LoaderUi";
import Model from "@/app/3Dpages/components/Model";
import { WallStore } from "@/app/store/3DWalls.store";

const ModelViewer: React.FC = () => {
  const { showWalls } = WallStore();

  return (
    <div className="relative">
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
          <Model modelPath="/elements/IUT_MEAUX.glb" showWalls={showWalls} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;