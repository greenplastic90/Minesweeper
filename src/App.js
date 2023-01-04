import './App.css'
import { VStack } from '@chakra-ui/react'
import Game from './components/Game'
import bgImage from './assets/background/background-minesweeper.svg'

function App() {
	return (
		<VStack w={'full'} h={'100vh'} justifyContent={'center'} style={{ backgroundImage: `url('${bgImage}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
			<Game />
		</VStack>
	)
}

export default App
// <TbX size='100%' color={'#DF4826'} />
// <BsFillFlagFill size={flagSize} color={'#DF4826'} />
