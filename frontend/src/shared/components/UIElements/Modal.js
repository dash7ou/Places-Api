import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from '../UIElements/Backdrop';

import './Modal.css';

const ModalOverlay = ({
	className,
	style: modalStyle,
	headerClass,
	header,
	onSubmit: onSubmitForm,
	contentClass,
	children,
	footerClass,
	footer
}) => {
	const onSubmitFormAction = (event) => {
		onSubmitForm ? onSubmitForm : event.preventDefault;
	};

	const content = (
		<div className={`modal ${className}`} style={modalStyle}>
			<header className={`modal__header ${headerClass}`}>
				<h2>{header}</h2>
			</header>
			<form onSubmit={(event) => onSubmitFormAction(event)}>
				<div className={`modal__content ${contentClass}`}>{children}</div>
				<footer className={`modal__footer ${footerClass}`}>{footer}</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = ({ show, onCancel, props }) => {
	return (
		<Fragment>
			{show && <BackDrop onClick={onCancel} />}
			<CSSTransition in={show} mountOnEnter unmountOnExit timeout={200} classNames='modal'>
				<ModalOverlay {...props} />
			</CSSTransition>
		</Fragment>
	);
};

export default Modal;
