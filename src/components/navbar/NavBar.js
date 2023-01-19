import { HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import HighScore from './HighScore'
import HighScoresBtn from './HighScoresBtn'
import LogoAndName from './LogoAndName'

const NavBar = () => {
	const [showHighScore, setShowHighScore] = useState(false)
	const [highScoreFirstClick, setHighScoreFirstClick] = useState(false)
	const navbarHighet = '60px'
	const btnWidth = ['80px', null, '100px']

	const handelHighScoreClick = () => {
		setShowHighScore((current) => !current)
		setHighScoreFirstClick(true)
	}

	return (
		<HStack w={'full'} h={navbarHighet} px={'5px'} justifyContent={'space-between'} alignContent={'center'} backgroundColor={'hsl(0,0%,100%.0.0)'}>
			<LogoAndName />

			<HighScoresBtn btnWidth={btnWidth} handelHighScoreClick={handelHighScoreClick} />

			<HighScore navbarHighet={navbarHighet} btnWidth={btnWidth} showHighScore={showHighScore} highScoreFirstClick={highScoreFirstClick} />
		</HStack>
	)
}

export default NavBar
