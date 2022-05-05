<script lang='ts'>
	import Bar from "$lib/Bar.svelte";
	import Board from "$lib/Board.svelte";
	import Player from "$lib/Player.svelte";
</script>

<Board>
	<div class='flex-1'>
		<Player rotation={270} index={1} playerNumber={2}/>
	</div>
	
	<Bar/>
	
	<div class='flex-1'>
		<Player rotation={90} index={0} playerNumber={2}/>
	</div>
</Board>