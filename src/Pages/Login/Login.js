import React, { useContext } from 'react'
import AuthContext from '../../context/authContext'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import FormIntroduction from '../../Components/Modules/FormIntroduction/FormIntroduction'

export default function Login() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const form = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false)
            }, 3000)

            const userData = {
                username: values.username,
                password: values.password,
            }
            fetch(`https://chattak-alirh.koyeb.app/users/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
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
                            title: "logged in successfully"
                        }).then(() => {
                            navigate('/chat')
                        })
                        return res.json()
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "User not found!",
                            text: "There is no user with this username! Please try again."
                        })
                    }
                }).then(result => {
                    if (result) {
                        authContext.login(result.access_token)
                    }
                })
        },
    })
    return (
        <>
            <div className=" flex justify-center items-center h-svh overflow-hidden bg-gray-950">
                <div className=" fixed top-5 left-5 z-50">
                    <Link to={'/'}>
                        <img src="/images/png/logo.png" alt="logo" className=' w-32' />
                    </Link>
                </div>
                <div className=" relative h-full rounded-br-full p-10 text-white bg-gray-950 hidden lg:block w-1/2 shadow-2xl shadow-blue-950 z-10">
                    <FormIntroduction title={`Welcome back!`} text={'We are glad to see you again! please sign in to your account.'} />
                </div>
                <div className=" flex justify-center items-center flex-col bg-gray-950 h-full w-full lg:w-1/2 rounded-tl-full shadow-2xl shadow-blue-950 z-10">
                    <span className=' flex justify-center items-center text-gray-50 text-3xl font-bold mb-4'>Log in</span>
                    <form class=" w-[22rem] flex justify-center items-center flex-col gap-5" onSubmit={form.handleSubmit}>
                        <div class=" w-full">
                            <label for="username" className=' text-sm  font-medium text-white mb-1 block'>Username</label>
                            <input type="text" id="username" value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} className=' shadow-md shadow-blue-950 focus:shadow-sm duration-200 transition-all rounded p-2 outline-none w-full placeholder:text-sm' placeholder="Enter your Username" required />
                        </div>
                        <div class=" w-full">
                            <label for="password" className=' text-sm  font-medium text-white mb-1 block'>Password</label>
                            <input type="password" id="password" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} autoComplete='on' className=' shadow-md shadow-blue-950 focus:shadow-sm duration-200 transition-all rounded p-2 outline-none w-full placeholder:text-sm' placeholder="Enter your Password" required />
                        </div>
                        <button type="submit" disabled={form.isSubmitting} className=' mt-3 w-full p-2 rounded text-white shadow-md focus:shadow-sm duration-200 transition-all shadow-blue-950 bg-blue-800'>Submit</button>
                        <span class=" text-center text-sm flex justify-center  text-white ">
                            Don't have an account?
                            <Link to={'/sign-up'}>
                                <span class=" hover:text-blue-800 transition-colors ml-1 ">Sign up</span>
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
        </>
    )
}
