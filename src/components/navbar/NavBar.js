import { HStack } from '@chakra-ui/react'
import React from 'react'
import HighScore from './HighScore'
import HighScoresBtn from './HighScoresBtn'
import HowToPlayBtn from './HowToPlayBtn'
import LogoAndName from './LogoAndName'

const NavBar = () => {
	const navbarHighet = '60px'
	return (
		<HStack pos={'absolute'} top={0} w={'full'} h={navbarHighet} px={'5px'} justifyContent={'space-between'} alignContent={'center'} backgroundColor={'hsl(0,0%,100%.0.0)'}>
			<LogoAndName />
			<HStack>
				<HowToPlayBtn />
				<HighScoresBtn />
			</HStack>
			<HighScore navbarHighet={navbarHighet} />
		</HStack>
	)
}

export default NavBar
