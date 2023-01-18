import { VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Instructions = () => {
	const [showDig, setShowDig] = useState(true)

	useEffect(() => {
		setInterval(() => {
			setShowDig((current) => !current)
		}, 1000 * 2)
	}, [])
	return (
		<VStack pointerEvents={'none'} pos={'absolute'} top={'20%'} w='200px' h='150px' mt={0} bg={'hsla(100, 100%, 10%, 0.6)'}>
			{showDig ? <Dig /> : <Flag />}
		</VStack>
	)
}

export default Instructions

const Dig = () => {
	return <div>Dig</div>
}

const Flag = () => {
	return <div>Flag</div>
}
