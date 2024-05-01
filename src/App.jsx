import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

// ======== router =======
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route >
            <Route path="/" element={<RegistrationPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<h1>Error page</h1>} />
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
}

export default App;
