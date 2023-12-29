import Popup from './classes/popup.class.js';

window.addEventListener('DOMContentLoaded', () => {
	class App {
		constructor() {
			this.elements = {
				documentRoot: document.getElementsByTagName('html')[0],
			};
		}

		canUseWebp() {
			const canvasElement = document.createElement('canvas');

			if (
				!(!canvasElement.getContext || !canvasElement.getContext('2d')) &&
				canvasElement.toDataURL('image/webp').indexOf('data:image/webp') === 0
			) {
				this.elements.documentRoot.classList.add('webp');
			} else {
				this.elements.documentRoot.classList.add('no-webp');
			}
		}

		init() {
			this.canUseWebp();

			this.initClasses();

			console.log('App has been initialized');

			return this;
		}

		initClasses() {
			document.querySelectorAll('.js-popup')?.forEach((popupElement) => {
				new Popup({ popupElement }).init();
			});
		}
	}

	new App().init();
});
