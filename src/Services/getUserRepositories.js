import {getFetchHeaders} from '../Components/Token/Token.svelte';

export async function getUserRepositories(value){
	const res = await fetch(`https://api.github.com/users/${value}/repos`, {
		headers: getFetchHeaders(),
	}).then(_ => _.json())
	
	if(res.message) {
		return {
			success: false
		}
	}else {
		return {
			success: true,
			data: res
		}
	}
}