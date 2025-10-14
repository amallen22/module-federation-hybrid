import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { COMMON_ROUTES } from './RoutesConfig';

const NoMatch = () => <div>404 Your resume is not available</div>;

export const RouteMounter = () => {
    const history = createBrowserHistory();
    return (
        <Routes>
            {COMMON_ROUTES.map(({ Component, path }) => {
                return <Route key={path} path={path} Component={() => <Component history={history} />} />;
            })}
            <Route Component={NoMatch} />
        </Routes>
    );
};
