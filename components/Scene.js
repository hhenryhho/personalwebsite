import { useEffect, useState, useRef } from 'react'
import {
  OrthographicCamera,
  Mask,
  Html,
  Float as FloatImpl,
  Clone,
  SpotLight
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { BackSide, Vector3, MathUtils } from 'three'
import { useSpring, animated, easings } from '@react-spring/three'
import useSpline from '@splinetool/r3f-spline'
import { useColorModeValue } from '@chakra-ui/react'
import Embed from '../components/Embed'
import { useContext } from 'react'
import { CounterContext } from '../pages/_app'

import useMousePosition from '../hooks/useMousePosition'
import useTouchPosition from '../hooks/useTouchPosition'

const headRotationMulti = 0.25
const bodyRotationMulti = 0.1

const lerpFactor = 0.05 // Higher value = faster lerp

/**
 * React component used to create a custom 3D scene.
 *
 * @param {Number}            zoom              the zoom level of the camera
 * @param {MutableRefObject}  portal            a reference to where the Embed component should be portal'd to
 */
const Scene = ({ zoom, portal, ...props }) => {
  const { nodes, materials } = useSpline(
    'https://prod.spline.design/23zzRH2Ogn3ixUwa/scene.splinecode'
  )
  const colorMode = useColorModeValue('light', 'dark')
  const mousePosition = useMousePosition()
  const touchPosition = useTouchPosition()
  const [hover, setHover] = useState(false)

  const sceneObj = useRef()
  const characterObj = useRef()
  const headObj = useRef()
  const eyesObj = useRef()
  const eyebrowObj = useRef()
  const mouthObj = useRef()
  const bodyObj = useRef()
  const regClothes = useRef()
  const logoClothes = useRef()
  const phoneObj = useRef()
  const light = useRef()

  const counterCtx = useContext(CounterContext)

  const { position } = useSpring({
    position: counterCtx.counter > 1 ? [0, 350, 0] : [0, 0, 0],
    config: {
      duration: 1000,
      easing: easings.easeInOutBack
    }
  })

  useEffect(() => {
    // Determine which movement to use
    const position =
      touchPosition.x || touchPosition.y ? touchPosition : mousePosition

    // Get the width and height of the window
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Get the center coordinates of the window
    const centerXCoordinate = windowWidth / 2
    const centerYCoordinate = windowHeight / 2

    // Rotate the character based on mouse position
    if (headObj.current && bodyObj.current) {
      headObj.current.rotation.y =
        ((position.x - centerXCoordinate) * headRotationMulti * 2.5) /
        windowWidth
      headObj.current.rotation.x =
        ((position.y - centerYCoordinate) * headRotationMulti) / windowHeight
      bodyObj.current.rotation.y =
        ((position.x - centerXCoordinate) * bodyRotationMulti * 2.5) /
        windowWidth
      bodyObj.current.rotation.x =
        ((position.y - centerYCoordinate) * bodyRotationMulti) / windowHeight
    }

    // Rotate the phone based on mouse position
    if (phoneObj.current) {
      phoneObj.current.rotation.y =
        ((position.x - centerXCoordinate) * bodyRotationMulti * 3) / windowWidth
      phoneObj.current.rotation.x =
        ((position.y - centerYCoordinate) * bodyRotationMulti * 1.5) /
        windowHeight
    }

    // Control the spotlight based on mouse position
    if (colorMode === 'dark') {
      light.current.target.position.lerp(
        new Vector3(
          position.x - centerXCoordinate,
          -(position.y - centerYCoordinate),
          0
        ),
        1
      )
      light.current.target.updateMatrixWorld()
    }
  }, [mousePosition, touchPosition])

  useFrame(state => {
    if (eyesObj.current) {
      // Aninmate the eyes getting tighter
      eyesObj.current.scale.y = hover
        ? MathUtils.lerp(eyesObj.current.scale.y, 0.45, lerpFactor)
        : MathUtils.lerp(eyesObj.current.scale.y, 1, lerpFactor)
    }
    if (eyebrowObj.current) {
      // Animate eyebrows getting wider
      eyebrowObj.current.scale.x = hover
        ? MathUtils.lerp(eyebrowObj.current.scale.x, 1.12, lerpFactor)
        : MathUtils.lerp(eyebrowObj.current.scale.x, 1, lerpFactor)

      // Animate eyebrows raising and lowering
      eyebrowObj.current.position.y = hover
        ? MathUtils.lerp(eyebrowObj.current.position.y, 35.81, lerpFactor)
        : MathUtils.lerp(eyebrowObj.current.position.y, 31.82, lerpFactor)
    }

    if (mouthObj.current) {
      // Animate mouth y position
      mouthObj.current.position.y = hover
        ? MathUtils.lerp(mouthObj.current.position.y, -22.41, lerpFactor)
        : MathUtils.lerp(mouthObj.current.position.y, -10.41, lerpFactor)

      // Animate mouth scale x position
      mouthObj.current.scale.x = hover
        ? MathUtils.lerp(mouthObj.current.scale.x, 0.5, lerpFactor)
        : MathUtils.lerp(mouthObj.current.scale.x, 1, lerpFactor)

      // Animate mouth scale y position
      mouthObj.current.scale.y = hover
        ? MathUtils.lerp(mouthObj.current.scale.y, 0.5, lerpFactor)
        : MathUtils.lerp(mouthObj.current.scale.y, 1, lerpFactor)
    }

    if (regClothes.current && logoClothes.current) {
      // Swap clothes based on current speech box
      if (counterCtx.counter !== 1) {
        regClothes.current.scale.lerp(new Vector3(0, 0, 0), 1)
        logoClothes.current.scale.lerp(new Vector3(1, 1, 1), 1)
      } else {
        regClothes.current.scale.lerp(new Vector3(1, 1, 1), 1)
        logoClothes.current.scale.lerp(new Vector3(0, 0, 0), 1)
      }
    }

    // Animate the phone into view for the 3rd speech box
    if (phoneObj.current) {
      if (counterCtx.counter === 3) {
        phoneObj.current.scale.lerp(new Vector3(5, 5, 5), lerpFactor) // Scale in phone
        phoneObj.current.position.lerp(new Vector3(0, 150, 0), lerpFactor) // Move phone to center
      } else {
        phoneObj.current.scale.lerp(new Vector3(0, 0, 0), lerpFactor) // Scale out phone
        phoneObj.current.position.lerp(new Vector3(0, -200, 0), lerpFactor) // Move phone out of view
      }
    }

    // Animate character out of view for 3rd and above speech boxes
    if (characterObj.current) {
      if (counterCtx.counter >= 3) {
        characterObj.current.scale.lerp(new Vector3(0, 0, 0), lerpFactor)
      } else {
        characterObj.current.scale.lerp(new Vector3(1, 1, 1), lerpFactor)
      }
    }

    // Move the camera so background looks like its moving
    state.camera.position.lerp(
      new Vector3(-state.pointer.x * 50, -state.pointer.y * 50, 1000),
      0.1
    )
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })

  return (
    <>
      <group ref={sceneObj} {...props} dispose={null}>
        <boxGeometry args={[100, 200, 200]} />
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
          position={[-254.61, 369.33, 300]}
        />
        <mesh
          name="floor"
          userData={{ type: 'floor' }}
          position={[0, -200, -50]}
          rotation={[Math.PI / 1.1, 0, 0]}
          castShadow
          receiveShadow>
          <planeGeometry args={[10000, 10000, 1, 1]} />
          <meshLambertMaterial color="#F8F4FF" side={BackSide} />
        </mesh>
        <Float object={nodes['Bg Sphere']} position={[0, 300, -100]} />
        <Float
          object={nodes['Bg Sphere']}
          position={[250, 10, 100]}
          scale={1.5}
        />
        <Float object={nodes['Bg Sphere']} position={[-200, 20, 10]} />
        <Float object={nodes['Bg Sphere']} position={[200, 300, 100]} />
        <Float object={nodes['Bg Sphere']} position={[-300, 200, 10]} />
        <Float object={nodes['Bg Sphere']} position={[10, -200, 10]} />
        <Float
          object={nodes['Bg Sphere']}
          position={[-50, 100, -50]}
          scale={1.5}
        />
        <Float object={nodes['Bg Sphere']} position={[-50, -300, 100]} />
        <Float
          object={nodes['Bg Sphere']}
          position={[-100, -200, 400]}
          scale={1.5}
        />
        <Float
          object={nodes['Bg Sphere']}
          position={[-50, 300, 200]}
          scale={1.5}
        />
        <Float object={nodes['Bg Sphere']} position={[-300, -150, 100]} />
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
            <Html scale={10} transform portal={portal} zIndexRange={[100, 0]}>
              <Embed colorMode={colorMode} context={counterCtx} />
            </Html>
          </Mask>
        </group>
        <SpotLight
          ref={light}
          castShadow
          penumbra={1.5}
          distance={1000}
          angle={0.3}
          attenuation={5}
          anglePower={5}
          intensity={colorMode === 'dark' ? 1 : 0}
          position={[0, 300, 500]}
        />
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
          zoom={zoom}
          far={100000}
          near={-100000}
          position={[0, 0, 1000]}
          rotation={[0, 0, 0]}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={colorMode === 'dark' ? 0.0 : 0.75}
          color="#eaeaea"
        />
      </group>
    </>
  )
}

const Float = ({ object, intensity = 200, rotation = 1, ...props }) => (
  <FloatImpl
    floatIntensity={intensity}
    rotationIntensity={rotation}
    speed={3}
    scale={1.5}>
    <Clone object={object} {...props} />
  </FloatImpl>
)

export default Scene
