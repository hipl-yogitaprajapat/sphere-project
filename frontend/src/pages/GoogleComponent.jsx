import { useGoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { googleAuth } from '../redux/slice/authSlice';
import { handleError, handleSuccess } from '../utils/Error';


const GoogleComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const responseGoogle = async(authResult) => {
    try {
      if (authResult["code"]) {
        const response = await dispatch(googleAuth(authResult["code"])).unwrap();
        const role = localStorage.getItem("role");
        handleSuccess(response.message || "Logged in successfully");
         setTimeout(() => {
          if(role === "admin"){
          navigate("/admin")
          }else if(role === "developer"){
          navigate("/developer")
          }else if(role === "designer"){
          navigate("/designer")
          }else if(role === "tester"){
          navigate("/tester")
          }else{
            navigate("/client")
          }
      }, 1000);
      }
    } catch (error) {
      handleError(error.message || "Google Login failed");
    }
  };

    const login = useGoogleLogin({
        flow:"auth-code",
        onSuccess:responseGoogle,
        onError:responseGoogle,
    })
  return (
  <>
  <Link onClick={login}>
    <img src="../assets/images/authentication/google.svg" alt="img" />
    <span className="d-none d-sm-inline-block"> Google</span>
  </Link>
  </>
  )
}

export default GoogleComponent