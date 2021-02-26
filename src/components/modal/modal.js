import React from 'react';

import './modal.css';

// МОДАЛЬНОЕ ОКНО
// (классы css, дочерние элементы для вставки в модалку, функция закрытия окна)
const Modal = ( { clazz, children, closeModal } ) => {
  const { title, body, footer } = children;
  return (
    <div className={ `modal modal-background ${ clazz }` }>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{ title }</h5>
            <button onClick={ closeModal } type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            { body }
          </div>
          <div className="modal-footer">
            { footer }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
