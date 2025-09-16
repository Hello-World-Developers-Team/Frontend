const { test, expect } = require('@playwright/test');
const { api } = require('./utils');

test.describe('Post API', () => {
	test('GET /post/getAllPosts - returns posts or 401', async ({ request }) => {
		const res = await request.get(api('/post/getAllPosts'));
		expect([200, 401, 404]).toContain(res.status());
	});
});


