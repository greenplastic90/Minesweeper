import { HStack, Text } from '@chakra-ui/react'
import { BsFillFlagFill } from 'react-icons/bs'

const Flags = ({ numberOfFlags }) => {
	return (
		<HStack>
			<BsFillFlagFill />
			<Text fontWeight={'bold'} color={'brand.header_text'}>
				{numberOfFlags}
			</Text>
		</HStack>
	)
}

export default Flags
