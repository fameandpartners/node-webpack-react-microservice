/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autobind from 'react-autobind';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import CopyLink from '../generic/CopyLink';
import FacebookIconShareButton from '../generic/FacebookIconShareButton';
import TwitterIconShareButton from '../generic/TwitterIconShareButton';
import PinterestIconShareButton from '../generic/PinterestIconShareButton';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// CSS
import '../../../css/components/ShareModal.scss';

function stateToProps(state) {
  return {
    currentURL: state.$$appState.get('currentURL'),
    currentProductImage: state.$$productState.get('productImage'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(ModalActions, dispatch);
  return { activateModal: actions.activateModal };
}

class ShareModal extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    const {
      currentURL,
      currentProductImage,
    } = this.props;

    return (
      <ModalContainer
        modalContainerClass="grid-middle"
        modalIds={[ModalConstants.SHARE_MODAL]}
      >
        <Modal
          headline="Share Your Design"
          handleCloseModal={this.handleCloseModal}
        >
          <div
            className="ShareModal typography Modal__layout-container"
          >
            <ul className="ShareModal__icons-row Modal__content--sm-margin-top">
              <li className="u-cursor--pointer">
                <FacebookIconShareButton
                  url={currentURL}
                />
              </li>
              <li className="u-cursor--pointer">
                <PinterestIconShareButton
                  url={currentURL}
                  image={currentProductImage}
                />
              </li>
              <li className="u-cursor--pointer">
                <TwitterIconShareButton
                  url={currentURL}
                />
              </li>
            </ul>
            <CopyLink url={currentURL} />
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

ShareModal.propTypes = {
  // Redux
  activateModal: PropTypes.func.isRequired,
  currentURL: PropTypes.string.isRequired,
  currentProductImage: PropTypes.string.isRequired,
};

export default connect(stateToProps, dispatchToProps)(ShareModal);
