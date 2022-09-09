import * as React from 'react';
import useEventListener from '../../utils/useEventListener';
import './modal.scss';

interface IModalProps {
  active: boolean;
  children?: React.ReactNode;
  onClose?: any;
}

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
  const { active, onClose, children } = props;

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
      <section className="modal__content">{children}</section>
    </article>
  );
};

export default Modal;
