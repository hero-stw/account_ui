export const redirectByRole = (role: string) => {
    switch (role) {
        case "user":
            return process.env.USER_URL;
        case "chief":
        case "shipper":
            return process.env.SHIPPER_URL;
        case "admin":
            return process.env.ADMIN_URL;
        default:
            return process.env.USER_URL;
    }
};
