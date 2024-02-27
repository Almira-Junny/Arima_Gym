import Header from "../components/landingpage/Header";
import Overview from "../components/landingpage/Overview";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/features/alertSlice";
import { logout } from "../redux/features/authSlice";
import { getTopPts } from "../api/user";
import { useLocation } from "react-router-dom";
import Plan from "../components/landingpage/Plan";
import Introduction from "../components/landingpage/Introduction";
import Review from "../components/landingpage/Review";
import PT from "../components/landingpage/PT";
import Footer from "../components/landingpage/Footer";
import LoadingPage from "./LoadingPage";
import { useQuery } from "react-query";
import { getTopPlans } from "../api/plan";

function useQueryURL() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function LandingPage() {
  const query = useQueryURL();
  const isPayment = query.get("isPayment");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  // const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data: plans, isLoading: isLoadingPlan } = useQuery(
    "top-plans",
    getTopPlans,
    {
      refetchOnWindowFocus: false,
      onError: (err) => {
        dispatch(
          showAlert({
            severity: "error",
            message: err.response.data.message,
          })
        );
      },
    }
  );

  const { data: pts, isLoading: isLoadingPt } = useQuery("top-pts", getTopPts, {
    refetchOnWindowFocus: false,
    onError: (err) => {
      dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
    },
  });

  const handleLogOut = async () => {
    setIsLoadingLogout(true);
    await dispatch(logout());
    setIsLoadingLogout(false);
    dispatch(
      showAlert({
        severity: "success",
        message: "Đăng xuất thành công",
      })
    );
  };

  // useEffect(() => {
  //   if (isPayment) {
  //     const changeInfo = async () => {
  //       setIsLoading(true);
  //       const res = await getUserById(userInfo._id);

  //       dispatch(changeUserInfo(res));

  //       setIsLoading(false);

  //       dispatch(
  //         showAlert({
  //           severity: "success",
  //           message: "Thanh toán thành công",
  //         })
  //       );
  //     };

  //     changeInfo().catch(console.error);
  //   }
  // }, []);

  useEffect(() => {
    if (isPayment) {
      const changeInfo = async () => {
        setIsLoading(true);
        await dispatch(logout());
        setIsLoading(false);
        dispatch(
          showAlert({
            severity: "success",
            message: "Mua gói tập thành công. Vui lòng đăng nhập lại",
          })
        );
      };

      changeInfo().catch(console.error);
    }
  }, []);

  return (
    <>
      {!isLoading && !isLoadingPlan && !isLoadingPt && !isLoadingLogout ? (
        <>
          <Header handleLogOut={handleLogOut} />
          <Overview />
          <Plan plans={plans} />
          <Introduction />
          <Review />
          <PT pts={pts} />
          <Footer />
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default LandingPage;
