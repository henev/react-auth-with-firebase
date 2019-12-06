import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import ToastContext from './context';
import Toast from './Toast';
import styles from './styles.module.css';

function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}

function withToastProvider(Component) {
  function WithToastProvider(props) {
    const [toasts, setToasts] = useState([]);
    const add = (content, type = 'success') => {
      const id = generateUEID();
      const toastsCopy = [...toasts];
      
      if (toastsCopy.length > 4) {
        toastsCopy.shift();
      }

      setToasts([...toastsCopy, { id, content, type }]);
    };
    const remove = id => setToasts(toasts.filter(t => t.id !== id));

    return (
      <ToastContext.Provider value={{ add, toasts }}>
        <Component {...props} />

        { createPortal(
            <div className={styles.toastsContainer}>
              { toasts.map(t => (
                  <Toast key={t.id} remove={() => remove(t.id)} type={t.type}>
                    {t.content}
                  </Toast>
              )) }
            </div>,
            document.body
        ) }
      </ToastContext.Provider>
    );
  }

  return WithToastProvider;
}

export default withToastProvider;