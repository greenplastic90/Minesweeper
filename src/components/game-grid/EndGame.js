import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { ImClock2, ImTrophy } from 'react-icons/im'

const EndGame = () => {
	return (
		<VStack pos={'absolute'} w='300px' borderRadius={10} left='40%' top={'10%'} zIndex={3}>
			<Times />
			<Button borderRadius={10}>Play Again?</Button>
		</VStack>
	)
}

export default EndGame
const Times = () => {
	return (
		<HStack>
			<Time icon={<ImClock2 />} time={'045'} />
			<Time icon={<ImTrophy />} time={'030'} />
		</HStack>
	)
}

const Time = ({ icon, time }) => {
	return (
		<VStack>
			{/* icon */}
			{icon}
			{/* time */}
			<Text> {time}</Text>
		</VStack>
	)
}
