import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/authContext'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'

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
    // validate: (values) => {
    //   const errors = {}
    //   if (values.username === '') {
    //     errors.username = 'Username is required!'
    //   } else if (values.username.length < 4) {
    //     errors.username = 'Username must be at least 4 characters long!'
    //   }

    //   if (values.password === '') {
    //     errors.password = 'Password is required!'
    //   } else if (values.password.length < 8) {
    //     errors.password = 'Password must be at least 8 characters long!'
    //   }
    //   return errors
    // }
  })


  return (
    <>
      <h1>SignUp</h1>
      <form class="max-w-sm mx-auto" onSubmit={form.handleSubmit}>
        <div class="mb-5">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
          <input type="text" id="username" value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <button type="submit" disabled={form.isSubmitting} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>

    </>
  )
}
