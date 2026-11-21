import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthPage({ mode }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (mode === "register" && form.name.trim().length < 2) return setError("Name must be at least 2 characters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Enter a valid email");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    try {
      if (mode === "register") await register(form.name, form.email, form.password);
      else await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || err.response?.data?.message || "Request failed");
    }
  }

  return (
    <main className="auth-shell">
      <section className="brand-panel">
        <div className="brand-mark">EM</div>
        <div><p className="eyebrow">WORKFORCE SYSTEM</p><h1>Employee<br />Management</h1></div>
      </section>
      <section className="auth-card">
        <p className="eyebrow">{mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}</p>
        <h2>{mode === "login" ? "Sign in" : "Register"}</h2>
        <form onSubmit={submit}>
          {mode === "register" && <label>Full name<input name="name" value={form.name} onChange={update} placeholder="Alex Morgan" required /></label>}
          <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="alex@company.com" required /></label>
          <label>Password<input name="password" type="password" value={form.password} onChange={update} placeholder="Minimum 6 characters" required /></label>
          {error && <p className="error">{error}</p>}
          <button className="primary" type="submit">{mode === "login" ? "Sign in" : "Create account"}</button>
        </form>
        <p className="switch">
          {mode === "login" ? "New to the system? " : "Already registered? "}
          <Link to={mode === "login" ? "/register" : "/login"}>{mode === "login" ? "Create account" : "Sign in"}</Link>
        </p>
      </section>
    </main>
  );
}
