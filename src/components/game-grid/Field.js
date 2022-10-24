import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const Field = ({ index, fieldWidth, mineWidth, bgIsLight, value, OnFieldLeftClick, isExposed }) => {
	const [bgColor, setBgColor] = useState()

	// set bgColor
	useEffect(() => {
		if (bgIsLight) {
			if (isExposed) {
				setBgColor('field.brown_light')
			} else {
				setBgColor('field.green_light')
			}
		} else {
			if (isExposed) {
				setBgColor('field.brown_dark')
			} else {
				setBgColor('field.green_dark')
			}
		}
	}, [bgIsLight, isExposed])

	return (
		<VStack
			onClick={() => {
				OnFieldLeftClick(index, value)
			}}
			w={fieldWidth}
			h={fieldWidth}
			bgColor={bgColor}
			justifyContent={'center'}>
			{value === 'mine' ? <Mine width={mineWidth} /> : <Text>{value}</Text>}
		</VStack>
	)
}

export default Field

const Mine = ({ width }) => {
	return <Box w={width} h={width} bgColor='black' borderRadius={'full'} />
}
