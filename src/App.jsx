import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EmailVerification from "./Components/HomeComponents/EmailVerification";
import NotificationPage from "./pages/NotificationPage";
import ChattingPage from "./pages/ChattingPage";
import SettingPage from "./pages/SettingPage";

// ======== router =======
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />}>
                <Route path="/chat" element={<ChattingPage />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/setting" element={<SettingPage />} />
            </Route>
            <Route path="/email-verification" element={<EmailVerification />} />
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
