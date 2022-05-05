<script lang='ts'>
	import Bar from "$lib/Bar.svelte";
	import Board from "$lib/Board.svelte";
	import Player from "$lib/Player.svelte";
</script>

<Board>
	<div class='flex flex-1'>
		<div class='flex-1'>
			<Player rotation={180} index={0} playerNumber={4}/>
		</div>
		
		<Bar hideButton/>
		
		<div class='flex-1'>
			<Player rotation={180} index={1} playerNumber={4}/>
		</div>
	</div>

	<Bar/>

	<div class='flex flex-1'>
		<div class='flex-1'>
			<Player rotation={0} index={2} playerNumber={4}/>
		</div>
		
		<Bar hideButton/>

		<div class='flex-1'>
			<Player rotation={0} index={3} playerNumber={4}/>
		</div>
	</div>
</Board>