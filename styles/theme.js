/** @format */

import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const overrides = {
	fonts: {
		body: 'Roboto, sans-serif',
		heading: 'Roboto, sans-serif',
	},
	fontWeights: {
		normal: 300,
		medium: 500,
		bold: 700,
	},
	colors: {
		brand: {
			100: '#0B0C10', // Rich Black
			200: '#1F2833', // Gunmetal
			275: '#5A5C5E', // Darker Silver
			300: '#C5C6C7', // Silver
			325: '#EAEBEB', // Lighter Silver
			400: '#45A29E', // Fluorescent Blue (Highlight Blue)
			500: '#45A29E', // Cadet Blue (Muted Blue)
		},
	},
	styles: {
		global: (props) => ({
			body: {
				color: mode('brand.275', 'brand.325')(props),
				bg: mode('white', 'brand.200')(props),
			},
		}),
	},
	components: {
		Heading: {
			baseStyle: {
				fontWeight: 'medium',
			},
		},
		Text: {
			baseStyle: (props) => ({
				fontWeight: 'normal',
				color: mode('gray.500', 'gray.300')(props),
			}),
		},
		Link: {
			baseStyle: (props) => ({
				color: mode('brand.200', 'brand.200')(props),
				_hover: {
					color: mode('brand.325'),
				},
			}),
		},
	},
}

const customTheme = extendTheme(overrides)
// console.log(customTheme);

export default customTheme
