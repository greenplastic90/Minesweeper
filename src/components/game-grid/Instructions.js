import { HStack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { basicColors } from '../../theme/theme'

import { TbShovel } from 'react-icons/tb'
import { RiFlag2Fill } from 'react-icons/ri'
import { BsMouse2 } from 'react-icons/bs'

const Instructions = () => {
	const [showDig, setShowDig] = useState(true)

	useEffect(() => {
		setInterval(() => {
			setShowDig((current) => !current)
		}, 1000 * 3)
	}, [])
	return (
		<VStack pointerEvents={'none'} pos={'absolute'} top={'20%'} w='200px' h='150px' mt={0} justifyContent={'center'} borderRadius={'20px'} bg={'hsla(0, 0%, 0%, 0.8)'}>
			{showDig ? <Dig /> : <Flag />}
		</VStack>
	)
}

export default Instructions

const Dig = () => {
	return (
		<InstructionsContainer>
			<IconsContainer>
				<TbShovel color={basicColors.white} size={'50px'} />
				<BsMouse2 color={basicColors.white} size={'50px'} />
			</IconsContainer>
			<TextContainer>{'LEFT CLICK'}</TextContainer>
		</InstructionsContainer>
	)
}

const Flag = () => {
	return (
		<InstructionsContainer>
			<IconsContainer>
				<BsMouse2 rotate={'10dge'} color={basicColors.white} size={'50px'} />
				<RiFlag2Fill color={basicColors.white} size={'50px'} />
			</IconsContainer>
			<TextContainer>{'RIGHT CLICK'}</TextContainer>
		</InstructionsContainer>
	)
}

const InstructionsContainer = ({ children }) => {
	return <VStack>{children}</VStack>
}

const IconsContainer = ({ children }) => {
	return <HStack>{children}</HStack>
}

const TextContainer = ({ children }) => {
	return (
		<Text fontSize={'30px'} color={'gray.100'}>
			{children}
		</Text>
	)
}
