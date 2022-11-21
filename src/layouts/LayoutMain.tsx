import React from 'react';
import {Box, Flex, Heading, Image, Text, useColorModeValue} from "@chakra-ui/react";
import ColorModeSwitcher from "@/components/ColorModeSwitcher";
import Head from "next/head";

type Props = {
    title: string;
    children: React.ReactNode;
    subTitle: string;
    titleLink: string;
    titleWeb: string;
    href: string
};

function LayoutMain({children, title, subTitle, titleLink, titleWeb, href}: Props) {
    const color = useColorModeValue('gray.600', 'white')
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Flex
                minHeight="100vh"
                width="full"
                align="center"
                justifyContent="center"
            >
                <Box w="full">
                    <Box display="grid" placeItems="center">
                        <Image
                            src="/order-me-logo.png"
                            objectFit="cover"
                            w="150px"
                            alt="logo"
                        />
                        <Heading mt={2} color="#DFB23F">ORDER
                            <Text as="span" color={color}> ME</Text>
                        </Heading>
                    </Box>

                    <Box m="0 0 2rem ">
                        <Text
                            fontSize="2xl"
                            m={{lg: "2rem 0 12px 0", base: "1rem 0 .5rem 0"}}
                            fontWeight={700}
                            textAlign="center"
                        >
                            {title}
                        </Text>

                        <Flex fontSize={18} fontWeight={400} justify="center">
                            <Text>{subTitle}</Text>
                            {/*<Link passHref href={"/"}>*/}
                            {/*    <a>*/}
                            {/*        {titleLink}*/}
                            {/*    </a>*/}
                            {/*</Link>*/}
                        </Flex>
                    </Box>

                    <Box
                        borderWidth={1}
                        px={{lg: 4, base: 0}}
                        width="full"
                        maxWidth={{lg: "500px", base: "355px"}}
                        borderRadius={4}
                        textAlign="center"
                        boxShadow="lg"
                        m="auto"
                    >
                        <Box p={4}>
                            <Box textAlign={"right"}>
                                <ColorModeSwitcher/>
                            </Box>
                            <Box my={{lg: 8, base: 4}} textAlign="left">
                                {children}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}

export default LayoutMain;