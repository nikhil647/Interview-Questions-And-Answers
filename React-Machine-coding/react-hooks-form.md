```
import React from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("errors --> ", errors);

  const onSubmit = async (data: any) => {
    console.log("Form submitted successfully!", data);
    // Your form submission logic here (e.g., API call)
  };
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="flex flex-col gap-2 w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              id="email"
              {...register("email", {
                required: true,
                pattern: /[A-Za-z0-9.$]+@[a-z{3}]+\.[a-z]{2,}/,
              })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="border border-gray-300 rounded-md p-2"
              type="password"
              id="password"
              {...register("password", {
                required: true,
                pattern: /[a-zA-Z0-9]{8,}/,
              })}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

export default App;
