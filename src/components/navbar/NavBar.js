import { HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import HighScore from './HighScore'
import HighScoresBtn from './HighScoresBtn'
import HowToPlayBtn from './HowToPlayBtn'
import LogoAndName from './LogoAndName'

const NavBar = () => {
	const [showHighScore, setShowHighScore] = useState(false)
	const navbarHighet = '60px'
	const btnWidth = ['80px', null, '100px']
	return (
		<HStack pos={'absolute'} top={0} left={0} w={'full'} h={navbarHighet} px={'5px'} justifyContent={'space-between'} alignContent={'center'} backgroundColor={'hsl(0,0%,100%.0.0)'}>
			<LogoAndName />
			<HStack>
				<HowToPlayBtn btnWidth={btnWidth} />
				<HighScoresBtn btnWidth={btnWidth} setShowHighScore={setShowHighScore} />
			</HStack>
			{showHighScore && <HighScore navbarHighet={navbarHighet} btnWidth={btnWidth} />}
		</HStack>
	)
}

export default NavBar
