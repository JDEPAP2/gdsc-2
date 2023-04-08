import React from "react"
import { Canvas, mesh } from "@react-three/fiber";

const Home = () => {
    return <>
        <Canvas>
            <mesh scale={[2,2,2]}>
                <boxGeometry></boxGeometry>
                <meshStandardMaterial></meshStandardMaterial>
            </mesh>
        </Canvas>
    </>
}

export default Home;