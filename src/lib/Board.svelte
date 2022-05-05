<script lang="ts">
	import { fly } from "svelte/transition";
</script>

<section class='flex flex-col absolute inset-0' transition:fly={{ x: 200 }}>
	<slot/>
</section>