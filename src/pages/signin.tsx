import React, { useEffect, useState } from "react";
import LayoutMain from "@/layouts/LayoutMain";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import OApi from "@/services";
import { UserLogin } from "@/services/service";
import { useRouter } from "next/router";
import { redirectByRole } from "@/helpers/utils";
import { useProfile } from "@/hooks/useProfile";

const Signin = () => {
  const router = useRouter();
  const callBackUrl = router?.query?.callback_url;

  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: pro } = useProfile();
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        setIsAuthenticate(true);
        await queryClient.invalidateQueries(["getProfile"]);
        await router.push({ pathname: callBackUrl as string });
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
          <FormErrorMessage>
            <>{errors?.phone?.message}</>
          </FormErrorMessage>
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
          <FormErrorMessage>
            <>{errors?.password?.message}</>
          </FormErrorMessage>
        </FormControl>

        <Stack isInline justifyContent="space-between" mt={4}>
          <Box>
            <Link color="#FF7D0B">Forgot your password?</Link>
          </Box>
        </Stack>

        <Button
          bg="#DFB23F"
          type="submit"
          width="full"
          mt={4}
          isLoading={loginMutation.isLoading || isSubmitting}
        >
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
};

export default Signin;
