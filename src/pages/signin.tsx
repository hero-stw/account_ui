import React, {useEffect, useState} from "react";
import LayoutMain from "@/layouts/LayoutMain";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, useToast,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import OApi from "@/services";
import {UserLogin} from "@/services/service";
import {useRouter} from "next/router";
import {redirectByRole} from "@/helpers/utils";
import {useProfile} from "@/hooks/useProfile";
import process from "process";

const Signin = () => {
    const router = useRouter();
    const callBackUrl = router?.query?.callback_url;
    console.log(process.env.CHIEF_URL)
    const queryClient = useQueryClient();
    const toast = useToast();

    const {data: pro} = useProfile();
    const [isAuthenticate, setIsAuthenticate] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm();

    const loginMutation = useMutation(["authLogin"], (data: UserLogin) =>
        OApi.login.authLogin(data)
    );

    // @ts-ignore
    const profile = pro?.data?.data;
    const isUser = !!profile;

    const onSubmit = (data: any) => {
        loginMutation.mutate(data, {
            onSuccess: async (res) => {
                await queryClient.invalidateQueries(["getProfile"]);
                setIsAuthenticate(true);
                await router.push({pathname: callBackUrl as string});
            },
            onError: (e: any) => {
                toast({
                    title: e.response.data.message,
                    status: "error",
                    position: "top",
                });
            },
        });
    };

    useEffect(() => {
        (async () => {
            if (isUser && isAuthenticate) {
                await router.push(redirectByRole(profile?.role as string) as string);
            }
        })();
    }, [isUser, isAuthenticate]);

    return (
        <LayoutMain
            titleWeb="Đăng nhập"
            title="Đăng nhập"
            subTitle="Tạo tài khoản mới với Order Me"
            href="/signup"
            titleLink="Đăng ký ngay!"
        >
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.phone}>
                    <FormLabel htmlFor="number">Số điện thoại</FormLabel>
                    <Input
                        type="number"
                        id="number"
                        placeholder="Nhập số điện thoại của bạn"
                        {...register("phone", {
                            required: "Hãy nhập số điện thoại của bạn !",
                            minLength: {
                                value: 10,
                                message: "Số điện thoại ít nhất là 10 kí tự !",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        <>{errors?.phone?.message}</>
                    </FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!errors.password}>
                    <FormLabel>Mật khẩu</FormLabel>
                    <Input
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        {...register("password", {
                            required: "Hãy nhập mật khẩu của bạn !",
                            minLength: {
                                value: 6,
                                message: "Mật khẩu ít nhất là 6 kí tự !",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        <>{errors?.password?.message}</>
                    </FormErrorMessage>
                </FormControl>

                {/*<Stack isInline justifyContent="space-between" mt={4}>*/}
                {/*    <Box>*/}
                {/*        <Link color="#FF7D0B">Forgot your password?</Link>*/}
                {/*    </Box>*/}
                {/*</Stack>*/}

                <Button
                    bg="#DFB23F"
                    type="submit"
                    width="full"
                    mt={4}
                    isLoading={loginMutation.isLoading || isSubmitting}
                >
                    Đăng nhập
                </Button>
            </form>

            {/*<Text textAlign="center" m="1.5rem">*/}
            {/*    Or*/}
            {/*</Text>*/}

            {/*<Button onClick={handleLogin} width="full" leftIcon={<GoogleIcon/>}>*/}
            {/*    Google*/}
            {/*</Button>*/}
        </LayoutMain>
    );
};

export default Signin;
