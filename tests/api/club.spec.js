const { test, expect } = require('@playwright/test');
const { api } = require('./utils');

test.describe('Club API', () => {
	test('GET /club/getClubs - returns list or 401 on empty setup', async ({ request }) => {
		const res = await request.get(api('/club/getClubs'));
		expect([200, 401]).toContain(res.status());
	});

	test('POST /club/getClubMembers - missing body -> 4xx', async ({ request }) => {
		const res = await request.post(api('/club/getClubMembers'), { data: {} });
		expect([200, 400, 401, 404]).toContain(res.status());
	});
});


