import React from 'react';

import './form-button.css';

// КНОПКА ДЛЯ РАБОТЫ С ФОРМАМИ СО СВОИМИ НАЗВАНИЕМ, СТИЛЯМИ, ДЕЙСТВИЕМ
const FormButton = ({ label, type, css, onClick }) => {
  const clazz = "btn form-btn " + css;
  return (
      <button
        type={ type }
        onClick={ onClick }
        className={ clazz }>
          { label }
      </button>
  );
}

export default FormButton;
