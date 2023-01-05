import { HStack, Image, Text } from '@chakra-ui/react'
import FlagImage from '../../../assets/icons/flag-1.svg'

const Flags = ({ numberOfFlags }) => {
	return (
		<HStack spacing={'4px'}>
			{/* <BsFillFlagFill color={'#DF4826'} size={'20px'} /> */}

			<Image w={'20px'} src={FlagImage} alt='flag' />
			<Text fontSize='30px' color={'brand.header_text'}>
				{numberOfFlags}
			</Text>
		</HStack>
	)
}

export default Flags
