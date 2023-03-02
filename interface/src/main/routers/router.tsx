import { Home } from 'presentation';
import { Routes, Route } from 'react-router-dom';
// import { RoutePath } from './types/routes';

export const Router = () => {
    return (
      <Routes>
        <Route path={/*RoutePath.HOME*/""} element={<Home />} />
      </Routes>
    );
}
