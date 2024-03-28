import { useState } from "react";
import { Form, Link } from "react-router-dom";
import { Info } from "../../types/user";
import { DataStorage } from "../../ultils/DataStorage";
import { HashContent } from "../../ultils/hashlib";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleUserRegister(): Promise<void> {
    const info: Info = {
      id: await HashContent(email),
      name: name,
      email: email,
      password: password,
      userData: [],
      isAuthenticated: true,
    };
    DataStorage.addLoginData(info);
  }

  return (
    <div className='m-auto w-[min(500px,100vw)] h-[100vh] flex flex-col justify-center items-center'>
      <Form
        onSubmit={handleUserRegister}
        action='/login'
        className='flex flex-col gap-[2vmax]'>
        <label htmlFor='username'>
          Username: <br />
          <input
            className='login-input-button'
            type='text'
            id='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
        </label>
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
            type='text'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            pattern='.{5,}'
          />
        </label>
        <button className='text-[1.5em]'>Register</button>
      </Form>
      <div className='w-[min(400px,100vw)] mt-5'>
        <h2>
          Account already registered?{" "}
          <Link
            className='text-white text-[1.2em]'
            to='/login'>
            Sign In
          </Link>
        </h2>
      </div>
    </div>
  );
}
