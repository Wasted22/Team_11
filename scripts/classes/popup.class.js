import { getObjectLength, isElementVisible, reflow } from '../utils.js';
import TeamData from '../data/team.js';

class Popup {
	constructor({ popupElement }) {
		this.popupId = popupElement.getAttribute('id');

		this.selectors = {
			popupCloseClass: 'js-popup-close',
			popupTriggerClass: 'js-popup-trigger',
			popupTriggerTextClass: 'js-popup-trigger-text',
		};

		this.elements = {
			body: document.body,
			partHeader: document.querySelector('.js-part-header'),
			popup: popupElement,
			popupContent: {
				image: popupElement.querySelector('.js-popup-content-image'),
				name: popupElement.querySelector('.js-popup-content-name'),
				profession: popupElement.querySelector('.js-popup-content-profession'),
				post: popupElement.querySelector('.js-popup-content-post'),
			},
			popupTriggers: document.querySelectorAll(`.js-popup-trigger[data-popup-id='${this.popupId}']`),
			popupWrapper: popupElement.querySelector('.js-popup-wrapper') || popupElement,
		};

		this.settings = {
			...JSON.parse(popupElement.getAttribute('data-popup-settings') || '{}'),
		};

		this.state = {
			isOpened: false,
		};

		this.modes = {
			isActive: 'is-active',
			isOpened: 'is-opened',
		};
	}

	static hideAllInstances = ({ id = '' } = {}) => {
		Object.keys(this.popupInstances).forEach((popupInstanceKey) => {
			if (this.popupInstances[popupInstanceKey]) {
				const popupInstance = this.popupInstances[popupInstanceKey];

				if (popupInstanceKey !== id && popupInstance.state.isOpened) {
					popupInstance.methods.closePopup();
				}
			}
		});
	};

	static popupInstances = {};

	handlers = {
		handleDocumentClick: (event) => {
			const { target } = event;
			const triggerElementId = target.getAttribute('data-popup-id');

			if (target?.classList.contains(this.selectors.popupTriggerClass) && triggerElementId === this.popupId) {
				const [data, id] = target.getAttribute('data-popup-content').split(':');
				const popupContent = data === 'team' ? TeamData.find((el) => el.id === id) : {};

				console.log(popupContent);

				if (target.tagName.toLowerCase() === 'a') {
					event.preventDefault();
				}

				if (this.state.isOpened) {
					this.methods.closePopup();
				} else {
					this.methods.openPopup({ popupContent });
				}
			}
		},

		handleDocumentKeydown: ({ code, key }) => {
			if (key === 'Escape' && code === 'Escape' && this.state.isOpened) {
				this.methods.closePopup();
			}
		},

		handlePopupClick: ({ target }) => {
			if (target?.classList.contains(this.selectors.popupCloseClass) && this.state.isOpened) {
				this.methods.closePopup({ popupTrigger: target });
			}

			if (
				(target?.tagName.toLowerCase() === 'a' || target?.tagName.toLowerCase() === 'button') &&
				this.settings?.closeOnLinkClick &&
				this.state.isOpened
			) {
				this.methods.closePopup();
			}
		},

		handlePopupWrapperTransitionEnd: ({ target }) => {
			if (target === this.elements.popupWrapper && !this.state.isOpened) {
				this.elements.popup.style.setProperty('display', 'none');
				this.elements.body.style.removeProperty('pointer-events');
			}
		},
	};

	listeners = {
		setDocumentClickListener: () => {
			document.addEventListener('click', this.handlers.handleDocumentClick.bind(this));
		},

		setDocumentKeydownListener: () => {
			document.addEventListener('keydown', this.handlers.handleDocumentKeydown.bind(this));
		},

		setPopupClickListener: () => {
			this.elements.popup.addEventListener('click', this.handlers.handlePopupClick.bind(this));
		},

		setPopupWrapperTransitionEndListener: () => {
			this.elements.popupWrapper.addEventListener(
				'transitionend',
				this.handlers.handlePopupWrapperTransitionEnd.bind(this),
			);
		},
	};

	methods = {
		afterClose: () => {},

		afterOpen: () => {},

		beforeClose: () => {
			this.elements.popupTriggers?.forEach((triggerElement) => {
				triggerElement.classList.remove(this.modes.isActive);
			});

			scrollLock.enablePageScroll();
		},

		beforeOpen: ({ popupContent }) => {
			this.methods.setPopupContent({ popupContent });

			this.elements.popupTriggers?.forEach((triggerElement) => {
				triggerElement.classList.add(this.modes.isActive);
			});

			Popup.hideAllInstances();
			scrollLock.disablePageScroll();
		},

		closePopup: () => {
			this.methods.beforeClose();

			this.elements.body.style.setProperty('pointer-events', 'none');
			this.elements.popup.classList.remove(this.modes.isOpened);

			this.state.isOpened = false;

			this.methods.afterClose();
		},

		openPopup: ({ popupContent = {} } = {}) => {
			this.methods.beforeOpen({ popupContent });

			this.elements.body.style.setProperty('pointer-events', 'none');
			this.elements.popup.style.setProperty('display', 'flex');

			reflow(this.elements.popup);

			this.elements.popup.classList.add(this.modes.isOpened);

			[...this.elements.popup.querySelectorAll('input')]
				.filter((inputElement) => isElementVisible(inputElement))[0]
				?.focus();

			this.elements.body.style.setProperty('pointer-events', '');

			this.state.isOpened = true;

			this.methods.afterOpen();
		},

		setPopupContent: ({ popupContent = {} } = {}) => {
			if (getObjectLength(popupContent)) {
				Object.keys(popupContent).forEach((contentKey) => {
					const content = popupContent[contentKey];

					if (this.elements.popupContent[contentKey]) {
						if (contentKey === 'image') {
							const currentPhotoUrl = this.elements.popupContent[contentKey].getAttribute('src');

							if (currentPhotoUrl !== content.url) {
								this.elements.popupContent[contentKey].setAttribute('src', content);
							}

							return;
						}

						this.elements.popupContent[contentKey].innerHTML = content;
					}
				});
			}
		},
	};

	init() {
		Object.keys(this.listeners).forEach((key) => {
			this.listeners[key]();
		});

		Popup.popupInstances[this.popupId] = this;

		return this;
	}
}

export default Popup;
