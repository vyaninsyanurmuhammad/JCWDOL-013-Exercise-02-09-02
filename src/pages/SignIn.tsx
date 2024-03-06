import { Button, Input } from "@material-tailwind/react";
import { TwitterLogo } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { signInThunk } from "../redux/features/auth-thunk";
import { IUser } from "../models/interfaces/IUser";

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const naviagte = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = ({ target }: { target: any }) =>
    setUsername(target.value);
  const onChangePassword = ({ target }: { target: any }) =>
    setPassword(target.value);

  const onClickDaftar = () => {
    const user: IUser = {
      username,
      password,
    };
    dispatch(signInThunk(user));

    naviagte("/");
  };

  return (
    <>
      <AuthLayout>
        <div className="w-full h-14 flex justify-center items-center">
          <TwitterLogo size={29} className="text-white" />
        </div>
        <div className="flex flex-col gap-8 mx-28 px-8 pb-12 mb-14 mt-5">
          <span className="text-white font-chirpMedium font-semibold text-3xl">
            Masuk ke Twitter
          </span>
          <div className="flex flex-col gap-8">
            <Input
              className="rounded-md text-white font-chirpRegular py-7"
              variant="outlined"
              label="Username"
              labelProps={{
                className: "!text-white font-chirpRegular",
              }}
              type="text"
              color="blue"
              placeholder="Type your username here!"
              value={username}
              onChange={onChangeUsername}
              crossOrigin={undefined}
            />
            <Input
              className="rounded-md text-white font-chirpRegular py-7"
              variant="outlined"
              label="Password"
              color="blue"
              labelProps={{
                className: "!text-white font-chirpRegular",
              }}
              type="password"
              placeholder="Type your passworrd here!"
              value={password}
              onChange={onChangePassword}
              crossOrigin={undefined}
            />
          </div>
          <div className="w-full h-fit mt-4">
            <Button
              className="rounded-full w-full text-base font-chirpRegular font-bold capitalize px-4 py-2"
              color="blue"
              disabled={!(username.length > 0) || !(password.length > 0)}
              onClick={() => onClickDaftar()}
            >
              Masuk
            </Button>
          </div>
          <div className="flex gap-2">
            <span className="font-chirpRegular text-gray-700">
              Belum punya akun?
            </span>
            <Link
              className="font-chirpRegular text-blue-500 hover:text-blue-700"
              to="/signup"
            >
              Daftar
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
