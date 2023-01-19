import { HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BsTabletLandscape, BsTablet } from 'react-icons/bs'
import { RiArrowGoForwardLine } from 'react-icons/ri'

const RotateDevice = () => {
	return (
		<VStack color='gray.100' p={'20px'} fontSize={'30px'} bg={'hsla(0, 0%, 0%, 0.8)'}>
			<VStack fontSize={'50px'}>
				<RiArrowGoForwardLine style={{ transform: 'rotate(90deg)' }} />
				<HStack>
					<BsTabletLandscape />
					<BsTablet />
				</HStack>
			</VStack>

			<Text>OH NO! WE CAN'T FIT EVERTHING ON YOUR SCREEN.</Text>
			<Text>PLEASE ROTATE YOUR DEVICE.</Text>
		</VStack>
	)
}

export default RotateDevice
