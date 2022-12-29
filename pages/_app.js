import TopNav from "../component/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-center" />
        <TopNav />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
export default MyApp;
