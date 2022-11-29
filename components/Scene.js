// import { useFrame } from '@react-three/fiber'
// import useSpline from '@splinetool/r3f-spline'
// import { OrthographicCamera, Mask, Html } from '@react-three/drei'
import useMousePosition from '../hooks/useMousePosition'
import { useEffect, useState, useRef } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
// import { BackSide, Vector3, MathUtils } from 'three'
import { useSpring, animated, easings } from '@react-spring/three'
// import Embed from '../components/Embed'

const headRotationMulti = 0.25
const bodyRotationMulti = 0.1

const lerpFactor = 0.05 // Higher value = faster lerp

const Scene = ({ zoom, currentSpeechBox, ...props }) => {
  // const { nodes, materials } = useSpline(
  //   'https://prod.spline.design/23zzRH2Ogn3ixUwa/scene.splinecode'
  // )

  // const color = useColorModeValue('#F8F4FF', '#0C0B14')
  // const mousePosition = useMousePosition()
  // const [hover, setHover] = useState(false)

  // const sceneObj = useRef()
  // const characterObj = useRef()
  // const headObj = useRef()
  // const eyesObj = useRef()
  // const eyebrowObj = useRef()
  // const mouthObj = useRef()
  // const bodyObj = useRef()
  // const regClothes = useRef()
  // const logoClothes = useRef()
  // const phoneObj = useRef()

  // const { position } = useSpring({
  //   position: currentSpeechBox > 1 ? [0, 250, 0] : [0, 0, 0],
  //   config: {
  //     duration: 1000,
  //     easing: easings.easeInOutBack
  //   }
  // })

  // // Rotate the head and body whenever the mouse position changes
  // useEffect(() => {
  //   // Get the width and height of the window
  //   const windowWidth = window.innerWidth
  //   const windowHeight = window.innerHeight

  //   // Get the center coordinates of the window
  //   const centerXCoordinate = windowWidth / 2
  //   const centerYCoordinate = windowHeight / 2
  //   // Ensure that the reference to the spline object is set
  //   if (headObj.current && bodyObj.current) {
  //     // Rotate the head and body on the y and x axis based on mouse position and multipliers
  //     headObj.current.rotation.y =
  //       ((mousePosition.x - centerXCoordinate) * headRotationMulti * 2.5) /
  //       windowWidth
  //     headObj.current.rotation.x =
  //       ((mousePosition.y - centerYCoordinate) * headRotationMulti) /
  //       windowHeight

  //     bodyObj.current.rotation.y =
  //       ((mousePosition.x - centerXCoordinate) * bodyRotationMulti * 2.5) /
  //       windowWidth
  //     bodyObj.current.rotation.x =
  //       ((mousePosition.y - centerYCoordinate) * bodyRotationMulti) /
  //       windowHeight
  //   }

  //   if (phoneObj.current) {
  //     phoneObj.current.rotation.y =
  //       ((mousePosition.x - centerXCoordinate) * bodyRotationMulti * 3) /
  //       windowWidth
  //     phoneObj.current.rotation.x =
  //       ((mousePosition.y - centerYCoordinate) * bodyRotationMulti * 1.5) /
  //       windowHeight
  //   }
  // }, [mousePosition])

  // useFrame(state => {
  //   // Aninmate the eyes getting tighter
  //   eyesObj.current.scale.y = hover
  //     ? MathUtils.lerp(eyesObj.current.scale.y, 0.45, lerpFactor)
  //     : MathUtils.lerp(eyesObj.current.scale.y, 1, lerpFactor)

  //   // Animate eyebrows getting wider
  //   eyebrowObj.current.scale.x = hover
  //     ? MathUtils.lerp(eyebrowObj.current.scale.x, 1.12, lerpFactor)
  //     : MathUtils.lerp(eyebrowObj.current.scale.x, 1, lerpFactor)

  //   // Animate eyebrows raising and lowering
  //   eyebrowObj.current.position.y = hover
  //     ? MathUtils.lerp(eyebrowObj.current.position.y, 35.81, lerpFactor)
  //     : MathUtils.lerp(eyebrowObj.current.position.y, 31.82, lerpFactor)

  //   // Animate mouth y position
  //   mouthObj.current.position.y = hover
  //     ? MathUtils.lerp(mouthObj.current.position.y, -22.41, lerpFactor)
  //     : MathUtils.lerp(mouthObj.current.position.y, -10.41, lerpFactor)

  //   // Animate mouth scale x position
  //   mouthObj.current.scale.x = hover
  //     ? MathUtils.lerp(mouthObj.current.scale.x, 0.5, lerpFactor)
  //     : MathUtils.lerp(mouthObj.current.scale.x, 1, lerpFactor)

  //   // Animate mouth scale y position
  //   mouthObj.current.scale.y = hover
  //     ? MathUtils.lerp(mouthObj.current.scale.y, 0.5, lerpFactor)
  //     : MathUtils.lerp(mouthObj.current.scale.y, 1, lerpFactor)

  // // Swap clothes based on current speech box
  // if (currentSpeechBox !== 1) {
  //   regClothes.current.scale.lerp(new Vector3(0, 0, 0), lerpFactor)
  //   logoClothes.current.scale.lerp(new Vector3(1, 1, 1), lerpFactor)
  // } else {
  //   regClothes.current.scale.lerp(new Vector3(1, 1, 1), lerpFactor)
  //   logoClothes.current.scale.lerp(new Vector3(0, 0, 0), lerpFactor)
  // }

  // // Animate the phone into view and remove character
  // if (currentSpeechBox === 3) {
  //   phoneObj.current.scale.lerp(new Vector3(5, 5, 5), lerpFactor) // Scale in phone
  //   phoneObj.current.position.lerp(new Vector3(0, 0, 0), lerpFactor) // Move phone to center
  //   characterObj.current.scale.lerp(new Vector3(0, 0, 0), lerpFactor)
  // } else {
  //   phoneObj.current.scale.lerp(new Vector3(0, 0, 0), lerpFactor) // Scale out phone
  //   phoneObj.current.position.lerp(new Vector3(0, -200, 0), lerpFactor) // Move phone out of view
  //   characterObj.current.scale.lerp(new Vector3(1, 1, 1), lerpFactor)
  // }
  // })

  return (
    <>
      {/* <group ref={sceneObj} {...props} dispose={null}>
        <directionalLight
          name="Directional Light 2"
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          color="#887bc2"
          position={[239.83, -277.78, 204.17]}
          rotation={[0, 0, -0.48]}
          scale={1}
        />
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.35}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          position={[-254.61, 269.33, 300]}
        />
        <mesh
          name="floor"
          userData={{ type: 'floor' }}
          position={[0, -200, -50]}
          rotation={[Math.PI / 1.1, 0, 0]}
          castShadow
          receiveShadow>
          <planeGeometry args={[10000, 10000, 1, 1]} />
          <meshLambertMaterial color={color} side={BackSide} />
        </mesh>

        <group ref={phoneObj} name="Phone" position={[0, -200, 0]}>
          <mesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials['Body Material']}
            castShadow
            receiveShadow
            position={[-0.23, -0.31, -3.14]}
            scale={[1.09, 1, 3.01]}
          />
          <Mask
            id={1}
            name="Screen"
            geometry={nodes.Screen.geometry}
            castShadow
            receiveShadow
            position={[-0.22, -0.55, 3.14]}>
            <Html scale={10} transform>
              <Embed />
            </Html>
          </Mask>
        </group>
        <animated.group
          ref={characterObj}
          name="Character"
          position={position}
          onPointerEnter={() => {
            setHover(true)
          }}
          onPointerLeave={() => {
            setHover(false)
          }}>
          <group ref={bodyObj} name="Lower Body" position={[7.56, -6, -0.72]}>
            <mesh
              ref={logoClothes}
              name="Logo"
              geometry={nodes.Logo.geometry}
              material={materials['Cloth with logo']}
              castShadow
              receiveShadow
              position={[0.93, -131.51, -0.41]}
              scale={[0, 0, 0]}
            />
            <mesh
              ref={regClothes}
              name="Regular"
              geometry={nodes.Regular.geometry}
              material={materials.Cloth}
              castShadow
              receiveShadow
              position={[0.93, -131.51, -0.41]}
              scale={[1, 1, 1]}
            />
            <mesh
              name="Body1"
              geometry={nodes.Body1.geometry}
              material={materials.Skin}
              castShadow
              receiveShadow
              position={[0.93, -131.51, -0.41]}
            />
          </group>
          <group ref={headObj} name="Head" position={[7.6, 12.21, 7.37]}>
            <mesh
              ref={mouthObj}
              name="Mouth"
              geometry={nodes.Mouth.geometry}
              material={materials['Mouth Material']}
              castShadow
              receiveShadow
              position={[0.18, -10.41, 51.26]}
              rotation={[0, 0, 2.53]}
              scale={1}
            />
            <group ref={eyesObj} name="Eyes" position={[0.72, 7.56, 51.17]}>
              <mesh
                name="Left"
                geometry={nodes.Left.geometry}
                material={materials['Left Material']}
                castShadow
                receiveShadow
                position={[-24.54, -0.38, -0.7]}
                rotation={[-0.03, 0, 0]}
                scale={[1, 1, 0.75]}
              />
              <mesh
                name="Right"
                geometry={nodes.Right.geometry}
                material={materials['Right Material']}
                castShadow
                receiveShadow
                position={[24.54, 0.38, 0.7]}
                rotation={[-0.03, 0, 0]}
                scale={[1, 1, 0.75]}
              />
            </group>
            <group name="Hair" position={[0, 40.87, 0]}>
              <mesh
                name="Left1"
                geometry={nodes.Left1.geometry}
                material={materials.Hair}
                castShadow
                receiveShadow
                position={[-34.32, -0.14, -4]}
              />
              <mesh
                name="Right1"
                geometry={nodes.Right1.geometry}
                material={materials.Hair}
                castShadow
                receiveShadow
                position={[34.32, -0.25, -4]}
                scale={[-1, 1, 1]}
              />
            </group>
            <group name="Glasses" position={[1.75, 7.25, 19.28]}>
              <mesh
                name="Bridge"
                geometry={nodes.Bridge.geometry}
                material={materials.Glasses}
                castShadow
                receiveShadow
                position={[-0.31, 0.66, 38.45]}
                rotation={[0, 0, Math.PI / 2]}
                scale={[0.66, 0.15, 0.58]}
              />
              <mesh
                name="Right Stem"
                geometry={nodes['Right Stem'].geometry}
                material={materials.Glasses}
                castShadow
                receiveShadow
                position={[59.07, 10.81, -0.39]}
                rotation={[1.74, -0.06, 0.24]}
                scale={[1, 1.31, 1]}
              />
              <mesh
                name="Left Stem"
                geometry={nodes['Left Stem'].geometry}
                material={materials.Glasses}
                castShadow
                receiveShadow
                position={[-59.06, 10.79, 0.56]}
                rotation={[1.74, -0.06, -0.24]}
                scale={[1, 1.31, 1]}
              />
              <mesh
                name="Left Frame"
                geometry={nodes['Left Frame'].geometry}
                material={materials.Glasses}
                castShadow
                receiveShadow
                position={[-27.36, 0, 38.1]}
              />
              <mesh
                name="Right Frame"
                geometry={nodes['Right Frame'].geometry}
                material={materials.Glasses}
                castShadow
                receiveShadow
                position={[26.55, 0, 38.35]}
              />
            </group>
            <group
              ref={eyebrowObj}
              name="Eyebrows"
              position={[1.91, 31.82, 50.16]}>
              <mesh
                name="Left2"
                geometry={nodes.Left2.geometry}
                material={materials.Hair}
                castShadow
                receiveShadow
                position={[-24.8, -2.58, -0.21]}
                rotation={[-0.03, -0.18, -1.57]}
                scale={1}
              />
              <mesh
                name="Right2"
                geometry={nodes.Right2.geometry}
                material={materials.Hair}
                castShadow
                receiveShadow
                position={[24.8, -2.23, 0.55]}
                rotation={[-0.03, 0.17, -1.57]}
                scale={1}
              />
            </group>
            <group name="Ears" position={[-0.59, -0.53, -0.95]}>
              <mesh
                name="Left3"
                geometry={nodes.Left3.geometry}
                material={materials.Skin}
                castShadow
                receiveShadow
                position={[-61.11, 0.45, 0.9]}
                scale={[-1, 1, 0.45]}
              />
              <mesh
                name="Right3"
                geometry={nodes.Right3.geometry}
                material={materials.Skin}
                castShadow
                receiveShadow
                position={[61.11, -1.26, 0.9]}
                scale={[1, 1, 0.45]}
              />
            </group>
            <mesh
              name="Nose"
              geometry={nodes.Nose.geometry}
              material={materials['Nose Material']}
              castShadow
              receiveShadow
              position={[1.22, -12.96, 55.61]}
              rotation={[-0.03, 0, 0]}
              scale={1}
            />
            <mesh
              name="Face"
              geometry={nodes.Face.geometry}
              material={materials.Skin}
              castShadow
              receiveShadow
              position={[1.4, -12.21, -1.99]}
            />
          </group>
        </animated.group>
        <OrthographicCamera
          name="Camera"
          makeDefault={true}
          zoom={1}
          far={100000}
          near={-100000}
          position={[0, 0, 1000]}
          rotation={[0, 0, 0]}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.75}
          color="#eaeaea"
        />
      </group> */}
    </>
  )
}

export default Scene
