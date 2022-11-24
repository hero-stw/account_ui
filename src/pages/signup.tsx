import React from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import LayoutMain from "@/layouts/LayoutMain";

function Signup() {
  return (
    <LayoutMain
      titleWeb="Singup"
      title="Singup"
      subTitle="Login to Classroom"
      href="/signin"
      titleLink=" Login now !"
    >
      <form>
        <FormControl mt={4}>
          <FormLabel htmlFor="displayName">Display name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your display name"
            id="displayName"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="number">Phone number</FormLabel>
          <Input
            type="number"
            id="number"
            placeholder="Enter your phone number"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>

        <Button bg="#DFB23F" width="full" mt={4}>
          Sign In
        </Button>
      </form>
    </LayoutMain>
  );
}

export default Signup;
