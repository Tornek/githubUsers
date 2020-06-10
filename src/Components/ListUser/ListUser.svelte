<script>
	export let result
</script>

<div class="user">
    <img src="{result.value.image}" class="avatar" alt="{result.key} avatar" />
    <div>
        {#if result.value.name}
            {result.value.name}
        {:else}
            name not filled
        {/if}
        <div>
            <b>Followers</b>: {result.value.followers}
            <b>Following</b>: {result.value.following}
        </div>
    </div>
</div>

<style>
.avatar {
	width: 30px;
	height: 30px;
	object-fit: contain;
	margin-right: 5px;
    margin-top: 5px;
}
.user {
	display: flex;
	align-items: end;
    font-size: 14px;
}
</style>