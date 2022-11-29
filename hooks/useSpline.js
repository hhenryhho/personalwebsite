import SplineLoader from '@splinetool/loader'
import { useState, useEffect } from 'react'

const useSpline = () => {
  const [nodes, setNodes] = useState(null)
  const [materials, setMaterials] = useState(null)
  const loader = new SplineLoader()

  useEffect(() => {
    // Load a .splinecode file
    loader.load(
      // path to the .splinecode file, either from the Spline servers or local
      'https://prod.spline.design/23zzRH2Ogn3ixUwa/scene.splinecode',
      // called when the resource is loaded
      splineScene => {
        // For each children, get the nodes and materials
        splineScene.children.forEach(child => {
          console.log('Name', child.name, child)
        })
      },
      null,
      // called when loading has errors
      error => {
        console.log('An error happened')
      }
    )
  }, [])
  return { nodes, materials }
}

export { useSpline }
