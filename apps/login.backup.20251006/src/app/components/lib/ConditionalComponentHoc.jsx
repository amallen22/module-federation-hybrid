import React from 'react';

export const ConditionalComponentHoc = (displayACondition, ComponentA, propsA, ComponentB, propsB) => {

    return class extends React.Component {

        constructor () {

            super();

        }

        render () {

            if (displayACondition) {
                return <ComponentA {...propsA} {...this.props}/>;
            }
            return <ComponentB {...propsB} {...this.props}/>;

        }
    };

};
