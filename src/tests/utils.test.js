import { describe, expect, test } from '@jest/globals';

import { getObjectLength } from '../scripts/utils.js';

describe('Testing gebObjectLength function from utils.js', () => {
	test('object { a: 1 } length to be 1', () => {
		const obj = { a: 1 };

		expect(getObjectLength(obj)).toBe(1);
	});

	test('object { } length to be 1', () => {
		const obj = {};

		expect(getObjectLength(obj)).toBe(0);
	});

	test('null variable to be null', () => {
		expect(getObjectLength(null)).toBe(null);
	});
});
