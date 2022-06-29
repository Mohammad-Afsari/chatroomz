import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../../services/auth";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Get email and password input values
    // const email = emailRef.current.value;
    // const password = passwordRef.current.value;

    // Calls `signIn` function from the context
    await signIn({ email, password });
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Chatroomz</h1>
        <p className="description">Login</p>
        {loading ? (
          "Logging in..."
        ) : (
          <>
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                value={password}
                // type="password"
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button className="button block" aria-live="polite">
                Login
              </button>
            </form>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
