<script>
	import Menu from "$lib/Menu.svelte";
	import Two from "./2.svelte";
	import Three from "./3.svelte";
	import Four from "./4.svelte";
	import Five from "./5.svelte";
	import Six from "./6.svelte";
</script>


<Menu options={[
	{ name: '2', component: Two },
	{ name: '3', component: Three },
	{ name: '4', component: Four },
	{ name: '5', component: Five },
	{ name: '6', component: Six },
]}>
	<div slot='header' class='flex flex-col justify-center items-center'>
		<h1 class='text-6xl'> Play </h1>
		
		<h2> Number of players: </h2>
	</div>
</Menu>

<!-- <div class='flex flex-wrap'>
	<a href='play/2' class='m-2 p-3 sorta-button'> 2 </a>
	<a href='play/3' class='m-2 p-3 sorta-button'> 3 </a>
	<a href='play/4' class='m-2 p-3 sorta-button'> 4 </a>
	<a href='play/5' class='m-2 p-3 sorta-button'> 5 </a>
	<a href='play/6' class='m-2 p-3 sorta-button'> 6 </a>
</div> -->