import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PromptCheckEmail from "./pages/PromptCheckEmail";
import ConfirmAccount from "./pages/ConfirmAccount";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import PrivateUserRoute from "./comp/PrivateUserRoute";
import MyChart from "./comp/MyChart";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateUserRoute/>}>
            <Route exact path={'/main/:id'} element={<MainPage/>}/>
            <Route exact path={'/cart-page/:id'} element={<CartPage/>}/>
          </Route>
          <Route exact path={'/'} element={<Login/>}/>
          <Route exact path={'*'} element={<Login/>}/>
          <Route exact path={'/checkout-page'} element={<CheckoutPage/>}/>
          <Route exact path={'/chart'} element={<MyChart/>}/>
          <Route exact path={'/signup'} element={<Signup/>}/>
          <Route exact path={'/prompt-check-email'} element={<PromptCheckEmail/>}/>
          <Route exact path={'/confirm-account'} element={<ConfirmAccount/>}/>
          <Route exact path={'/admin-page'} element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
