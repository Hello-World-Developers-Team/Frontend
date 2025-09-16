const BASE_URL = (typeof process !== 'undefined' && process.env && process.env.BACKEND_BASE_URL) ? process.env.BACKEND_BASE_URL : 'http://localhost:8080';

function api(path) {
	if (path.startsWith('http')) return path;
	return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function jsonHeaders() {
	return {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};
}

async function postJson(request, path, body) {
	const response = await request.post(api(path), {
		data: body,
		headers: jsonHeaders()
	});
	return response;
}

module.exports = { api, jsonHeaders, postJson, BASE_URL };


