<script lang="ts">
	import { fade } from "svelte/transition";
	let showMenu = false

	export let hideButton = false
</script>

<div class='h-2 min-w-[0.5rem] z-10 overflow-visible flex justify-center items-center relative' >
	{#if !hideButton}
		<svg class='h-16 active:scale-105 active:brightness-90 transition' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox='-10 -10 310 310' xmlns:xlink="http://www.w3.org/1999/xlink"
		stroke='black' stroke-width=30 stroke-linejoin='round' stroke-linecap='round'
		on:click={() => showMenu = true}>
			<polygon points="300,150 225,280 75,280 0,150 75,20 225,20"
			fill='white'
			/>
			
			<line x1=90 x2=210 y1=150 y2=150/>
			<line x1=150 x2=150 y1=90 y2=210/>
			
			
		</svg>
	{/if}
</div>

{#if showMenu}
	<menu transition:fade={{ duration: 200 }} class='fixed inset-0 bg-orange-800/50 backdrop-blur backdrop-grayscale shadow-lg z-10 rounded p-4
	flex flex-col justify-center items-center text-2xl font-light' on:click|self={() => showMenu = false}>
		<div class='text-6xl font-extrabold mb-8'> Menu </div>

		<a href='/' class='p-2 m-2'> Finish game </a>

		<div>
			<button class='p-2 m-2'> Throw D6 </button>
			<button class='p-2 m-2'> Throw D20 </button>
		</div>


		<button on:click={() => showMenu = false} class='p-2 m-2'> Close menu </button>
	</menu>
{/if}