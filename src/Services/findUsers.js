import { getFetchHeaders } from '../Components/Token/Token.svelte';

let lastRequest = ''

export async function findUsers(value) {
	if(value.length > 0 && lastRequest !== value){
		lastRequest = value
		const res = await fetch(`https://api.github.com/search/users?q=${value}`, {
			headers: getFetchHeaders(),
		}).then(_ => _.json())
		const users = res.items.map(_ => _.login).splice(0, 10)
		
		const fullResult = Promise.all(
			users.map(
				login => fetch(`https://api.github.com/users/${login}`, {
					headers: getFetchHeaders(),
				}).then(_ => _.json())
			)
		).then(items => items.map(
			_ => ({
				key: _.login,
				value: {
					name: _.name,
					image: _.avatar_url,
					followers: _.followers,
					following: _.following,
				}
			}))
		)
		
		return fullResult
	}else {
		return [{
			key: 'Tornek',
			value: {
				name: 'Lavrov',
				image: 'https://avatars2.githubusercontent.com/u/8150361?s=460&u=e1dc5c1f77397fb16909d4b679732eeeeb50f9d6&v=4',
				followers: 1231,
				following: 2345,
			}
		}]
	}
}