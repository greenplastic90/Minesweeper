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
		clearInterval(timeIntervals.ones)
		clearInterval(timeIntervals.tens)
		clearInterval(timeIntervals.hundreds)
	}
	const resetTimerToZeros = () => {
		setOnes(0)
		setTens(0)
		setHundreds(0)
	}

	//* starts timer when after first click
	useEffect(() => {
		if (game.timer === 'active') {
			console.log('active')
			setTimeIntervals({ ones: setInterval(() => updateTimer(setOnes), 1000), tens: setInterval(() => updateTimer(setTens), 1000 * 10), hundreds: setInterval(() => updateTimer(setHundreds), 1000 * 100) })
		}
		if (game.timer === 'reset') {
			clearAllIntervals()
			resetTimerToZeros()
			console.log('reset')
		}
		if (game.timer === 'pause') {
			clearAllIntervals()
			console.log('pause')
		}
		// //* stops timer from resetting if mine is clicked, but resets if no mine was hit (reset or difficulty change)
		// //* runs when no field is clicked or mine is clicked (when game is reset)
		// if (!mineClickedIndex && mineClickedIndex !== 0 && !fieldClickedIndex && fieldClickedIndex !== 0) {
		// 	setOnes(0)
		// 	setTens(0)
		// 	setHundreds(0)

		// 	console.log('Reset')
		// }

		// //* freezes timer at 999 seconds
		// setTimeout(() => {
		// 	setTimeIntervals((current) => {
		// 		clearInterval(current.ones)
		// 		clearInterval(current.tens)
		// 		clearInterval(current.hundreds)
		// 		return current
		// 	})
		// }, 1000 * 999)

		return () => {
			// console.log('return')
			// setTimeIntervals((current) => {
			// 	clearInterval(current.ones)
			// 	clearInterval(current.tens)
			// 	clearInterval(current.hundreds)
			// 	return current
			// })
		}
	}, [fieldClickedIndex, game])

	return (
		<HStack spacing={'4px'}>
			<ImClock2 color={'#f5c242'} fontSize={'20px'} />
			<HStack spacing={0}>
				<Text fontWeight={'bold'} fontSize={'20px'} color={'brand.header_text'}>
					{hundreds}
				</Text>
				<Text fontWeight={'bold'} fontSize={'20px'} color={'brand.header_text'}>
					{tens}
				</Text>
				<Text fontWeight={'bold'} fontSize={'20px'} color={'brand.header_text'}>
					{ones}
				</Text>
			</HStack>
		</HStack>
	)
}

export default Timer
