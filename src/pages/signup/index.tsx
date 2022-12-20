import React from "react";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, useToast} from "@chakra-ui/react";
import LayoutMain from "@/layouts/LayoutMain";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import OApi from "@/services";
import {UserRegister} from "@/services/service";
import {useRouter} from "next/router";

function Signup() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const callBackUrl = router?.query?.callback_url;

    const toast = useToast();
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm({mode: "onTouched"});

    const regitserMutation = useMutation(["authLogin"], (data: UserRegister) =>
        OApi.register.authRegister(data)
    );

    const onSubmit = (data: any) => {
        regitserMutation.mutate(data, {
            onSuccess: async (res) => {
                await queryClient.invalidateQueries(["getProfile"]);
                await router.push({
                    pathname: "/signup/success",
                    query: {callback_url: callBackUrl as string},
                });
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

    return (
        <LayoutMain
            titleWeb="Đăng ký"
            title="Đăng ký"
            subTitle="Đăng nhập vào Order Me"
            href="/signin"
            titleLink="Đăng nhập ngay !"
        >
            <form onSubmit={handleSubmit(onSubmit)} method="post">
                <FormControl mt={4} isInvalid={!!errors.name}>
                    <FormLabel htmlFor="displayName">Họ và tên</FormLabel>
                    <Input
                        type="text"
                        placeholder="Nhập họ và tên"
                        id="displayName"
                        {...register("name", {
                            required: "Hãy nhập tên của bạn !",
                            minLength: {
                                value: 3,
                                message: "Nhập tên của bạn ít nhất 3 ký tự !",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        <>{errors?.name?.message}</>
                    </FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.phone}>
                    <FormLabel htmlFor="number">Số điện thoại</FormLabel>
                    <Input
                        type="number"
                        id="number"
                        placeholder="Nhập số điện thoại"
                        {...register("phone", {
                            required: "Hãy nhập số điện thoại của bạn",
                            minLength: {
                                value: 10,
                                message: "Nhập số điện thoại của bạn ít nhất 10 ký tự !",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        <>{errors?.phone?.message}</>
                    </FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors?.password}>
                    <FormLabel>Mật khẩu</FormLabel>
                    <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...register("password", {
                            required: "Hãy nhập mật khẩu !",
                            minLength: {
                                value: 6,
                                message: "Độ dài của mật khẩu ít nhất 6 ký tự !",
                            },
                        })}
                    />
                    <FormErrorMessage>
                        <>{errors?.password?.message}</>
                    </FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!errors.password_comfirmation}>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <Input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        {...register("password_comfirmation", {
                            required: "Hãy xác nhận mật khẩu !",
                            minLength: {
                                value: 6,
                                message: "Độ dài của mật khẩu ít nhất 6 ký tự !",
                            },
                            validate: (val: string) => {
                                if (watch("password") != val) {
                                    return "Nhập lại mật khẩu không khớp !";
                                }
                            },
                        })}
                    />
                    <FormErrorMessage>
                        <>{errors?.password_comfirmation?.message}</>
                    </FormErrorMessage>
                </FormControl>

                <Button
                    type="submit"
                    bg="#DFB23F"
                    width="full"
                    isLoading={isSubmitting || regitserMutation.isLoading}
                    mt={6}
                >
                    Đăng ký
                </Button>
            </form>
        </LayoutMain>
    );
}

export default Signup;
