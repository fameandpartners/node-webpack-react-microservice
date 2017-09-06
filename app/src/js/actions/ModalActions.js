import ModalConstants from '../constants/ModalConstants';

export function activateModal({ modalId, shouldAppear = true }) {
  console.log('MODAL_ID', modalId);
  return {
    type: ModalConstants.ACTIVATE_MODAL,
    modalId,
    shouldAppear,
  };
}

export default {
  activateModal,
};
