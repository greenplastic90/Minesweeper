import { HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ImClock2 } from 'react-icons/im'
const Timer = ({ game }) => {
	const { fieldClickedIndex } = game
	// const [first, setfirst] = useState(second)
	const [ones, setOnes] = useState(0)
	const [tens, setTens] = useState(0)
	const [hundreds, setHundreds] = useState(0)
	const [timeIntervals, setTimeIntervals] = useState({ ones: null, tens: null, hundreds: null })
	//! Time resets on every click!
	const updateTimer = (set) => {
		set((current) => {
			//* resets to 0 after 9 is reached
			if (current === 9) {
				return 0
			}
			return current + 1
		})
	}
	const clearAllIntervals = () => {
		setTimeIntervals((current) => {
			clearInterval(current.ones)
			clearInterval(current.tens)
			clearInterval(current.hundreds)
			current.ones = null
			current.tens = null
			current.hundreds = null
			return current
		})
	}
	const resetTimerToZeros = () => {
		setOnes(0)
		setTens(0)
		setHundreds(0)
	}

	//* starts timer when after first click
	useEffect(() => {
		if (game.timer === 'active') {
			//? only set intervals if there isn't an interval already
			if (!timeIntervals.ones) setTimeIntervals({ ones: setInterval(() => updateTimer(setOnes), 1000), tens: setInterval(() => updateTimer(setTens), 1000 * 10), hundreds: setInterval(() => updateTimer(setHundreds), 1000 * 100) })
		}
		if (game.timer === 'reset') {
			clearAllIntervals()
			resetTimerToZeros()
		}
		if (game.timer === 'pause') {
			clearAllIntervals()
		}
	}, [game.timer, timeIntervals.ones])

	return (
		<HStack spacing={'4px'}>
			<ImClock2 color={'#f5c242'} fontSize={'20px'} />
			<HStack spacing={0}>
				<Text fontSize={'30px'} color={'brand.header_text'}>
					{hundreds}
				</Text>
				<Text fontSize={'30px'} color={'brand.header_text'}>
					{tens}
				</Text>
				<Text fontSize={'30px'} color={'brand.header_text'}>
					{ones}
				</Text>
			</HStack>
		</HStack>
	)
}

export default Timer
