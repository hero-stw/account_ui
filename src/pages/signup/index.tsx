import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import LayoutMain from "@/layouts/LayoutMain";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OApi from "@/services";
import { UserRegister } from "@/services/service";
import { useRouter } from "next/router";

function Signup() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const callBackUrl = router?.query?.callback_url;

  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const regitserMutation = useMutation(["authLogin"], (data: UserRegister) =>
    OApi.register.authRegister(data)
  );

  const onSubmit = (data: any) => {
    regitserMutation.mutate(data, {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries(["getProfile"]);
        await router.push({
          pathname: "/signup/success",
          query: { callback_url: callBackUrl as string },
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
      titleWeb="Singup"
      title="Singup"
      subTitle="Login to Classroom"
      href="/signin"
      titleLink=" Login now !"
    >
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <FormControl mt={4} isInvalid={!!errors.name}>
          <FormLabel htmlFor="displayName">Display name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your display name"
            id="displayName"
            {...register("name", {
              required: "The name is incorrect.",
              minLength: {
                value: 3,
                message: "Minimum length should be 3",
              },
            })}
          />
          <FormErrorMessage>
            <>{errors?.name?.message}</>
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.phone}>
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
          <FormErrorMessage>
            <>{errors?.phone?.message}</>
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors?.password}>
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
          <FormErrorMessage>
            <>{errors?.password?.message}</>
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password_comfirmation}>
          <FormLabel>Password Confirm</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password_comfirmation", {
              required: "The password confirm is incorrect.",
              minLength: {
                value: 6,
                message: "Minimum length should be 6",
              },
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
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
          Sign In
        </Button>
      </form>
    </LayoutMain>
  );
}

export default Signup;
