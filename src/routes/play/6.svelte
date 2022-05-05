<script lang='ts'>
	import Bar from "$lib/Bar.svelte";
	import Board from "$lib/Board.svelte";
	import Player from "$lib/Player.svelte";
</script>

<Board>
	<div class='flex flex-1'>
		<div class='flex-1'>
			<Player rotation={90} index={0} playerNumber={5}/>
		</div>
		
		<Bar hideButton/>

		<div class='flex-1'>
			<Player rotation={-90} index={1} playerNumber={5}/>
		</div>
	</div>
	
	<Bar/>
	
	<div class='flex flex-1'>
		<div class='flex-1'>
			<Player rotation={90} index={2} playerNumber={5}/>
		</div>
		
		<Bar hideButton/>

		<div class='flex-1'>
			<Player rotation={-90} index={3} playerNumber={5}/>
		</div>
	</div>

	<Bar hideButton />

	<div class='flex flex-1'>
		<div class='flex-1'>
			<Player rotation={90} index={4} playerNumber={5}/>
		</div>
		
		<Bar hideButton/>

		<div class='flex-1'>
			<Player rotation={-90} index={5} playerNumber={5}/>
		</div>
	</div>
</Board>