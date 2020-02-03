import React, { useCallback, useEffect } from 'react';
import './Modal.scss';

export default function Modal({ isOpen, setIsOpen, title, children }) {

  // stop propagation of clicks (used on menu so that window click when the current target is the menu do not close the menu)
  const preventWindowClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // open/close menu
  const closeModal = useCallback((e) => {
    e.preventDefault();

    // make sure click event is only handled once
    e.stopPropagation();

    setIsOpen(false);
  }, [setIsOpen]);

  // set up effect so that menu closes when user clicks anywhere on window
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', closeModal);
    } else {
      window.removeEventListener('click', closeModal);
    }

    // cleanup
    return () => window.removeEventListener('click', closeModal);

  }, [isOpen, closeModal]);
  
  return (
    <div className="modal" onClick={preventWindowClick}>
      <header className="modal__header">
        <h3>{title}</h3>
        <div className="modal__header-action" onClick={closeModal}>
          X
        </div>
      </header>
      <div className="modal__body">
        {children}
      </div>
    </div>
  );

}