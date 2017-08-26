/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { ShareButtons } from '../../libs/react-share/react-share';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import CopyLink from '../generic/CopyLink';
import IconSVG from '../generic/IconSVG';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// Assets
import FacebookShareIcon from '../../../svg/share-facebook.svg';
import PinterestShareIcon from '../../../svg/share-pinterest.svg';
import TwitterShareIcon from '../../../svg/share-twitter.svg';

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

    const {
      FacebookShareButton,
      PinterestShareButton,
      TwitterShareButton,
    } = ShareButtons;

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
            <ul className="ShareModal__icons-row">
              <li className="u-cursor--pointer">
                <FacebookShareButton
                  url={currentURL}
                  className="ShareModal__icon-button"
                >
                  <IconSVG
                    svgPath={FacebookShareIcon.url}
                    width="40px"
                    height="40px"
                  />
                </FacebookShareButton>
              </li>
              <li className="u-cursor--pointer">
                <PinterestShareButton
                  url={currentURL}
                  className="ShareModal__icon-button"
                  media={currentProductImage}
                >
                  <IconSVG
                    svgPath={PinterestShareIcon.url}
                    width="40px"
                    height="40px"
                  />
                </PinterestShareButton>
              </li>
              <li className="u-cursor--pointer">
                <TwitterShareButton
                  url={currentURL}
                  className="ShareModal__icon-button"
                >
                  <IconSVG
                    svgPath={TwitterShareIcon.url}
                    width="40px"
                    height="40px"
                  />
                </TwitterShareButton>
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
