import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeWizardPreparation = ({ preparation, onChange }) => {
  return (
    <Fragment>
      <h6>
        ...e infine, i dettagli della <strong>preparazione</strong>.
      </h6>
      <div className='input-field'>
        <textarea
          name='preparation'
          value={preparation}
          onChange={onChange}
          style={{ height: '55vh' }}
        />
      </div>
    </Fragment>
  );
};

RecipeWizardPreparation.propTypes = {
  preparation: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RecipeWizardPreparation;
