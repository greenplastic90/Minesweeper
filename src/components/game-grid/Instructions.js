import { HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { basicColors } from '../../theme/theme'
import { isMobileOrTablet } from './grid-functions'

import { TbShovel } from 'react-icons/tb'
import { RiFlag2Fill } from 'react-icons/ri'
import { BsMouse2 } from 'react-icons/bs'
import { FaRegHandPointDown } from 'react-icons/fa'

const iconsStyle = { color: basicColors.white, size: '50px' }

const Instructions = () => {
	const [showDig, setShowDig] = useState(true)
	const [instructions, setInstructions] = useState()

	const instructionData = useRef({
		mobile: {
			icon: <FaRegHandPointDown color={iconsStyle.color} size={iconsStyle.size} />,
			text: {
				digText: 'PRESS',
				flagText: 'LONG PRESS',
			},
		},

		browser: {
			icon: <BsMouse2 color={iconsStyle.color} size={iconsStyle.size} />,
			text: {
				digText: 'LEFT CLICK',
				flagText: 'RIGHT CLICK',
			},
		},
	})

	useEffect(() => {
		setInstructions(isMobileOrTablet() ? instructionData.current.mobile : instructionData.current.browser)
		setInterval(() => {
			setShowDig((current) => !current)
		}, 1000 * 2)
	}, [])

	return (
		<>
			{instructions && (
				<VStack pointerEvents={'none'} pos={'absolute'} top={'20%'} w='200px' h='150px' mt={0} justifyContent={'center'} borderRadius={'20px'} bg={'hsla(0, 0%, 0%, 0.8)'}>
					{showDig ? <DisplayInformation data={instructions} isDig={true} /> : <DisplayInformation data={instructions} isDig={false} />}
				</VStack>
			)}
		</>
	)
}

export default Instructions

const DisplayInformation = ({ data, isDig }) => {
	const { icon, text } = data
	const { digText, flagText } = text
	return (
		<VStack>
			<HStack>
				{isDig ? <TbShovel color={iconsStyle.color} size={iconsStyle.size} /> : <RiFlag2Fill color={iconsStyle.color} size={iconsStyle.size} />} {icon}{' '}
			</HStack>
			<Text fontSize={'30px'} color={'gray.100'}>
				{isDig ? digText : flagText}
			</Text>
		</VStack>
	)
}
