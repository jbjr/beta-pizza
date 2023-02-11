import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PromptCheckEmailPage from "./pages/PromptCheckEmailPage";
import ConfirmAccountPage from "./pages/ConfirmAccountPage";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import PrivateUserRoute from "./comp/PrivateUserRoute";
import MyChart from "./comp/charts/MyChart";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentConfirmedPage from "./pages/PaymentConfirmedPage";
import FunctionTests from "./unused/FunctionTests";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateUserRoute/>}>
            <Route exact path={'/main/:id'} element={<MainPage/>}/>
            <Route exact path={'/cart-page/:id'} element={<CartPage/>}/>
          </Route>
          <Route exact path={'/'} element={<LoginPage/>}/>
          <Route exact path={'*'} element={<LoginPage/>}/>
          <Route exact path={'/test'} element={<FunctionTests/>}/>
          <Route exact path={'/checkout-page'} element={<CheckoutPage/>}/>
          <Route exact path={'/payment-confirmed'} element={<PaymentConfirmedPage/>}/>
          <Route exact path={'/chart'} element={<MyChart/>}/>
          <Route exact path={'/signup'} element={<SignupPage/>}/>
          <Route exact path={'/prompt-check-email'} element={<PromptCheckEmailPage/>}/>
          <Route exact path={'/confirm-account'} element={<ConfirmAccountPage/>}/>
          <Route exact path={'/admin-page'} element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
