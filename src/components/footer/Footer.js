import { HStack, Link } from '@chakra-ui/react'
import React from 'react'
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
	const sociaslAtt = { iconSize: '30px', color: 'white' }
	const socials = [
		{
			icon: <FaGithubSquare size={sociaslAtt.iconSize} color={sociaslAtt.color} />,
			link: 'https://github.com/greenplastic90/Minesweeper',
		},
		{
			icon: <FaLinkedin size={sociaslAtt.iconSize} color={sociaslAtt.color} />,
			link: 'https://www.linkedin.com/in/bashar-othman/',
		},
	]

	return (
		<HStack w={'full'} justifyContent={'center'} pb={'20px'}>
			{socials.map((social) => (
				<Social key={social.link} icon={social.icon} link={social.link} />
			))}
		</HStack>
	)
}

export default Footer

const Social = ({ icon, link }) => {
	return (
		<Link href={link} isExternal>
			{icon}
		</Link>
	)
}
