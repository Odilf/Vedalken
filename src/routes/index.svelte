<script>
	import Menu from "$lib/Menu.svelte";
	import { touch } from "$lib/touch";
	import Play from "./play/index.svelte";

</script>



<Menu options={[
	{
		name: 'Play!',
		component: Play,
	},
	{
		name: 'Options',
		component: null,
	}
]}>
	<h1 class='text-6xl font-thin mb-4' slot='header'> Vedalken </h1>

	<a href="/about" slot='footer' class='mt-4 text-xl' use:touch> About </a>
</Menu>
