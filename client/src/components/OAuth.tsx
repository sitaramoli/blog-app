import {Button} from "flowbite-react";
import {AiFillGoogleCircle} from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth";
import {app} from "../firebase.ts";
import axios from "axios";
import {useDispatch} from "react-redux";
import {signInSuccess} from "../redux/user/userSlice.ts";
import {useNavigate} from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: "select_account"})
    try {
      const result = await signInWithPopup(auth, provider);
      await axios.post('/api/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        photoUrl: result.user.photoURL
      }).then((data) => {
        dispatch(signInSuccess(data.data));
        navigate('/');
      }).catch((error) => {
        console.log(error)
      });
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline={true} onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      Continue with Google
    </Button>
  )
}

export default OAuth;