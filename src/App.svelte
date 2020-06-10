<script>
    import { AutoComplete } from '@brunnerh/autocomplete';
    import Content from './Components/Content/Content.svelte';
    import Token from './Components/Token/Token.svelte';
    import ListUser from './Components/ListUser/ListUser.svelte';
	import Modal from "modal-overlay";
    import { findUsers } from './Services/findUsers'
    import { getUserRepositories } from './Services/getUserRepositories'
	
    const modal = {
    	display: false,
    	closeModal: () => {
            modal.display = false
        },
    	openModal: () => {
            modal.display = true
        },
        content: '',
        header: 'Error'
    }
    let selectedUser
    
    async function getItem() {
    	return findUsers(document.getElementById('username').value)
    }
    async function onSelected({detail}) {
    	selectedUser = detail
        const result = await getUserRepositories(detail.key)
        
        if(result.success){
            modal.header = false
            modal.content = `<ol>${result.data.map((repo) => {
            	return `<li>
	<a href="${repo.html_url}" target="_blank"><b>${repo.name}</b> ${repo.language ? '(' + repo.language + ')' : ''}</a>
	<div>${repo.description || ''}</div>
	<div>
		<b>Created at: </b> ${new Date(Date.parse(repo.created_at)).toLocaleDateString()}
		<b>Updated at: </b> ${new Date(Date.parse(repo.updated_at)).toLocaleDateString()}
	</div>
	<div><b>forks:</b> ${repo.forks}</div>
	<div><b>watchers:</b> ${repo.watchers}</div>
</li>`
            }).join('')}</ol>`
        } else {
			modal.header = 'Error'
			modal.content = `User ${detail.key} not found`
        }
        modal.openModal()
    }
</script> 
 
<Content>
	<Token />
	<div class="searchbar">
		<label class="searchbar__input">
	        Github username
	        <AutoComplete 
		        id="username" 
		        placeholder="Tornek"
		        debounce="500"
		        items={getItem}
		        on:item-selected={onSelected}
		        let:result
	        >
		        <!-- Renders item with index prefix and value in parentheses on a second line. -->
                <div slot="template">
                    {result.index + 1}. {@html result.label}
                    <ListUser result={result} />
                </div>
            </AutoComplete>
	    </label>
    </div>
</Content>
{#if modal.display}
	<Modal on:close="{modal.closeModal}">
		{#if modal.header}
			<div class="modal__header">{@html modal.header}</div>
		{:else}
			<div class="modal__header"><ListUser result={selectedUser} /></div>
		{/if}
		{#if modal.content}
			{@html modal.content}
		{/if}
	</Modal>
{/if}

<style>
.searchbar {
	display: flex;
	flex-direction: row;
}
.searchbar :global(#username) {
    padding: 0.4em 1em; 
}
.searchbar {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
}
.searchbar__input {
    flex: 1 1 auto;
    padding-right: 2px;
}
.modal__header {
	font-size: 1.6em;
	padding-bottom: 15px;
	margin-bottom: 15px;
	border-bottom: 1px solid #8e8a8a;
}
</style>