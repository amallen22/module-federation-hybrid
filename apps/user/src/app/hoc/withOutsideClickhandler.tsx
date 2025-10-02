import React from 'react';

interface Props {}

export const withOutsideClickHandler = (ComponentToRender: any) => {
    return class extends React.Component<Props> {
        node: string | undefined;
        callback: Function | undefined;

        constructor(props: Props) {
            super(props);
        }

        componentWillUnmount() {
            this.stopListenOutsideClicks();
        }

        startListenOutsideClicks = (params: { callback: Function }) => {
            if (!params) {
                return;
            }

            const { callback } = params;

            this.callback = callback;
            document.addEventListener('click', this.handleOutsideClick, false);
        };

        stopListenOutsideClicks = () => {
            document.removeEventListener('click', this.handleOutsideClick, false);
        };

        handleOutsideClick = () => {
            if (!this.callback) {
                return;
            }

            this.callback();
        };

        render() {
            if (!ComponentToRender) {
                return null;
            }

            return (
                <ComponentToRender
                    {...this.props}
                    startListenOutsideClicks={this.startListenOutsideClicks}
                    stopListenOutsideClicks={this.stopListenOutsideClicks}
                />
            );
        }
    };
};
