<script context='module'>
	export function getFetchHeaders() {
		const password = document.getElementById('token').value
		const headers = new Headers()
		
		if(password.length > 0) {
			headers.set('Authorization', 'token ' + password);
		}
		return headers
	}
</script>
<div>
	<label>
		Введите гитхаб токен, что бы избавиться от ограничения в 60 запросов, иначе все поломается
		<input id="token" value="">
	</label>
</div>

<style>
	#token {
		display: block;
		width: 100%;
	}
</style>