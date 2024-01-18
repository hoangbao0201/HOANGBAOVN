import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

import clsx from "clsx";
import { getServerSession } from "next-auth/next";

import { NextPageWithLayout } from "../_app";
import { authOptions } from "@/utils/authOptions";
import MainLayout from "@/components/Layouts/MainLayout";
import ButtonAuth from "@/components/modules/Auth/ButtonAuth";

interface AuthLoginPageProps {
    session: any;
}
const AuthLoginPage: NextPageWithLayout<AuthLoginPageProps> = ({}) => {
    const router = useRouter();
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
                email: accout,
                password: password,
            });
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
                            HOANGBAO
                        </div>
                        <div className="font-semibold text-center text-2xl mb-5">
                            Đăng nhập
                        </div>
                        <div>
                            <div className="mb-3 relative">
                                <label
                                    htmlFor="idInputAccout"
                                    className="select-none cursor-pointer mb-1"
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
                            <div className="mb-6 relative">
                                <label
                                    htmlFor="idInputPassword"
                                    className="select-none cursor-pointer mb-1"
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
                            <div
                                onClick={handleLogin}
                                className="mb-2 border bg-blue-600 hover:bg-blue-700 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md"
                            >
                                Đăng nhập
                            </div>

                            <ButtonAuth
                                color="black"
                                content="Google"
                                linkIcon="/static/images/social/google.svg"
                                handle={() => {}}
                            />
                            <ButtonAuth
                                color="white"
                                content="Github"
                                linkIcon="/static/images/social/github.svg"
                                handle={handleSigninGithub}
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
    return <MainLayout>{page}</MainLayout>;
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
