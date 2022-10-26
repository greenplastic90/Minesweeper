import { Select } from '@chakra-ui/react'
import { localStorageDifficulty } from '../../game-grid/grid-functions'

const DifficultyDropdown = ({ setDifficulty, resetGame }) => {
	const handelDifficultyChange = (diff) => {
		localStorage.setItem('mineSweeperDiffuculty', diff)

		setDifficulty(localStorageDifficulty())
		resetGame()
	}
	return (
		<Select
			defaultValue={localStorage.getItem('mineSweeperDiffuculty')}
			onChange={(e) => handelDifficultyChange(e.target.value)}
			w={'fit-content'}>
			<option value='easy'>Easy</option>
			<option value='medium'>Medium</option>
			<option value='hard'>Hard</option>
		</Select>
	)
}

export default DifficultyDropdown
