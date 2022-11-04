import { HStack, Text } from '@chakra-ui/react'
import { BsFillFlagFill } from 'react-icons/bs'

const Flags = ({ numberOfFlags }) => {
	return (
		<HStack spacing={'4px'}>
			<BsFillFlagFill color={'#DF4826'} size={'20px'} />
			<Text fontWeight={'bold'} fontSize='20px' color={'brand.header_text'}>
				{numberOfFlags}
			</Text>
		</HStack>
	)
}

export default Flags
