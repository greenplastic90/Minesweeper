import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { checkFieldsAroundIndex } from './grid-functions'

const Field = ({
	index,
	fieldWidth,
	mineWidth,
	bgIsLight,
	value,
	firstClick,
	setFirstClick,
	setClickIndex,
	setExposedArray,
	isExposed,
	boardWidth,
	valuesArray,
}) => {
	const [bgColor, setBgColor] = useState()
	// const [isExposed, setIsExposed] = useState(false)

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

	const OnFieldLeftClick = () => {
		if (!firstClick) {
			setFirstClick(index)
		}
		setExposedArray((currentArray) => {
			currentArray[index] = true
			return [...currentArray]
		})
		setClickIndex(index)
		checkFieldsAroundIndex(index, valuesArray, boardWidth)
	}

	return (
		<VStack
			onClick={() => {
				OnFieldLeftClick()
			}}
			w={fieldWidth}
			h={fieldWidth}
			bgColor={bgColor}
			justifyContent={'center'}>
			{value === 'mine' ? <Mine width={mineWidth} /> : isExposed && <Text>{value}</Text>}
		</VStack>
	)
}

export default Field

const Mine = ({ width }) => {
	return <Box w={width} h={width} bgColor='black' borderRadius={'full'} />
}
