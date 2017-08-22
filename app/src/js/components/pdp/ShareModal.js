/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import Clipboard from 'clipboard';
import { ShareButtons } from '../../libs/react-share/react-share';

// Components
import Button from '../generic/Button';
import RenderSVG from '../utility/RenderSVG';
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';

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

function mapStateToProps(state) {
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

    this.state = {
      clipboard: new Clipboard('.js-clipboard-node'),
    };

    autobind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  handleCopyLinkClick() {
    /* eslint-disable no-console */
    console.log(`Copied Share Link: ${this.props.currentURL}`);
    // TO-DO:
    // - Toast
    // - Fallback?
  }

  componentWillMount() {
    this.state.clipboard.text = () => this.props.currentURL;
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
                  <RenderSVG
                    svgPath={FacebookShareIcon.url}
                    altText="Facebook Share Icon"
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
                  <RenderSVG
                    svgPath={PinterestShareIcon.url}
                    altText="Pinterest Share Icon"
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
                  <RenderSVG
                    svgPath={TwitterShareIcon.url}
                    altText="Twitter Share Icon"
                    width="40px"
                    height="40px"
                  />
                </TwitterShareButton>
              </li>
            </ul>
            <Button
              tall
              secondary
              className="Modal__content--med-margin-bottom js-clipboard-node"
              text="Copy Link"
              handleClick={this.handleCopyLinkClick}
            />
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

ShareModal.propTypes = {
  currentURL: PropTypes.string.isRequired,
  currentProductImage: PropTypes.string.isRequired,
  // Redux
  activateModal: PropTypes.func.isRequired,
};

ShareModal.defaultProps = {
  currentURL: '',
  currentProductImage: '',
};

export default connect(mapStateToProps, dispatchToProps)(ShareModal);
