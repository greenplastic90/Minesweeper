import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import GameHeader from './game-header/GameHeader'

import { easy } from './difficulty-options'
import GameGrid from './game-grid/GameGrid'
import { localStorageDifficulty } from './game-grid/grid-functions'

const Game = () => {
	const [difficulty, setDifficulty] = useState(easy)
	const [fields, setFields] = useState([])
	const [fieldsData, setFieldsData] = useState([])
	const [valuesArray, setvaluesArray] = useState([])
	const [firstClick, setFirstClick] = useState(false)
	const [firstClickIndex, setFirstClickIndex] = useState(null)
	const [resetToggle, setResetToggle] = useState(true)

	const resetGame = () => {
		setResetToggle((current) => !current)
		setvaluesArray([])
		setFirstClick(false)
		setFirstClickIndex(null)
		setFields([])
		setFieldsData([])
	}

	const OnFieldLeftClick = (index, value) => {
		//? Change index clicked to exposed
		setFieldsData((currentArr) => {
			currentArr[index].isExposed = true
			return currentArr
		})
		if (!firstClick) {
			setFirstClick(true)
			setFirstClickIndex(index)
		}
		//? isZero
		//? isNumber
		//? isMine
	}

	useEffect(() => {
		setDifficulty(localStorageDifficulty())
	}, [])

	return (
		<VStack>
			<GameHeader difficulty={difficulty} setDifficulty={setDifficulty} resetGame={resetGame} />
			<GameGrid
				difficulty={difficulty}
				fields={fields}
				setFields={setFields}
				fieldsData={fieldsData}
				setFieldsData={setFieldsData}
				valuesArray={valuesArray}
				setvaluesArray={setvaluesArray}
				firstClick={firstClick}
				setFirstClick={setFirstClick}
				firstClickIndex={firstClickIndex}
				setFirstClickIndex={setFirstClickIndex}
				OnFieldLeftClick={OnFieldLeftClick}
				resetToggle={resetToggle}
			/>
		</VStack>
	)
}

export default Game
