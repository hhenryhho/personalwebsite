/** @format */
import { useColorModeValue } from '@chakra-ui/color-mode'
import { muted, highlight } from './colorValues'

const BlobSVG = () => {
	const pathFill = useColorModeValue(highlight, muted)

	return (
		<svg
			viewBox='0 0 450 450'
			xmlns='http://www.w3.org/2000/svg'
			width='100%'
			id='blobSvg'>
			<path
				id='blob'
				d='M421,338.5Q391,437,302.5,417.5Q214,408,159,364Q104,320,96,246Q88,172,157,157.5Q226,143,313,102.5Q400,62,425.5,156Q451,250,421,338.5Z'
				fill={pathFill}
				transform='translate(0 -80)'></path>
		</svg>
	)
}

export default BlobSVG
