import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { ImClock2, ImTrophy } from 'react-icons/im'
import { BsArrowClockwise } from 'react-icons/bs'

const EndGame = ({ resetGame, showEndGame }) => {
	return (
		<>
			{showEndGame && (
				<VStack pos={'absolute'} w='full' h='full' bg={'hsla(100, 100%, 10%, 0.3)'}>
					<VStack as={motion.div} animate={{ scale: [0, 1], transition: { delay: 0 } }} w='200px' zIndex={3} pt={['20px', null, '10%']}>
						<Times />
						<Button w='full' onClick={resetGame} borderRadius={5} _hover={{ bg: '#243E14' }} bgColor='brand.header' color='brand.header_text'>
							<BsArrowClockwise onClick={resetGame} style={{ transform: 'rotate(60deg)' }} size={'20px'} /> <Text pl={'15px'}>Play Again</Text>
						</Button>
					</VStack>
				</VStack>
			)}
		</>
	)
}

export default EndGame
const Times = () => {
	return (
		<HStack width='full' pt={'20px'} pb={'100px'} spacing={'40px'} borderRadius={5} justifyContent='center' bgColor={'numbers.six'}>
			<Time icon={<ImClock2 size={'30px'} color={'#f5c242'} />} time={'045'} />
			<Time icon={<ImTrophy size={'30px'} color={'#f5c242'} />} time={'030'} />
		</HStack>
	)
}

const Time = ({ icon, time }) => {
	return (
		<VStack>
			{icon}
			<Text fontWeight={'bold'} color='white'>
				{time}
			</Text>
		</VStack>
	)
}