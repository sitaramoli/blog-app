import {Link, useNavigate} from "react-router-dom";
import React, {useReducer, useState} from "react";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react";
import axios from "axios";
import OAuth from "../components/OAuth.tsx";

enum FormActionType {
  UPDATE_FIELD = "UPDATE_FIELD",
  UPDATE_ERROR = "UPDATE_ERROR",
}

interface FormAction {
  type: FormActionType;
  field: string;
  value: string;
}

interface FormState {
  formData: {
    username: string;
    email: string;
    password: string;
  },
  errorMessage: string,
}

const reducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case FormActionType.UPDATE_FIELD:
      return {...state, formData: {...state.formData, [action.field]: action.value.trim()}};
    case FormActionType.UPDATE_ERROR:
      return {...state, errorMessage: action.value}
    default:
      return state;
  }
}

const SignUp: React.FC = () => {

  const initialState = {
    formData: {
      username: "",
      email: "",
      password: "",
    },
    errorMessage: "",
  }

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState<boolean>(false);
  const {formData, errorMessage} = state;

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {id, value} = e.currentTarget;
    dispatch({type: FormActionType.UPDATE_FIELD, field: id, value: value})
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password)
      return dispatch({type: FormActionType.UPDATE_ERROR, field: 'error', value: 'All fields are required.'});

    setLoading(true);
    dispatch({type: FormActionType.UPDATE_ERROR, field: 'error', value: ''});

    await axios.post('/api/auth/signup', state.formData)
      .then(() => {
        navigate('/home')
      })
      .catch((error) => {
        dispatch({type: FormActionType.UPDATE_ERROR, field: 'error', value: error.response.data.message});
      }).finally(() => {
        setLoading(false);
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
              <Label value='Username' htmlFor='username'/>
              <TextInput type='text' placeholder='Username' id='username' onChange={handleInputChange}/>
            </div>
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
                </> : 'Sign Up'
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an Account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
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

export default SignUp;