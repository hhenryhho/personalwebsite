/** @format */

import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
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
			highlight: '#4AF1F2', // Fluorescent Blue (Highlight Blue)
			muted: '#45A29E', // Cadet Blue (Muted Blue)
		},
	},
	breakpoints: createBreakpoints({
		sm: '62em',
		md: '62em',
		lg: '80em',
		xl: '80em',
	}),
	config: {
		initialColorMode: 'dark',
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
				color: mode('brand.200', 'brand.highlight')(props),
				_hover: {
					color: mode('brand.325'),
				},
			}),
		},
	},
}

const customTheme = extendTheme(overrides)

export default customTheme
