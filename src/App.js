import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import PrivateRoute from "./comp/PrivateRoute";
import Login from "./pages/Login";
import FirstPrivate from "./unused/FirstPrivate";
import Signup from "./pages/Signup";
import PromptCheckEmail from "./pages/PromptCheckEmail";
import ConfirmAccount from "./pages/ConfirmAccount";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={'/'} element={<Login/>}/>
          <Route exact path={'/auth/:id'} element={<PrivateRoute/>}/>
          <Route exact path={'/first-private'} element={<FirstPrivate/>}/>
          <Route exact path={'/signup'} element={<Signup/>}/>
          <Route exact path={'/prompt-check-email'} element={<PromptCheckEmail/>}/>
          <Route exact path={'/confirm-account'} element={<ConfirmAccount/>}/>
          <Route exact path={'/main'} element={<MainPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
