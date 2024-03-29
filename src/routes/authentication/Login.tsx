import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { Authetication } from "./helper";
import { UserState } from "../../states/User";
import { LoginInfo } from "../../types/user";
import { DataStorage } from "../../ultils/DataStorage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessgae] = useState("");
  const userState = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.isAuthenticated) navigate("/");
  }, [userState.isAuthenticated]);

  return (
    <div className='m-auto w-[min(500px,100vw)] h-[100vh] flex flex-col justify-center  items-center'>
      <h1>Login</h1>
      <Form
        onSubmit={async () => {
          const info: LoginInfo = { email, password };
          const user = await DataStorage.getUserData(info);
          const isLoggedIn = await Authetication.isUserLoggedIn(info);
          if (isLoggedIn && user && password === user.password) {
            userState.setAuthentication(true);
            userState.set(user);
            DataStorage.setCurrentUser(user);
            navigate("/");
          } else {
            setErrorMessgae("Couldnt find user");
          }
        }}
        className='flex flex-col gap-[2vmax]'>
        <label htmlFor='email'>
          Email: <br />
          <input
            className='login-input-button'
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </label>
        <label htmlFor='password'>
          Password: <br />
          <input
            className='login-input-button'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            pattern='.{5,}'
          />
        </label>
        <button className='block m-auto login-input-button font-extrabold text-[1.5em]'>
          Login
        </button>
      </Form>
      <div className='w-[min(400px,100vw)] mt-5'>
        <h2>
          Account not registered ?{" "}
          <Link
            to='/register'
            className='font-bold text-white'>
            Sign Up
          </Link>
        </h2>
      </div>
      {errorMessage.length > 0 ? (
        <p className='text-red-500'>{errorMessage}</p>
      ) : null}
    </div>
  );
}
