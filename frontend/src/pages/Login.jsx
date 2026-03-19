import React, { useState } from 'react'
import auth from '../assets/auth.jpg'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Eye, EyeOff, Loader, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/authSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {loading} = useSelector(store => store.auth) 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      dispatch(setLoading(true))
      const res = await axios.post(
        `http://localhost:3001/api/v1/users/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        console.log("Login successful", res.data);
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message || "login successful");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || "Login failed");
    } finally{
      dispatch(setLoading(false))
    }

  }
  return (
    <div className='flex min-h-screen md:pt-14'>
      <div className='hidden md:block md:w-1/2'>
        <img src={auth} alt="Authentication" className='h-full w-full object-cover' />
      </div>
      <div className='flex justify-center items-center flex-1 px-4 md:px-8 md:w-1/2'>
        <Card className=' max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600'>
          <CardHeader>
            <CardTitle>
              <h1 className='text-center text-xl font-semibold'>Login to your account</h1>
            </CardTitle>
            <p className='mt-2 text-sm font-serif text-center dark:text-gray-300'>Enter your details below to login.</p>
          </CardHeader>
          <CardContent>
            <form className='space-y-4' onSubmit={handlesubmit}>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Email address" name="email" className="dark:border-gray-600 dark:bg-gray-900" value={input.email} onChange={handleChange}/>
              </div>
              <div className='relative'>
                <Label>Password</Label>
                <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" name="password" className="dark:border-gray-600 dark:bg-gray-900"  value={input.password} onChange={handleChange} />
                <button onClick={() => setShowPassword(!showPassword)} type='button' className='absolute right-3 top-8 text-gray-500'>
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full">{
                loading ? (<>
                <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                loading...
                </>) : ("Login")
}</Button>
              <p className='text-center text-gray-600 dark:text-gray-300'>Don't have an account? <Link to={'/signup'}><span className='underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100'>Sign Up</span></Link></p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
