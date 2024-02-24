import {Link, useNavigate} from "react-router-dom";
import React, {useReducer} from "react";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice.ts";
import {RootState} from "../store.ts";
import OAuth from "../components/OAuth.tsx";

enum FormActionType {
  UPDATE_FIELD = "UPDATE_FIELD",
}

interface FormAction {
  type: FormActionType;
  field: string;
  value: string;
}

interface FormState {
  formData: {
    email: string;
    password: string;
  }
}

const reducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case FormActionType.UPDATE_FIELD:
      return {...state, formData: {...state.formData, [action.field]: action.value.trim()}};
    default:
      return state;
  }
}

const SignIn: React.FC = () => {

  const initialState = {
    formData: {
      email: "",
      password: "",
    }
  }

  const dispatch = useDispatch();
  const {loading, error: errorMessage} = useSelector((state: RootState) => state.user)
  const navigate = useNavigate();
  const [state, formDispatch] = useReducer(reducer, initialState)
  const {formData} = state;

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {id, value} = e.currentTarget;
    formDispatch({type: FormActionType.UPDATE_FIELD, field: id, value: value})
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are required.'))
    }

    dispatch(signInStart())

    await axios.post('/api/auth/signin', state.formData)
      .then((data) => {
        dispatch(signInSuccess(data.data))
        navigate('/')
      })
      .catch((error) => {
        dispatch(signInFailure(error.response.data.message))
      })
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to={'/'} className='  text-4xl font-bold dark:text-white'>
            <span
              className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Baymax's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-2'>
            Welcome to Baymax's Blog – where inspiration meets community. Join us for a journey of discovery,
            positivity,
            and genuine connections. Sign up now and be part of our uplifting community!
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
            <div>
              <Label value='Email' htmlFor='email'/>
              <TextInput type='email' placeholder='user@email.com' id='email' onChange={handleInputChange}/>
            </div>
            <div>
              <Label value='Password' htmlFor='password'/>
              <TextInput type='password' placeholder='Password' id='password' onChange={handleInputChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </> : 'Sign In'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an Account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn;