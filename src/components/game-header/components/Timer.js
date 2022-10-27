import { HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ImClock2 } from 'react-icons/im'
const Timer = ({ firstClick }) => {
	const [ones, setOnes] = useState(0)
	const [tens, setTens] = useState(0)
	const [hundreds, setHundreds] = useState(0)

	const updateTimer = (set) => {
		set((current) => {
			//* resets to 0 after 9 is reached
			if (current === 9) {
				return 0
			}
			return current + 1
		})
	}

	useEffect(() => {
		let startOnes, startTens, startHundreds

		if (firstClick || firstClick === 0) {
			startOnes = setInterval(() => updateTimer(setOnes), 1000)
			startTens = setInterval(() => updateTimer(setTens), 1000 * 10)
			startHundreds = setInterval(() => updateTimer(setHundreds), 1000 * 100)
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
			setOnes(0)
			setTens(0)
			setHundreds(0)
		}
	}, [firstClick])

	return (
		<HStack>
			<ImClock2 />
			<HStack spacing={0}>
				<Text>{hundreds}</Text>
				<Text>{tens}</Text>
				<Text>{ones}</Text>
			</HStack>
		</HStack>
	)
}

export default Timer
