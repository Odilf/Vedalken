export function initializePages(startingLifetotal: number, playerNumber: number) {
	let pages = [
		{
			name: 'Lifetotal',
			count: startingLifetotal,
			offset: 0
		},
	]

	for (let i = 0; i < playerNumber; i++) {
		pages = [...pages, {
			name: `Commander damage ${i + 1}`,
			count: 0,
			offset: 0,
		}]
	}

	pages = [...pages, {
		name: 'Poison',
		count: 0,
		offset: 0
	}]

	return pages
}