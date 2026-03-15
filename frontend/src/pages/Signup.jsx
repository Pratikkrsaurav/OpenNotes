import React, { useState } from "react";
import auth from "../assets/auth.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3001/api/v1/users/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.status === 201) {
        toast.success(res.data.message || "Registered successfully");
        navigate("/login");
        return;
      }
      toast.error(res.data.message || "Registration failed");
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  

  return (
    <div className="flex min-h-screen md:pt-14">
      <div className="hidden md:block md:w-1/2">
        <img
          src={auth}
          alt="Authentication"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center flex-1 px-4 md:px-8 md:w-1/2">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                {" "}
                Create an Account{" "}
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to create your account{" "}
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="dark:border-gray-600 dark:bg-gray-900"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label>Username</Label>
                <Input
                  type="text"
                  placeholder="Username"
                  name="userName"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.userName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="youremail@example.com"
                  name="email"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="create a password"
                  name="password"
                  className="dark:border-gray-600 dark:bg-gray-900"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-3 top-6 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Sign In
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
