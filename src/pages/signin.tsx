import React, {useEffect, useState} from 'react';
import LayoutMain from "@/layouts/LayoutMain";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Link, Stack, useToast,} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import OApi from "@/services";
import {UserLogin} from "@/services/service";
import {useRouter} from "next/router";

const Signin = () => {
    const router = useRouter();
    const queryClient = useQueryClient()
    const toast = useToast()
    const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm();
    const [token, setToken] = useState()


    const loginMutation = useMutation(['authLogin'],
        (data: UserLogin) => OApi.login.authLogin(data));
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const {data: pro, isLoading} = useQuery(
        ["getProfile", {headers}],
        () => OApi.me.getProfile({headers}), {
            retry: 0,
            refetchInterval: 15000
        }
    );
    // @ts-ignore
    const profile = pro?.data.data;
    const isUser = !!profile;

    const onSubmit = (data: any) => {
        loginMutation.mutate(
            data,
            {
                onSuccess: async (res) => {
                    await queryClient.refetchQueries();

                    // @ts-ignore
                    const access_token = res.data.access_token
                    await setToken(access_token)
                },
                onError: (e: any) => {
                    toast({
                        title: e.response.data.message,
                        status: "error",
                        position: "top",
                    })
                }
            }
        )
    };

    useEffect(() => {
        (async () => {
            if (profile?.role === "admin") {
                await router.push({
                    pathname: (router?.query?.callback_url || process.env.ADMIN_URL) as string,
                    query: {token: token}
                })
            }
            if (profile?.role === "shipper") {
                await router.push({
                    pathname: (router?.query?.callback_url || process.env.SHIPPER_URL) as string,
                    query: {token: token}
                })
            }
            if (profile?.role === "user") {
                await router.push({
                    pathname: (router?.query?.callback_url || process.env.USER_URL) as string,
                    query: {token: token}
                })
            }

            return
        })()
    }, [isUser, token, isLoading])
    return (
        <LayoutMain
            titleWeb="Singin"
            title="Singin"
            subTitle="New to Order Me"
            href="/signup"
            titleLink="Sign up now!"
        >
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.phone}>
                    <FormLabel htmlFor="number">Phone number</FormLabel>
                    <Input
                        type="number"
                        id="number"
                        placeholder="Enter your phone number"
                        {...register("phone", {
                            required: "The phone is incorrect.",
                            minLength: {
                                value: 10,
                                message: "Minimum length should be 10",
                            },
                        })}
                    />
                    <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "The password is incorrect.",
                            minLength: {
                                value: 6,
                                message: "Minimum length should be 6",
                            },
                        })}
                    />
                    <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                </FormControl>

                <Stack isInline justifyContent="space-between" mt={4}>
                    <Box>
                        <Link color="#FF7D0B">Forgot your password?</Link>
                    </Box>
                </Stack>

                <Button bg="#DFB23F" type="submit" width="full" mt={4} isLoading={loginMutation.isLoading || isSubmitting}>
                    Sign In
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
}

export default Signin;