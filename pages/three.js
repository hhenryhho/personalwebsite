import { Flex } from '@chakra-ui/react'
import { Loader, OrbitControls, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, Suspense } from 'react'
import Scene from '../components/Scene'

export const Three = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex h="4000px" w="4000px">
        <Suspense fallback={<Loader />}>
          <Canvas shadows flat linear>
            <Scene zoom={1} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
            />
          </Canvas>
        </Suspense>
      </Flex>
    </Flex>
  )
}

export default Three
