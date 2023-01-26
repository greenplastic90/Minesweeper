import { isMobileOrTablet } from './game-grid/grid-functions'

export const easy = {
	name: 'Easy',
	mines: 10,
	horizontal_boxes: 10,
	vertical_boxes: 8,
	box_width: ['35px', '35px', '45px'],
	mine_width: ['16px', '16px', '18px'],
	border_width: '4px solid',
	value_size: ['25px', null, '30px'],
}
export const medium = {
	name: 'Medium',
	mines: 40,
	horizontal_boxes: isMobileOrTablet() ? 14 : 18,
	vertical_boxes: isMobileOrTablet() ? 18 : 14,
	box_width: ['24px', null, '30px'],
	mine_width: ['11px', null, '12px'],
	border_width: '3px solid',
	value_size: ['16px', null, '20px'],
}
export const hard = {
	name: 'Hard',
	mines: 99,
	horizontal_boxes: isMobileOrTablet() ? 16 : 24,
	vertical_boxes: isMobileOrTablet() ? 30 : 20,
	box_width: ['19px', null, '25px'],
	mine_width: ['11px', null, '12px'],
	border_width: '3px solid',
	value_size: ['16px', null, '17px'],
}
