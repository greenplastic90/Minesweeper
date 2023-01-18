import { Select } from '@chakra-ui/react'
import { localStorageDifficulty } from '../../game-grid/grid-functions'

const DifficultyDropdown = ({ setDifficulty, resetGame, showEndGame }) => {
	const handelDifficultyChange = (diff) => {
		localStorage.setItem('mineSweeperDiffuculty', diff)

		setDifficulty(localStorageDifficulty())
		resetGame()
	}
	return (
		<Select disabled={showEndGame.disableBtns} fontSize={'20px'} bgColor={'brand.header_dropdown'} defaultValue={localStorage.getItem('mineSweeperDiffuculty')} onChange={(e) => handelDifficultyChange(e.target.value)} w={'fit-content'} borderRadius={0}>
			<option value='easy'>EASY</option>
			<option value='medium'>MEDIUM</option>
			<option value='hard'>HARD</option>
		</Select>
	)
}

export default DifficultyDropdown
