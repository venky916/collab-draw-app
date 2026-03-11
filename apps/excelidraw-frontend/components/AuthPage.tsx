"use client";

const AuthPage = ({ isSignIn }: { isSignIn: boolean }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="m-2  bg-black/10 rounded-2xl flex flex-col justify-center items-center gap-4 p-4">
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="password" />
        <button onClick={() => {}}>{isSignIn ? "Sign In" : "Sign Up"}</button>
      </div>
    </div>
  );
};

export default AuthPage;
