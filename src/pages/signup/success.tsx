import React, {useEffect} from "react";

import {Box, Button, Flex, Text, useInterval} from "@chakra-ui/react";
import Link from "next/link";
import {useRouter} from "next/router";

import HomeIcon from "@/icons/HomeIcon";
import LayoutMain from "@/layouts/LayoutMain";

const SignupSuccess = () => {
    const router = useRouter();
    const [timer, setTimer] = React.useState(10);
    const [isCountdown, setIsCountdown] = React.useState<boolean>(true);
    const callBackUrl = router?.query?.callback_url;
    useInterval(
        () => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                setIsCountdown(false);
            }
        },
        isCountdown ? 1000 : null
    );

    useEffect(() => {
        if (timer <= 0) {
            router.push({
                pathname: (callBackUrl as string) || process.env.USER_URL + '/home',
            });
        }
    }, [timer]);

    return (
        <LayoutMain titleWeb="Đăng ký thành công" title="Đăng ký thành công">
            <Box w="full">
                {/* <TitleAuth title={title} colorTitle="green" /> */}
                <Flex
                    align="right"
                    borderRadius={8}
                    direction="column"
                    //   m="24px 0"
                    p={2}
                >
                    <Text color="black.8c" mb={4}>
                        Tài khoản của bạn đã được tạo thành công !
                    </Text>
                    {/*<Text color="black.8c" mb={4}>*/}
                    {/*    A verification phone has been sent to your phone. Please check your*/}
                    {/*    spam folder or promotions tab if it hasn&apos;t arrived in your*/}
                    {/*    inbox.*/}
                    {/*</Text>*/}

                    <Box w="90%" m="0 auto" textAlign="center">
                        {callBackUrl && (
                            <Link href={`${callBackUrl as string}`}>
                                <Button
                                    fontSize={16}
                                    w="full"
                                    size="lg"
                                    mb="16px"
                                >
                                    Quay về trang trước ({timer}
                                    s)
                                </Button>
                            </Link>
                        )}

                        <Link href={`${process.env.USER_URL}/home`}>
                            <Button
                                fontSize={16}
                                w="full"
                                size="lg"
                                color="primary"
                                variant="ghost"
                                leftIcon={<HomeIcon/>}
                            >
                                Chọn món ngon ngay nào ! ({timer}s)
                            </Button>
                        </Link>
                    </Box>
                </Flex>
            </Box>
        </LayoutMain>
    );
};

export default SignupSuccess;
