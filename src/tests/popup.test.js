import { describe, expect, test } from '@jest/globals';

import Popup from '../scripts/classes/popup.class.js';

const popup = document.createElement('div');

const MockedPopupInstance = new Popup({ popupElement: popup });

describe('Popup initialization', () => {
	test('Popup instance checking', () => {
		expect(new Popup({ popupElement: popup })).toBeInstanceOf(Popup);
	});
});

describe('Popup change state by methods', () => {
	test('Popup opening without method call', () => {
		expect(MockedPopupInstance.state.isOpened).toBe(false);
	});

	test('Popup opening with method call', () => {
		MockedPopupInstance.methods.openPopup();
		expect(MockedPopupInstance.state.isOpened).toBe(true);
		MockedPopupInstance.methods.closePopup();
	});

	test('Popup closing without method call', () => {
		MockedPopupInstance.methods.openPopup();
		expect(MockedPopupInstance.state.isOpened).toBe(true);
		MockedPopupInstance.methods.closePopup();
	});

	test('Popup closing with method call', () => {
		MockedPopupInstance.methods.openPopup();
		MockedPopupInstance.methods.closePopup();
		expect(MockedPopupInstance.state.isOpened).toBe(false);
	});
});
