import { useState } from "react";
import { signIn, signUp } from "../../services/authentication";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signIn({ email, password });
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    try {
      setLoading(true);
      signUp({ email, password });
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <button className="button block" aria-live="polite">
                Login
              </button>
            </form>
            <button
              className="button block"
              aria-live="polite"
              onClick={handleSignUp}
            >
              Sign ups
            </button>
          </>
        )}
      </div>
    </div>
  );
}
