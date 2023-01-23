import { HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { basicColors } from '../../theme/theme'
import HighScore from './HighScore'
import HighScoresBtn from './HighScoresBtn'
import LogoAndName from './LogoAndName'

const NavBar = () => {
	const [showHighScore, setShowHighScore] = useState(false)
	const [highScoreFirstClick, setHighScoreFirstClick] = useState(false)
	const navbarHighet = '70px'
	const btnWidth = ['80px', null, '100px']

	const handelHighScoreClick = () => {
		setShowHighScore((current) => !current)
		setHighScoreFirstClick(true)
	}

	return (
		<HStack w={'full'} h={navbarHighet} p={'5px'} justifyContent={'space-between'} alignContent={'center'} backgroundColor={`${basicColors.orange_dark}`}>
			<LogoAndName />

			<HighScoresBtn btnWidth={btnWidth} handelHighScoreClick={handelHighScoreClick} />

			<HighScore navbarHighet={navbarHighet} btnWidth={btnWidth} showHighScore={showHighScore} highScoreFirstClick={highScoreFirstClick} />
		</HStack>
	)
}

export default NavBar
