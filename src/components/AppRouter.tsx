import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "../router";
import MainLayout from "../layouts/MainLayout/MainLayout";

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<MainLayout />}>
                    <Route path={'/*'} element={<Navigate to={'/'} />} />
                    {publicRoutes.map(route => (
                        <Route path={route.path}
                               element={<route.element />}
                               key={route.path} />
                    ))}
                </Route>
            </Routes>
        </>
    )
}
export default AppRouter;