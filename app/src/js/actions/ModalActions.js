import ModalConstants from '../constants/ModalConstants';

export function activateModal({ modalId }) {
  return {
    type: ModalConstants.ACTIVATE_MODAL,
    modalId,
  };
}

export default {
  activateModal,
};
