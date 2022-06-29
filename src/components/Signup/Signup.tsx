import * as React from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../services/auth";

const Signup = () => {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signUp` function from the context
    await signUp({ email, password });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email</label>
        <input id="input-email" type="email" ref={emailRef} />

        <label htmlFor="input-password">Password</label>
        <input id="input-password" type="password" ref={passwordRef} />

        <br />

        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
};

export default Signup;
