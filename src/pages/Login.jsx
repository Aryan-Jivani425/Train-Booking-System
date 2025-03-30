

function Login() {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form className="login-form">
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login