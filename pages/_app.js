import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";
import TopNav from "../component/TopNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Edemy-APP!</title>
        <meta
          name="description"
          content="I hope this tutorial is helpful for you"
        />
      </Head>

      <AuthProvider>
        <ToastContainer position="top-center" />
        <TopNav />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
export default MyApp;
