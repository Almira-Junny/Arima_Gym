import Header from "../components/landingpage/Header";
import Overview from "../components/landingpage/Overview";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { changeUserInfo } from "../redux/features/authSlice";
import { getUserById } from "../api/user";
import { useLocation } from "react-router-dom";
import Plan from "../components/landingpage/Plan";
import Introduction from "../components/landingpage/Introduction";
import Review from "../components/landingpage/Review";
import PT from "../components/landingpage/PT";
import Footer from "../components/landingpage/Footer";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function LandingPage() {
  const query = useQuery();
  const isPayment = query.get("isPayment");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPayment) {
      const changeInfo = async () => {
        const res = await getUserById(userInfo._id);

        dispatch(changeUserInfo(res));

        dispatch(
          showAlert({
            severity: "success",
            message: "Thanh toán thành công",
          })
        );
      };

      changeInfo();
    }
  }, []);

  return (
    <>
      <Header />
      <Overview />
      <Plan />
      <Introduction />
      <Review />
      <PT />
      <Footer />
    </>
  );
}

export default LandingPage;
