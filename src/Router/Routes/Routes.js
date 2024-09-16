import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import PostProduct from "../../Pages/OldProduct/PostProduct";
import Orders from "../../Pages/Orders/Orders";
import AboutPage from "../../Pages/Shared/About/AboutPage";
import AccountDelete from "../../Pages/Shared/DeleteAccount/AccountDelete";

import GlobalError from "../../Pages/Shared/ErrorPage/GlobalError";
import ServicePage from "../../Pages/Shared/service/ServicePage";
import SignUp from "../../Pages/SignUp/SignUp";
import ChnagePasswod from "../../Reuseable/ChnagePasswod";
import Profile from "../../Reuseable/Profile";
import ResetPassword from "../../Reuseable/ResetPassword";
import HavingTrouble from "../../componenta/AI/HavingTrouble";
import AddToCard from "../../componenta/AddToCard/AddToCard";
import AddToCardOldProductList from "../../componenta/Dashboard/AddToCardOldProductList";
import AddToProduct from "../../componenta/Dashboard/AddToProduct";
import AllAddToCard from "../../componenta/Dashboard/AllAddToCard";
import AllCategorie from "../../componenta/Dashboard/AllCategorie";
import AllFavoriteProduct from "../../componenta/Dashboard/AllFavoriteProduct";
import AllOldProduct from "../../componenta/Dashboard/AllOldProduct";
import AllOldProductPaymentList from "../../componenta/Dashboard/AllOldProductPaymentList";
import AllProductList from "../../componenta/Dashboard/AllProductList";
import AllUsers from "../../componenta/Dashboard/AllUsers";
import Createcategorie from "../../componenta/Dashboard/Createcategorie";
import Dashboard from "../../componenta/Dashboard/Dashboard";
import NewProductPaymentList from "../../componenta/Dashboard/NewProductPaymentList";
import ServiceConfirmation from "../../componenta/Dashboard/ServiceConfirmation";
import ServicePaymentList from "../../componenta/Dashboard/ServicePaymentList";
import UpdateProductInfo from "../../componenta/Dashboard/UpdateProductInfo";
import MyFavoriteProduct from "../../componenta/FavoriteProduct/MyFavoriteProduct";
import UpdateCategorie from "../../componenta/Modal/UpdateCategorie";
import MoreDetails from "../../componenta/MoreDetails/MoreDetails";
import MoreServices from "../../componenta/MoreServices/MoreServices";
import NewProductDashboard from "../../componenta/NewProductDashboard/NewProductDashboard";
import ProductComponent from "../../componenta/NewProductDashboard/ProductPage/ProductComponent";
import ProductHomePage from "../../componenta/NewProductDashboard/ProductPage/ProductHomePage";
import MyPost from "../../componenta/OldProductDashboard/MyPost/MyPost";
import OldProductDashboard from "../../componenta/OldProductDashboard/OldProductDashboard";
import AddToCardOldProject from "../../componenta/OldProductDashboard/ProductPage/AddToCardOldProject";
import AllOldProducts from "../../componenta/OldProductDashboard/ProductPage/AllOldProducts";
import OldProductComponents from "../../componenta/OldProductDashboard/ProductPage/OldProductComponents";
import OldVehicleCar from "../../componenta/OldProductDashboard/ProductPage/OldVehicleCar";
import PaymentFailed from "../../componenta/Payment/PaymentFailed";
import PaymentSuccess from "../../componenta/Payment/PaymentSuccess";
import PaymentLaser from "../../componenta/PaymentLaser/PaymentLaser";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <GlobalError />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/reset_password",
        element: <ResetPassword />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/service",
        element: <ServicePage />,
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://car-doctors-server-sigma.vercel.app/api/v1/services/${params.id}`
          ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/delete_account",
        element: (
          <PrivateRoute>
            <AccountDelete />
          </PrivateRoute>
        ),
      },

      {
        path: "/more_details/:id",
        element: (
          <PrivateRoute>
            <MoreDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/having_trouble",
        element: (
          <PrivateRoute>
            <HavingTrouble />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/more-services",
        element: (
          <PrivateRoute>
            <MoreServices />
          </PrivateRoute>
        ),
      },
      {
        path: "/add_to_card",
        element: (
          <PrivateRoute>
            <AddToCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/add_to_card/oldProduct",
        element: (
          <PrivateRoute>
            <AddToCardOldProject />
          </PrivateRoute>
        ),
      },
      {
        path: "/my_favorite",
        element: (
          <PrivateRoute>
            <MyFavoriteProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/fail/:tranId",
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/success/:tranId",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/new_products",
    element: (
      <PrivateRoute>
        <NewProductDashboard />
      </PrivateRoute>
    ),
    errorElement: <GlobalError />,
    children: [
      {
        path: "/new_products",
        element: <ProductHomePage />,
      },
      {
        path: "/new_products/car/:categorie/:subcaregorie",
        element: <ProductComponent />,
      },
      {
        path: "/new_products/chnage_password",
        element: (
          <PrivateRoute>
            <ChnagePasswod />
          </PrivateRoute>
        ),
      },
      {
        path: "/new_products/my_payment_laser",
        element: (
          <PrivateRoute>
            <PaymentLaser />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/old_products",
    element: (
      <PrivateRoute>
        <OldProductDashboard />
      </PrivateRoute>
    ),
    errorElement: <GlobalError />,
    children: [
      {
        path: "/old_products",
        element: (
          <PrivateRoute>
            <AllOldProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/old_products/car/:categorie/:subcaregorie",
        element: <OldProductComponents />,
      },

      {
        path: "/old_products/my_post",
        element: (
          <PrivateRoute>
            <MyPost />
          </PrivateRoute>
        ),
      },
      {
        path: "/old_products/post_product",
        element: (
          <PrivateRoute>
            <PostProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/old_products/car",
        element: <OldVehicleCar />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/service_confirmation",
        element: (
          <PrivateRoute>
            <ServiceConfirmation />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/create_categorie",
        element: (
          <PrivateRoute>
            <Createcategorie />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_categorie",
        element: (
          <PrivateRoute>
            <AllCategorie />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addtoproduct/:id",
        element: (
          <PrivateRoute>
            <AddToProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update_product_categorie/:id",
        element: (
          <PrivateRoute>
            <UpdateCategorie />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_product_list",
        element: (
          <PrivateRoute>
            <AllProductList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_selling_product",
        element: (
          <PrivateRoute>
            <AllOldProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update_product_information/:id",
        element: (
          <PrivateRoute>
            <UpdateProductInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_addtocard_product",
        element: (
          <PrivateRoute>
            <AllAddToCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_favorite_product",
        element: (
          <PrivateRoute>
            <AllFavoriteProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all_old_product_list",
        element: (
          <PrivateRoute>
            <AddToCardOldProductList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/service_transaction",
        element: (
          <PrivateRoute>
            <ServicePaymentList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/new_product_paymentlist",
        element: (
          <PrivateRoute>
            <NewProductPaymentList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/old_product_paymentlist",
        element: (
          <PrivateRoute>
            <AllOldProductPaymentList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
