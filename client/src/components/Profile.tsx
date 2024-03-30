import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {Alert, Button, TextInput} from "flowbite-react";
import React, {useEffect, useRef, useState} from "react";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {app} from "../firebase.ts";
import {CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const Profile = () => {
  const {currentUser} = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string>();
  const imagePickerRef = useRef<HTMLInputElement | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number>(0);
  const [imageUploadError, setImageUploadError] = useState<string>('');

  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files as FileList;
    if (files[0]) {
      setImage(files[0])
      setImageUrl(URL.createObjectURL(files[0]))
    }
  }

  useEffect(() => {
    if (image)
      uploadImage();
  }, [image]);

  const uploadImage = async () => {
    if (!image)
      return;
    setImageUploadError('')
    const storage = getStorage(app);
    const fileName = new Date().getTime() + (image.name);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        setImageUploadProgress(Math.ceil(progress));
      },
      (error) => {
        console.log(error);
        setImageUploadError("Couldn't upload image.");
        setImageUploadProgress(0);
        setImage(undefined);
        setImageUrl(undefined);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl(downloadUrl);
        })
      }
    )
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' accept='image/*' ref={imagePickerRef} hidden={true} onChange={handleImageChange}/>
        <div className='h-32 w-32 rounded-full relative self-center cursor-pointer shadow-md overflow-hidden'
             onClick={() => imagePickerRef.current?.click()}>
          {!!imageUploadProgress &&
            <CircularProgressbar value={imageUploadProgress || 0}
                                 text={`${imageUploadProgress}%`}
                                 strokeWidth={5}
                                 styles={{
                                   root: {
                                     width: '100%',
                                     height: '100%',
                                     position: 'absolute',
                                     top: 0,
                                     left: 0
                                   },
                                   path: {
                                     stroke: `rgba(62, 152, 199,${imageUploadProgress / 100})`
                                   }
                                 }}/>
          }
          <img src={imageUrl || currentUser.profilePicture} alt='user'
               className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>
        }
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='Password'/>
        <Button gradientDuoTone={"purpleToBlue"} outline={true}>
          Update
        </Button>
      </form>
    </div>
  )
};

export default Profile;