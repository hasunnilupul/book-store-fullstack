import { Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import ViewBook from "../pages/ViewBook";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books/:id' element={<ViewBook/>} />
        </Routes>
    )
}

export default AppRoutes;