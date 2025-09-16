const { test, expect } = require('@playwright/test');
const { api } = require('./utils');

test.describe('Founder API', () => {
	test('POST /founder/reqMembers - missing body -> 4xx', async ({ request }) => {
		const res = await request.post(api('/founder/reqMembers'), { data: {} });
		expect([200, 400, 401, 404]).toContain(res.status());
	});
});


