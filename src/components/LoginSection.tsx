"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LoginSection = () => {
  // Entry animation keyframes
  // Add fade-in-up animation for entry
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  // Spinner CSS
  const spinnerStyle: React.CSSProperties = {
    display: "inline-block",
    width: "1.5em",
    height: "1.5em",
    border: "3px solid #64ffda",
    borderTop: "3px solid #10101a",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    verticalAlign: "middle",
    marginRight: "0.5em",
  };

  // Add keyframes for spinner
  if (typeof window !== "undefined") {
    const styleId = "login-spinner-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
      document.head.appendChild(style);
    }
  }

  return (
    <section
      id="login"
      ref={null}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "6rem",
        marginBottom: "6rem",
        overflow: "hidden",
      }}
    >
      <div
        className="fade-in-up"
        style={{
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto",
          padding: "3rem 2rem",
          borderRadius: "1rem",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(10, 10, 15, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px 0 rgba(100,255,218,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: 0,
          animation: 'fade-in-up 0.8s cubic-bezier(.77,0,.18,1) forwards',
          animationDelay: '0.2s',
        }}
      >
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          /* fallback for SSR, but we use inline style for animation above */
        }
      `}</style>
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: 200,
            color: "#64ffda",
            marginBottom: "2rem",
            textAlign: "center",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textShadow: "0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda",
          }}
        >
          Login
        </h2>
        <form
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "2rem" }}
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "1rem 1.5rem",
              borderRadius: "0.75rem",
              background: "#10101a",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              outline: "none",
              fontSize: "1.1rem",
              transition: "border 0.2s",
              marginBottom: "0.5rem",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "1rem 1.5rem",
              borderRadius: "0.75rem",
              background: "#10101a",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              outline: "none",
              fontSize: "1.1rem",
              transition: "border 0.2s",
              marginBottom: "0.5rem",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              position: "relative",
              fontSize: "1.1rem",
              fontWeight: 300,
              color: "#fff",
              background: "transparent",
              border: "1px solid #64ffda",
              borderRadius: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "1rem 2rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "border 0.3s, background 0.3s, transform 0.2s",
              overflow: "hidden",
              boxShadow: "0 0 0 rgba(100,255,218,0)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px #64ffda55";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 rgba(100,255,218,0)";
            }}
          >
            {loading || success ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={spinnerStyle}></span>
                {loading ? "Logging in..." : "Success!"}
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {error && (
          <p style={{ color: "#ff6b6b", marginTop: "1.5rem", textAlign: "center" }}>{error}</p>
        )}
        {success && (
          <p style={{ color: "#64ffda", marginTop: "1.5rem", textAlign: "center" }}>Login successful!</p>
        )}
      </div>
    </section>
  );
};

export default LoginSection;
