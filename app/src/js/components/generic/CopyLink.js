import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Clipboard from 'clipboard';
import classnames from 'classnames';

// Components
import Button from '../generic/Button';
import Input from '../form/Input';

// CSS
import '../../../css/components/CopyLink.scss';

class CopyLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clipboardError: false,
      copySuccess: false,
      copyLinkText: 'Copy Link',
    };

    autobind(this);
  }

  handleCopyLinkClick() {
    this.setState({
      copySuccess: true,
      copyLinkText: 'Copied Link!',
    });
  }

  handleCopyLinkClickError() {
    this.setState({
      clipboardError: true,
    });
  }

  /* eslint-disable react/no-did-mount-set-state */
  /* eslint-disable react/no-find-dom-node */
  componentDidMount() {
    this.setState({
      clipboard: new Clipboard(this.copyTrigger, {
        text: () => this.props.url,
        error: () => {
          this.handleCopyLinkClickError();
        },
      }),
    });
  }

  render() {
    const {
      url,
    } = this.props;

    const {
      clipboardError,
      copySuccess,
      copyLinkText,
    } = this.state;

    return (
      <div>
        <Button
          tall
          secondary={!copySuccess}
          passedRef={i => this.copyTrigger = i}
          className={
            classnames(
              'CopyLinkButton',
              'Modal__content--med-margin-bottom',
            )
          }
          text={copyLinkText}
          handleClick={this.handleCopyLinkClick}
        />
        {
          clipboardError ?
          (
            <Input
              id="copy_link_fallback"
              label="Press Ctrl/Cmd-C To Copy"
              defaultValue={url}
              selectOnMount
              readOnly
              wrapperClassName="Modal__content--med-margin-bottom"
            />
          ) : null
        }
      </div>
    );
  }
}

CopyLink.propTypes = {
  url: PropTypes.string.isRequired,
};

export default CopyLink;
