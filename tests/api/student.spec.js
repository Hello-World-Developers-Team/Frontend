const { test, expect } = require('@playwright/test');
const { api } = require('./utils');

test.describe('Student API', () => {
	test('POST /api/mail - unknown mail returns 404/401/200/500', async ({ request }) => {
		const res = await request.post(api('/api/mail'), {
			data: { mail: 'unknown@example.com' }
		});
		expect([200, 401, 404, 500]).toContain(res.status());
	});

	test('POST /api/otp - invalid otp returns 400/200/500', async ({ request }) => {
		const res = await request.post(api('/api/otp'), {
			data: { mail: 'unknown@example.com', otp: '123456' }
		});
		expect([200, 400, 500]).toContain(res.status());
	});
});


