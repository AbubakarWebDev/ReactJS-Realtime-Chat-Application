import React from 'react';

function FormLayout(Component, options) {

    const { title, footer } = options;

    return function WithFormLayout(props) {
        return (
            <div className='form-container'>
                <div className="form">
                    <h3 className="mb-3 mt-1"> {title} </h3>

                    <Component {...props} />

                    {footer && <p className="mt-3 mb-1"> {footer} </p>}
                </div>
            </div>
        );
    }
}

export default FormLayout;