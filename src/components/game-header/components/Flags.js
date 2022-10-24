import { HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsFillFlagFill } from 'react-icons/bs'

const Flags = ({ numOfMines }) => {
	const [numOfFlags, setNumOfFlags] = useState(0)
	useEffect(() => {
		setNumOfFlags(numOfMines)
	}, [numOfMines])
	return (
		<HStack>
			<BsFillFlagFill />
			<Text>{numOfFlags}</Text>
		</HStack>
	)
}

export default Flags
