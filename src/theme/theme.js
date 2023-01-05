import { extendTheme } from '@chakra-ui/react'

const basicColors = {
	white: '#FFFFFF',
	green_darkest: '#3B6421',
	green_border: '#75A32D',
	green_dark: '#2E7E2E',
	green_medium: '#ACD05E',
	green_light: '#B3D665',
	green_ultra_ultra_light: '#C6E089',
	green_ultra_light: '#C0DC83',
	brown_dark: '#7A663D',
	brown_light: '#B79C6E',
	brown_ultra_light: '#DDCBB6',
	brown_ultra_ultra_light: '#E7D2BA',
	blue: '#175FC7',
	light_blue: '#4295A5',
	red: '#C61A24',
	orange: '#FD7B08',
	purple: '#660091',
	pink: '#FFC0CB',
	aquamarine: '#7FFFD4',
	yellow: '#FFFF00',
}

const colors = {
	brand: {
		header: basicColors.green_darkest,
		header_dropdown: basicColors.white,
		header_text: basicColors.white,
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
		border: basicColors.green_border,
	},
	numbers: {
		one: basicColors.blue,
		two: basicColors.green_dark,
		three: basicColors.red,
		four: basicColors.purple,
		five: basicColors.orange,
		six: basicColors.light_blue,
		seven: basicColors.pink,
		eight: basicColors.yellow,
		//pink
		//torquise
		//yellow
	},
}

const fonts = {
	body: 'VT323',
}

export const theme = extendTheme({
	colors,
	fonts,
})
