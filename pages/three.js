import { Flex, Button, Text } from '@chakra-ui/react'
import { Loader, OrbitControls, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState, Suspense, useEffect } from 'react'
import Scene from '../components/Scene'

export const Three = () => {
  const [currentSpeechBox, setCurrentSpeechBox] = useState(1)

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex h="1000px" w="1000px">
        <Suspense fallback={<Loader />}>
          <Canvas shadows flat linear>
            <Scene zoom={1} currentSpeechBox={currentSpeechBox} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
            />
          </Canvas>
        </Suspense>
      </Flex>
      <Flex position="fixed" bottom="10%">
        <Button
          onClick={() => {
            setCurrentSpeechBox(currentSpeechBox - 1)
          }}>
          <Text>Decrease</Text>
        </Button>
        <Text>currentSpeechBox: {currentSpeechBox}</Text>
        <Button
          onClick={() => {
            setCurrentSpeechBox(currentSpeechBox + 1)
          }}>
          <Text>Increase</Text>
        </Button>
      </Flex>
    </Flex>
  )
}

export default Three