import './App.css'
import { Heading, VStack } from '@chakra-ui/react'
import Game from './components/Game'

function App() {
	return (
		<VStack w={'full'} h={'100vh'} justifyContent={'center'} bgColor={'green.400'}>
			<Game />
		</VStack>
	)
}

export default App
