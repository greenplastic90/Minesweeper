import { HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ImClock2 } from 'react-icons/im'
const Timer = ({ fieldClickedIndex, mineClickedIndex }) => {
	const [ones, setOnes] = useState(0)
	const [tens, setTens] = useState(0)
	const [hundreds, setHundreds] = useState(0)
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

	//* starts timer when after first click
	useEffect(() => {
		let startOnes, startTens, startHundreds
		if ((fieldClickedIndex || fieldClickedIndex === 0) && !mineClickedIndex && mineClickedIndex !== 0) {
			startOnes = setInterval(() => updateTimer(setOnes), 1000)
			startTens = setInterval(() => updateTimer(setTens), 1000 * 10)
			startHundreds = setInterval(() => updateTimer(setHundreds), 1000 * 100)
		}

		//* stops timer from resetting if mine in clicked, but resets if no mine was hit (reset or difficulty change)
		//* runs when no field is clicked or mine is clicked (when game is reset)
		if (!mineClickedIndex && mineClickedIndex !== 0 && !fieldClickedIndex && fieldClickedIndex !== 0) {
			setOnes(0)
			setTens(0)
			setHundreds(0)
		}

		//* freezes timer at 999 seconds
		setTimeout(() => {
			clearInterval(startOnes)
			clearInterval(startTens)
			clearInterval(startHundreds)
		}, 1000 * 999)

		return () => {
			clearInterval(startOnes)
			clearInterval(startTens)
			clearInterval(startHundreds)
		}
	}, [fieldClickedIndex, mineClickedIndex])

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
