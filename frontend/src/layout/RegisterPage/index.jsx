import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = ({ email, password, name }) => {
    const body = {
      email,
      password,
      name,
      image: `https://via.placeholder.com/600x400?text=no+user+image`,
    };
    dispatch(registerUser(body));
    reset();
  };
  console.log(errors);
  const userEmail = {
    required: "이메일은 필수 입력입니다.",
  };

  const userName = {
    required: "이름은 필수 입력입니다.",
  };
  const userPassword = {
    required: "비밀번호는 필수 입력입니다.",
    minLength: {
      value: 6,
      message: "6자리 이상 비밀번호를 사용하세요.",
    },
  };

  return (
    <section className="flex flex-col justify-center mt-20 max-w-[400px] m-auto">
      <div className="p-6 bg-white rounded-md shadow-md ">
        <h1 className="text-3xl font-semibold text-center">회원가입</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="eamil"
              className="w-full py-4 mt-2 bg-slate-400 rounded-md"
              {...register("email", userEmail)}
            />
            {errors?.email && (
              <div>
                <span className=" text-red-500">{errors.email.message}</span>
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full py-4 mt-2 bg-slate-400 rounded-md"
              {...register("name", userName)}
            />
            {errors.name && (
              <div>
                <span className=" text-red-500">{errors.name.message}</span>
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full py-4 mt-2 bg-slate-400 rounded-md"
              {...register("password", userPassword)}
            />
            {errors.password && (
              <div>
                <span className=" text-red-500">{errors.password.message}</span>
              </div>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-700 duration-200"
            >
              회원가입
            </button>
          </div>
          <p className="mt-8 text-xs font-light text-center">
            아이디가 있다면?{" "}
            <a href="/login" className=" font-medium hover:underline">
              로그인
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
