import ModalConstants from '../constants/ModalConstants';

export function activateModal({ modalId, shouldAppear = true, activeSlideIndex = 0 }) {
  return {
    type: ModalConstants.ACTIVATE_MODAL,
    modalId,
    shouldAppear,
    activeSlideIndex,
  };
}

export default {
  activateModal,
};
