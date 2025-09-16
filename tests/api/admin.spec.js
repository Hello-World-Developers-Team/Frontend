const { test, expect } = require('@playwright/test');
const { api } = require('./utils');

test.describe('Admin API', () => {
	test('POST /admin/login - invalid admin returns 401', async ({ request }) => {
		const res = await request.post(api('/admin/login'), {
			data: { mail: 'no-admin@example.com', password: 'wrong' },
		});
		expect(res.status()).toBe(401);
	});
});


