import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// User info
import AuthContext from '../../context/authContext'

// Formik
import { useFormik } from 'formik'

// SweetAlert
import Swal from 'sweetalert2'

// Components
import FormIntroduction from '../../Components/Modules/FormIntroduction/FormIntroduction'


export default function SignUp() {


  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: { username: '', email: '', password: '' },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false)
      }, 3000)

      const newUserInfo = {
        username: values.username,
        email: values.email,
        password: values.password,
      }
      fetch(`https://chattak-alirh.koyeb.app/users/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo)
      })
        .then(res => {
          console.log(res);
          if (res.ok) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 800,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            }).then(() => {
              navigate('/chat')
            })
            return res.json()
          } else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "A user with this name has already registered! Please try again."
            })
          }
        }).then(result => {
          if (result) {
            authContext.login(result.access_token)
          }
        })
    },
    validate: (values) => {
      const errors = {}
      if (values.username === '') {
        errors.username = 'Username is required!'
      } else if (values.username.length < 4) {
        errors.username = 'Username must be at least 4 characters long!'
      }

      if (values.email === '') {
        errors.email = 'Email is required!'
      } else if (values.email.includes('@gmail.com') === false) {
        errors.email = 'Email must be in the format example@gmail.com'
      }

      if (values.password === '') {
        errors.password = 'Password is required!'
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long!'
      }
      return errors
    }
  })


  return (
    <>
      <div className=" flex justify-center items-center h-svh overflow-hidden bg-gray-950">
        <div className=" fixed top-5 left-5 z-50">
          <Link to={'/'}>
            <img src="/images/png/logo.png" alt="logo" className=' w-32' />
          </Link>
        </div>
        <div className=" h-full rounded-br-full p-10 text-white bg-gray-950 hidden lg:block w-1/2 shadow-2xl shadow-blue-950 z-10">
          <FormIntroduction title={`Looks like you're new here!`} text={'Join us in minutes! Sign up with your details to get started'} />
        </div>
        <div className=" flex justify-center items-center flex-col bg-gray-950 h-full w-full lg:w-1/2 rounded-tl-full shadow-2xl shadow-blue-950 z-10">
          <span className='flex justify-center items-center text-gray-50 text-3xl font-bold text-start w-full mb-4'>Sign up</span>
          <form class=" w-[22rem] flex justify-center items-center flex-col gap-5" onSubmit={form.handleSubmit}>
            <div class="w-full">
              <label for="username" className=' text-sm  font-medium text-white mb-1 block'>Username</label>
              <input type="text" id="username" value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} className={` ${form.errors.username && form.touched.username && 'outline-red-600 outline-1'} shadow-md shadow-blue-950 focus:shadow-sm duration-200 transition-all rounded p-2 outline-none w-full placeholder:text-sm`} placeholder="Enter your Username" required />
              {form.errors.username && form.touched.username && <span className=' text-red-600 text-xs'>{form.errors.username}</span>}
            </div>
            <div class="w-full">
              <label for="email" className=' text-sm  font-medium text-white mb-1 block'>Email</label>
              <input type="email" id="email" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} className={` ${form.errors.email && form.touched.email && 'outline-red-600 outline-1'} shadow-md shadow-blue-950 focus:shadow-sm duration-200 transition-all rounded p-2 outline-none w-full placeholder:text-sm`} placeholder="Enter your Email" required />
              {form.errors.email && form.touched.email && <span className=' text-red-600 text-xs'>{form.errors.email}</span>}
            </div>
            <div class="w-full">
              <label for="password" className=' text-sm  font-medium text-white mb-1 block'>Password</label>
              <input type="password" id="password" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} autoComplete='on' className={` ${form.errors.password && form.touched.password && 'outline-red-600 outline-1'} shadow-md shadow-blue-950 focus:shadow-sm duration-200 transition-all rounded p-2 outline-none w-full placeholder:text-sm`} placeholder="Enter your Password" required />
              {form.errors.password && form.touched.password && <span className=' text-red-600 text-xs'>{form.errors.password}</span>}
            </div>
            <button type="submit" disabled={form.isSubmitting} className=' mt-3 w-full p-2 rounded text-white shadow-md focus:shadow-sm duration-200 transition-all shadow-blue-950 bg-blue-800'>Submit</button>
            <span class=" text-center text-sm flex justify-center  text-white ">
              Already have an account?
              <Link to={'/login'}>
                <span class=" hover:text-blue-800 transition-colors ml-1 ">log in</span>
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  )
}
