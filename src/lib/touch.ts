import { getDisplacement, getTouchPosition, getModulusSqr, type Vector, getDominantDirection } from "$lib/utils/vectors";

export function touch(node: HTMLElement, settings: {
	tapLength?: number
	dragThreshold?: number
	classPrefix?: string
	minTransitionLength?: number
} = {}) {

	const {
		tapLength = 300,
		dragThreshold: dragThresholdRoot = 50,
		classPrefix = '',
		minTransitionLength = 100,
	} = settings

	// To avoid square roots
	const dragThreshold = dragThresholdRoot ** 2

	let fizzled = true
	let initial: {
		position: Vector,
		time: Date
	}

	let classRemovalTimeout: NodeJS.Timeout

	node.addEventListener('touchstart', e => {
		e.preventDefault()
		fizzled = false
		clearTimeout(classRemovalTimeout)

		initial = {
			position: getTouchPosition(e),
			time: new Date()
		}

		node.classList.add(classPrefix + 'tapped')
	})

	node.addEventListener('touchmove', e => {
		e.preventDefault()
		if (fizzled) return

		const displacement = getDisplacement(initial.position, getTouchPosition(e))
		const distanceSqr = getModulusSqr(displacement)

		if (distanceSqr > dragThreshold) {
			node.dispatchEvent(new CustomEvent("drag", {
				detail: {
					displacement,
					direction: getDominantDirection(displacement)
				}
			}))
			
			fizzle()
		}
	}, { passive: false })

	node.addEventListener('touchend', e => {
		if (!fizzled && new Date().getTime() - initial.time.getTime() < tapLength) {
			node.dispatchEvent(new CustomEvent("tap", e))
		}

		fizzle()
	})

	function fizzle() {
		fizzled = true

		const timeDelta = Math.max(minTransitionLength - (new Date().getTime() - initial.time.getTime()), 0)

		classRemovalTimeout = setTimeout(() => {
			node.classList.remove(classPrefix + 'tapped')
		}, timeDelta)
	}
}