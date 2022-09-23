import * as React from 'react';
import useEventListener from '../../utils/useEventListener';
import Icon from '../Icon/Icon';
import './modal.scss';

interface IModalProps {
  active: boolean;
  children?: React.ReactNode;
  onClose?: any;
  title: string;
}

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
  const { active, children, onClose, title } = props;

  const handlerModal = (event: any) => {
    const elementModal = event.target.closest('.modal');
    const elementContent = event.target.closest('.modal__content');
    if (elementModal && !elementContent && active) {
      onClose() && onClose();
    }
  };

  if (!active) {
    window.removeEventListener('click', handlerModal);
    return null;
  }

  useEventListener('click', handlerModal);

  return (
    <article className={`modal ${active ? 'modal--show' : ''}`}>
      <section className="modal__content">
        <div className="modalHeader">
          {onClose && (
            <div className="modalHeader__close">
              <button className="closeButton" onClick={onClose}>
                <Icon type="close" />
              </button>
            </div>
          )}
          <h3 className="modalHeader__title">{title}</h3>
        </div>
        {children}
      </section>
    </article>
  );
};

export default Modal;
