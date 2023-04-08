import React, { useState } from "react"
import { Canvas } from "@react-three/fiber";

const Home = () => {
    const [rot, setRot] = useState(0);

    const setRotation = ( event: DeviceOrientationEvent) => {
        const val: number = event.gamma === null? 0 : event.gamma;
        setRot(val);
    }

    window.addEventListener("deviceorientation", event => setRotation(event) );
    
    return <>
        <Canvas onClick={()=>{setRot(rot+1)
        console.log(rot)}}>
            <mesh scale={[2,2,2]} rotation={[0,rot,0]}>
                <boxGeometry></boxGeometry>
                <meshBasicMaterial color={0xffffff}></meshBasicMaterial>
            </mesh>
        </Canvas>
    </>;
}

export default Home;