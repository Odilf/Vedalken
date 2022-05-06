import { getDisplacement, getTouchPosition, getModulusSqr, type Vector, getDominantDirection } from "$lib/utils/vectors";

export function touch(node: HTMLElement | SVGElement, options: {
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
	} = options

	// To avoid square roots
	const dragThreshold = dragThresholdRoot ** 2

	let fizzled = true
	let initial: {
		position: Vector,
		time: Date
	}

	node.classList.add(classPrefix + 'untapped')

	let classRemovalTimeout: NodeJS.Timeout

	node.addEventListener('touchstart', e => {
		e.preventDefault()
		fizzled = false
		clearTimeout(classRemovalTimeout)

		initial = {
			position: getTouchPosition(e),
			time: new Date()
		}

		node.classList.remove(classPrefix + 'untapped')
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
			node.dispatchEvent(new MouseEvent('click', e))
		}

		fizzle()
	})

	function fizzle() {
		fizzled = true

		const timeDelta = Math.max(minTransitionLength - (new Date().getTime() - initial.time.getTime()), 0)

		classRemovalTimeout = setTimeout(() => {
			node.classList.remove(classPrefix + 'tapped')
			node.classList.add(classPrefix + 'untapped')
		}, timeDelta)
	}

	touchDesktopPolyfill(node, options)
}

// WARNING: THIS MIGHT GET OUTDATED. 
// I cant be bothered enough to make a nice solution, this is unnecessary anyway. 
function touchDesktopPolyfill(node: HTMLElement | SVGElement, options: {
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
	} = options

	// To avoid square roots
	const dragThreshold = dragThresholdRoot ** 2

	let fizzled = true
	let initial: {
		position: Vector,
		time: Date
	}

	node.classList.add(classPrefix + 'untapped')

	let classRemovalTimeout: NodeJS.Timeout

	node.addEventListener('mousedown', e => {
		e.preventDefault()
		fizzled = false
		clearTimeout(classRemovalTimeout)

		initial = {
			position: { x: e.clientX, y: e.clientY },
			time: new Date()
		}

		node.classList.remove(classPrefix + 'untapped')
		node.classList.add(classPrefix + 'tapped')
	})

	node.addEventListener('mousemove', e => {
		e.preventDefault()
		if (fizzled) return

		const displacement = getDisplacement(initial.position, { x: e.clientX, y: e.clientY })
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

	node.addEventListener('mouseup', e => {
		if (!fizzled && new Date().getTime() - initial.time.getTime() < tapLength) {
			// node.dispatchEvent(new MouseEvent('click', e))
		}

		fizzle()
	})

	function fizzle() {
		fizzled = true

		const timeDelta = Math.max(minTransitionLength - (new Date().getTime() - initial.time.getTime()), 0)

		classRemovalTimeout = setTimeout(() => {
			node.classList.remove(classPrefix + 'tapped')
			node.classList.add(classPrefix + 'untapped')
		}, timeDelta)
	}
}