import { useState } from "react";
import { Form } from "react-router-dom";
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
    };
    DataStorage.addLoginData(info);
  }

  return (
    <div>
      <Form
        onSubmit={handleUserRegister}
        action='/login'
        className='w-full h-full flex flex-col'>
        <label htmlFor='username'>
          Username:{" "}
          <input
            type='text'
            id='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
        </label>
        <label htmlFor='email'>
          Email:{" "}
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
        </label>
        <label htmlFor='password'>
          Password:{" "}
          <input
            type='text'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            pattern='.{5,}'
          />
        </label>
        <button>Register</button>
      </Form>
    </div>
  );
}
