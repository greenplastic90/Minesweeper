import { extendTheme } from '@chakra-ui/react'

const basicColors = {
	green_darkest: '#5F6421',
	green_dark: '#2E7E2E',
	green_medium: '#93CB39',
	green_light: '#B3DE6A',
	green_ultra_ultra_light: '#C6E089',
	green_ultra_light: '#C0DC83',
	brown_dark: '#CDAA87',
	brown_light: '#DEB58E',
	brown_ultra_light: '#DDCBB6',
	brown_ultra_ultra_light: '#E7D2BA',
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
		green_hover_dark: basicColors.green_ultra_light,
		green_light: basicColors.green_light,
		green_hover_light: basicColors.green_ultra_ultra_light,
		brown_dark: basicColors.brown_dark,
		brown_hover_dark: basicColors.brown_ultra_light,
		brown_light: basicColors.brown_light,
		brown_hover_light: basicColors.brown_ultra_ultra_light,
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
