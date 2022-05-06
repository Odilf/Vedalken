<script lang="ts">
	import { scale } from "svelte/transition";
	import { quintOut } from 'svelte/easing'
	import { touch } from "./touch";
	import { getOrientations } from "./utils/vectors";

	export let count = 40
	export let name = ''
	export let color: { h: number, s: number, l: number }

	export let rotation: number
	$: ({ horizontal, vertical, flipped } = getOrientations(rotation))

</script>

<div class='w-full h-full flex {vertical && 'flex-col'} relative z-0'>
	<div class='flex-1 transition-all duration-300 rounded-xl z-0' use:touch={{ classPrefix:'counter-' }} on:tap={ () => count += flipped ? -1 : 1 } style:background-color='hsl({color.h}, {color.s}%, {color.l}%)'/>

	<div class='flex-1 transition-all duration-300 rounded-xl z-0' use:touch={{ classPrefix:'counter-' }} on:tap={ () => count -= flipped ? -1 : 1 } style:background-color='hsl({color.h}, {color.s}%, {color.l}%)'/>

	{#key count}
		<div class='absolute w-full h-full flex justify-center items-center flex-col
		text-[6em] pointer-events-none text-white font-black z-50 inset-0'
		style:transform='rotate({rotation}deg)'
		>
			<div in:scale={{ start: 0.7, easing: quintOut, duration: 300, opacity: 0.8 }} class='z-20'>
				{count} 
			</div>
			<div class='text-xl font-light text-center w-full'>
				{name} 
			</div>
		</div>
	{/key}
</div>

<style global lang='postcss'>
	.counter-tapped {
		filter: brightness(80%);
		@apply duration-75;
	}
</style>
