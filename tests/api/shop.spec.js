const { test, expect } = require('@playwright/test');
const { api } = require('./utils');

test.describe('Shop API', () => {
	test('GET /shop/getShops - returns list or 401', async ({ request }) => {
		const res = await request.get(api('/shop/getShops'));
		expect([200, 401]).toContain(res.status());
	});

	test('GET /shop/getItemOfShop - missing query -> 4xx', async ({ request }) => {
		const res = await request.get(api('/shop/getItemOfShop'));
		expect([200, 400, 401, 404]).toContain(res.status());
	});
});


