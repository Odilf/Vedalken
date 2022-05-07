<script lang="ts">
	import { touch } from "./touch";

	export let options: {
		name: string,
		component: Function // Apparently types of svelte Compoments?
	}[]

	let selected = null
</script>

<div class='relative w-screen transition duration-300 {selected !== null && '-translate-x-full'} flex flex-col justify-center items-center'>
	<slot name='header'/>

	<ul>
		{#each options as { name }, i}
			<div use:touch on:click={() => selected = i} 
				class='text-4xl p-4 m-4 bg-blue-700 rounded shadow font-black text-center'>
				{name}
			</div>
		{/each}
	</ul>

	<slot name='footer'/>
</div>

{#each options as { component }, i}
	<div class='absolute inset-0 transition duration-300 {selected !== i && 'translate-x-full'} flex flex-col justify-center items-center'>
		<div use:touch on:click={() => selected = null}>
			Back
		</div>

		<svelte:component this={component}/>

	</div>
{/each}