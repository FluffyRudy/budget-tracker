import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { useState } from "react";
import { Authetication } from "./helper";
import { UserState } from "../../states/User";
import { LoginInfo } from "../../types/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessgae] = useState("");
  const userState = UserState();
  const navigate = useNavigate();

  return (
    <div>
      <Form
        onSubmit={async () => {
          const info: LoginInfo = { email, password };
          const isLoggedIn = await Authetication.isUserLoggedIn(info);
          if (isLoggedIn) {
            userState.setAuthentication(true);
            navigate("/");
          } else {
            setErrorMessgae("Couldnt find user");
          }
        }}
        className='w-full h-full flex flex-col'>
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
        <button>Login</button>
      </Form>
      <div>
        <h2>Account not registered ?</h2>
        <Link to='/register'>Sign Up</Link>
      </div>
      {errorMessage.length > 0 ? <h1>{errorMessage}</h1> : null}
    </div>
  );
}
