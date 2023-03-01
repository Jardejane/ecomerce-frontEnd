import { Routes, Route } from 'react-router-dom';
import { RoutePath } from './types/routes';

const Router = () => {
    return (
        <Routes>
            <Route path={RoutePath.Home} />
        </Routes>
    );
}

export default Router;