import { useCallback } from "react";

function Login() {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("username"), data.get("password"));
  }, []);

  return (
    <div>
      <h1 className="mb-16">Meteorites data Visualizations</h1>
      <div className="flex justify-center">
        <form
          className="flex min-w-[600px] flex-col items-center"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            minLength={8}
            className="mb-4 block w-full max-w-[300px] rounded border-2 border-solid border-gray-400 p-2"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={8}
            className="mb-4 block w-full max-w-[300px] rounded border-2 border-solid border-gray-400 p-2"
          />
          <button
            type="submit"
            className="rounded border border-solid border-gray-800 bg-gray-800 px-9 py-2 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
