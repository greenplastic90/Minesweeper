import { extendTheme } from '@chakra-ui/react'

const basicColors = {
	white: 'hsl(0,0%,100%)',
	black: 'hsl(0,0%,0%)',
	green_darkest: 'hsl(92.7,40.7%,26.5%)',
	green_border: 'hsl(83.4,56.7%,30.8%)',
	green_dark: 'hsl(120,46.5%,33.7%)',
	green_medium: 'hsl(78.9,54.8%,39.2%)',
	green_light: 'hsl(76.7,50.3%,62.2%)',
	green_ultra_ultra_light: 'hsl(77.9,58.4%,70.8%)',
	green_ultra_light: 'hsl(78.9,54.8%,35.2%)',
	brown_dark: 'hsl(40.3,33.3%,45.9%)',
	brown_light: 'hsl(37.8,33.6%,57.5%)',
	brown_ultra_light: 'hsl(32.3,36.4%,79%)',
	brown_ultra_ultra_light: 'hsl(32,48.4%,81.8%)',
	purple: 'hsl(265.6,34.1%,35.1%)',
	orange_dark: 'hsl(12.7,65.9%,44.9%)',
	orange_light: 'hsl(33.9,85.7%,75.3%)',
	pink_dark: 'hsl(338,57.1%,37.5%)',
	blue_dark: 'hsl(186.5,79.3%,22.7%)',
	gray_dark: 'hsl(210,11.1%,21.2%)',
	brown: 'hsl(11.7,63.6%,23.7%)',
}
// blue: 'hsl(215.5,79.3%,43.5%)',
// 	light_blue: 'hsl(189.7,42.9%,45.3%)',
// 	red: 'hsl(356.5,76.8%,43.9%)',
// 	orange: 'hsl(28.2,98.4%,51.2%)',
// 	purple: 'hsl(282.2,100%,28.4%)',
// 	pink: 'hsl(349.5,100%,87.6%)',
// 	aquamarine: 'hsl(159.8,100%,74.9%)',
// 	yellow: 'hsl(60,100%,50%)',

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
		one: basicColors.brown,
		two: basicColors.orange_dark,
		three: basicColors.purple,
		four: basicColors.blue_dark,
		five: basicColors.green_darkest,
		six: basicColors.pink_dark,
		seven: basicColors.gray_dark,
		eight: basicColors.black,
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
