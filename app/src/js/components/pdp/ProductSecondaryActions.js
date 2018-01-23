import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Constants
import ModalConstants from '../../constants/ModalConstants';
import ModalActions from '../../actions/ModalActions';

// Assets
import ShareIcon from '../../../svg/i-share.svg';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productTitle: state.$$productState.get('productTitle'),
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators(ModalActions, dispatch);
}

class ProductSecondaryActions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleOpenShareModalClick(e) {
    e.preventDefault();
    this.props.activateModal({ modalId: ModalConstants.SHARE_MODAL });
  }

  render() {
    const { shareText } = this.props;
    return (
      <div className="ProductSecondaryActions">
        <ul>
          <li
            className="u-cursor--pointer u-display--inline"
            onClick={this.handleOpenShareModalClick}
          >
            <ShareIcon
              className="u-vertical-align--sub"
              width="40px"
              height="18px"
            />
            { shareText }
          </li>
        </ul>
      </div>
    );
  }
}

ProductSecondaryActions.propTypes = {
  // Redux Props
  shareText: PropTypes.string.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

ProductSecondaryActions.defaultProps = {
  shareText: null,
};

export default connect(stateToProps, dispatchToProps)(ProductSecondaryActions);
