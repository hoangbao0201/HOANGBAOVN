import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";

import clsx from "clsx";
import { getServerSession } from "next-auth/next";

import { NextPageWithLayout } from "../_app";
import { authOptions } from "@/utils/authOptions";
import MainLayout from "@/components/Layouts/MainLayout";
import ButtonAuth from "@/components/modules/Auth/ButtonAuth";

const LineHeadingStyle = styled.div`
    /* margin: auto 5px auto 20px; */
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
    position: relative;

    &::before {
        content: "";
        display: block;
        /* max-width: 150px; */
        width: 30%;
        height: 2px;
        background: #dddd;
        position: absolute;
        left: 5px;
        top: 50%;   
    }
    &::after {
        content: "";
        display: block;
        /* max-width: 150px; */
        width: 30%;
        height: 2px;
        background: #dddd;
        position: absolute;
        right: 5px;
        top: 50%;
    }
`

interface AuthLoginPageProps {
    session: any;
}
const AuthLoginPage: NextPageWithLayout<AuthLoginPageProps> = ({}) => {
    const router = useRouter();
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [dataLogin, setDataLogin] = useState({
        accout: "",
        password: "",
    });
    const [loadingLogin, setLoadingLogin] = useState(false);

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        setLoadingLogin(true);
        try {
            const { accout, password } = dataLogin;

            const result = await signIn("credentials", {
                redirect: false,
                accout: accout,
                password: password,
            });
            console.log(result)
            setLoadingLogin(false);

            if (result?.error) {
            } else {
                router.back();
            }
        } catch (error) {
            setLoadingLogin(false);
        }
    };

    const handleSigninGithub = async () => {
        signIn("github", { redirect: false });
    };

    const handleSigninGoogle = async () => {
        // signIn("google", { redirect: false });
        signIn("google");
    };

    const handleSigninFacebook = async () => {
        signIn("facebook", { redirect: false });
    };

    return (
        <div>
            <div className="my-4" style={{ minHeight: "calc(100vh - 174px)" }}>
                <div
                    className={clsx(
                        "bg-white dark:bg-slate-800/70 rounded-md shadow-sm border max-w-xl w-full mx-auto overflow-hidden",
                        {
                            "pointer-events-none opacity-70": loadingLogin,
                        }
                    )}
                >
                    <div
                        className={clsx("loading-bar", {
                            "before:content-none": !loadingLogin,
                        })}
                    ></div>
                    <div className="px-5 py-5">
                        <div className="font-semibold text-center mb-3">
                            {/* HOANGBAO */}
                            <Link aria-label={`Trang chủ HOANGBAO`} href={`/`}>
                                <Image
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                    decoding="async"
                                    src={`/static/images/${currentTheme === "dark" ? 'logo-dark.png' : 'logo.png'}`}
                                    alt="Logo HOANGBAO"
                                    className="w-[100px] h-[40px] mx-auto"
                                />
                            </Link>
                        </div>
                        <div className="font-semibold text-center text-2xl mb-5">
                            Đăng nhập
                        </div>
                        <div>
                            <div className="mb-3 relative">
                                <label
                                    htmlFor="idInputAccout"
                                    className="select-none cursor-pointer mb-1 block"
                                >
                                    Tài khoản
                                </label>
                                <input
                                    id="idInputAccout"
                                    name="accout"
                                    value={dataLogin.accout}
                                    onChange={eventChangeValueInput}
                                    className="border h-11 py-2 px-4 rounded-md w-full transition-all focus:border-blue-600 focus:outline outline-blue-600"
                                />
                            </div>
                            <div className="mb-3 relative">
                                <label
                                    htmlFor="idInputPassword"
                                    className="select-none cursor-pointer mb-1 block"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    id="idInputPassword"
                                    name="password"
                                    type="password"
                                    value={dataLogin.password}
                                    onChange={eventChangeValueInput}
                                    className="border h-11 py-2 px-4 rounded-md w-full transition-all focus:border-blue-600 focus:outline outline-blue-600"
                                />
                            </div>
                            <div className="mb-3 text-blue-600 flex items-center justify-end gap-4">
                                <Link aria-label={`Quên mật khẩu`} href={`/`}><span className="hover:underline">Quên mật khẩu</span></Link>
                                <Link aria-label={`Đăng kí mới`} href={`/auth/register`}><span className="hover:underline">Đăng kí mới</span></Link>
                            </div>

                            <div
                                onClick={handleLogin}
                                className="mb-2 border bg-blue-600 hover:bg-blue-700 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md"
                            >
                                Đăng nhập
                            </div>

                            <LineHeadingStyle>Đăng nhập với</LineHeadingStyle>

                            <ButtonAuth
                                color="text-white bg-gray-900 hover:bg-gray-950"
                                content="Github"
                                linkIcon="/static/images/social/github.svg"
                                handle={handleSigninGithub}
                            />
                            <ButtonAuth
                                color="text-black bg-white hover:bg-gray-100"
                                content="Google"
                                linkIcon="/static/images/social/google.svg"
                                handle={handleSigninGoogle}
                            />
                            <ButtonAuth
                                color="text-white bg-blue-600 hover:bg-blue-700/90"
                                content="Facebook"
                                linkIcon="/static/images/social/facebook.svg"
                                handle={handleSigninFacebook}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLoginPage;

AuthLoginPage.getLayout = (page) => {
    return <MainLayout isHeaderDynamic={false}>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
