import { extendTheme } from '@chakra-ui/react'

const basicColors = {
	green_darkest: '#5F6421',
	green_dark: '#2E7E2E',
	green_medium: '#93CB39',
	green_light: '#B3DE6A',
	brown_dark: '#CDAA87',
	brown_light: '#DEB58E',
	blue: '#175FC7',
	red: '#C61A24',
	orange: '#FD7B08',
	purple: '#660091',
}

const colors = {
	brand: {
		header: basicColors.green_darkest,
	},

	field: {
		green_dark: basicColors.green_medium,
		green_light: basicColors.green_light,
		brown_dark: basicColors.brown_dark,
		brown_light: basicColors.brown_light,
	},
	numbers: {
		one: basicColors.blue,
		two: basicColors.green_dark,
		three: basicColors.red,
		four: basicColors.purple,
		five: basicColors.orange,
	},
}

export const theme = extendTheme({
	colors,
})
