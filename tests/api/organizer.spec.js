const { test, expect } = require('@playwright/test');
const { api } = require('./utils');

test.describe('Organizer API', () => {
	test('GET /organizer/getReqShops - returns data or 401', async ({ request }) => {
		const res = await request.get(api('/organizer/getReqShops'));
		expect([200, 401]).toContain(res.status());
	});
});


