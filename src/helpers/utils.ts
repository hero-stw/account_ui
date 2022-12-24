import * as process from "process";

export const redirectByRole = (role: string) => {
    switch (role) {
        case "user":
            return process.env.USER_URL;
        case "chief":
            return process.env.CHIEF_URL;
        case "shipper":
            return process.env.SHIPPER_URL;
        case "admin":
            return process.env.ADMIN_URL;
        default:
            return process.env.USER_URL;
    }
};
