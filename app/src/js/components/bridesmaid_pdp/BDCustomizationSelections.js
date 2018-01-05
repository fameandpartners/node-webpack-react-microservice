import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';

// FAKE TEST
import microMiniImage from '../../../img/test/bridesmaids/micro-mini.png';
import miniImage from '../../../img/test/bridesmaids/mini.png';
import kneeImage from '../../../img/test/bridesmaids/knee.png';
import midiImage from '../../../img/test/bridesmaids/midi.png';
import ankleImage from '../../../img/test/bridesmaids/ankle.png';
import maxiImage from '../../../img/test/bridesmaids/maxi.png';

import '../../../css/components/BDCustomizationSelections.scss';

const IMGS = {
  'micro-mini': microMiniImage,
  mini: miniImage,
  knee: kneeImage,
  midi: midiImage,
  ankle: ankleImage,
  maxi: maxiImage,
};

// import PropTypes from 'prop-types';
// CSS

class BDCustomizationSelections extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateBackgroundStyle({ id }) {
    return {
      background: `url(${IMGS[id]})`,
      backgroundSize: 'cover',
    };
  }

  generateCustomizationOptions() {
    return [
      {
        id: 'micro-mini',
        presentation: 'Micro-Mini',
        url: 'micro-mini.png',
      },
      {
        id: 'mini',
        presentation: 'Mini',
        url: 'mini.png',
      },
      {
        id: 'knee',
        presentation: 'Knee',
        url: 'knee.png',
      },
      {
        id: 'midi',
        presentation: 'Midi',
        url: 'midi.png',
      },
      {
        id: 'ankle',
        presentation: 'Ankle',
        url: 'ankle.png',
      },
      {
        id: 'maxi',
        presentation: 'Maxi',
        url: 'maxi.png',
      },
    ].map(selection => (

      <div className="u-display--inline-block" key={selection.id}>
        <div
          onClick={this.handleSelection(selection)}
          className={classnames([
            'BDCustomizationSelection',
            'col u-cursor--pointer u-height--full u-position--relative',
            {
              'BDCustomizationSelection--active': false,
            },
          ])}
        />
        <img src={IMGS[selection.id]} alt={selection.id} />
        <span
          className={classnames(
          'BDCustomizationSelection__touch-display-text',
          'u-width--full u-left',
        )}
        >
          <h6 className="BDCustomizationSelection__text">
            {selection.presentation}
          </h6>
        </span>
      </div>
      ));
  }

  handleSelection() {

  }
  render() {
    const options = this.generateCustomizationOptions();
    console.log('options', options);
    return (
      // eslint-disable-next-line
      <div className="BDCustomizationSelections u-white-space--nowrap u-text-align-left u-height--full u-overflow-x--scroll">
        {options}
      </div>
    );
  }
}

BDCustomizationSelections.propTypes = {
  // Passed Prop
  // productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   centsPrice: PropTypes.number,
  //   name: PropTypes.string,
  //   hexValue: PropTypes.string,
  //   patternUrl: PropTypes.string,
  // })).isRequired,
  // productSecondaryColorsCentsPrice: PropTypes.number.isRequired,
};

BDCustomizationSelections.defaultProps = {};


export default BDCustomizationSelections;
