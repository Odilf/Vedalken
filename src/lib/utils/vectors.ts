import { mod } from "."

export interface Vector {
	x: number,
	y: number,
}

export type Direction = typeof directions[number]
const directions = ['right', 'down', 'left', 'up'] as const

export function getTouchPosition(touch: Touch | TouchEvent) {
	if ('touches' in touch) {
		touch = touch.touches.item(0)
	}

	return {
		x: touch.clientX,
		y: touch.clientY,
	}
}

export function getDisplacement(from: Vector, to: Vector) {
	return {
		x: to.x - from.x,
		y: to.y - from.y,
	}
}

export function getModulusSqr(vector: Vector) {
	return vector.x ** 2 + vector.y ** 2
}

export function getDominantDirection(vector: Vector) {
	const x = vector.x > 0 ? 'right' : 'left'
	const y = vector.y > 0 ? 'down' : 'up'

	const direction = Math.abs(vector.x) > Math.abs(vector.y) ? x : y
	return direction
}

export function getRotatedDirection(direction: Direction, rotation: number) {
	const offset = Math.floor(rotation / 90)
	const index = mod(directions.indexOf(direction) + offset, directions.length)
	
	return directions[index]
}

export function getOrientations(rotation: number) {
	const horizontal = mod(rotation - 90, 360) === 0 || mod(rotation - 270, 360) === 0
	const vertical = !horizontal
	const flipped = mod(rotation, 360) >= 180

	return {
		horizontal, vertical, flipped
	}
}