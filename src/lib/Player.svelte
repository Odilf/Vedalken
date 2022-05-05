<script lang="ts">
	import Counter from "./Counter.svelte";	
	import { touch } from "./touch";
import { mod } from "./utils";
import { initializePages } from "./utils/counters";
	import { getRotatedDirection } from "./utils/vectors";
	
	export let rotation = 0
	export let index: number
	export let playerNumber: number

	$: horizontal = mod(rotation - 90, 360) === 0 || mod(rotation - 270, 360) === 0
	$: vertical = !horizontal
	$: flipped = mod(rotation, 360) >= 180

	$: color = { h: index / playerNumber * 360, s: 64, l: 32 }
	
	function handleDrag(e) {
		const direction = e.detail.direction
		
		const l = Object.entries(pages).length
		if (direction === getRotatedDirection('left', rotation)) {
			selectedIndex = Math.min(selectedIndex + 1, l - 1)
		} else if (direction === getRotatedDirection('right', rotation)) {
			selectedIndex = Math.max(selectedIndex - 1, 0)
		}
	}

	let pages = initializePages(40, playerNumber)
	

	$: pages = pages.map((p, i) => {
		p.offset = 100 * (i - selectedIndex)
		return p
	})

	let selectedIndex = 0
</script>

<div class='h-full w-full overflow-hidden' >
	<div use:touch={{ classPrefix: 'player-'}} on:drag={handleDrag} class='h-full w-full relative bg-red-800 rounded-xl'
style:background-color='hsl({color.h}, {color.s}%, {color.l}%)'>

	{#each pages as page, i}

		<div class='absolute inset-0 transition-all ease-in-out duration-300 elastic 
		{i === selectedIndex || 'pointer-events-none'}'
		style:transform='translate{vertical ? 'X' : 'Y'}({page.offset * (flipped ? -1 : 1)}%) '>
			<Counter bind:count={page.count} name={page.name} {color} {rotation}/>
		</div>

	{/each}

</div>
</div>