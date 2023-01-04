import './App.css'
import { VStack } from '@chakra-ui/react'
import Game from './components/Game'
import bgImage from './assets/background/background.jpg'

function App() {
	return (
		<VStack w={'full'} h={'100vh'} justifyContent={'center'} style={{ backgroundImage: `url('${bgImage}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
			<Game />
		</VStack>
	)
}

export default App
