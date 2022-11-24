import { AxiosRequestConfig } from "axios";

import { Api } from "./service";
import qs from "qs";

const securityWorker = async () => {
    return {
        headers: {
            accept: "application/json;charset=UTF-8",
            "Content-type": "application/json",
        },
    };
};

export const api = (props: AxiosRequestConfig) => {
    return new Api({
        securityWorker,
        withCredentials: true,
        ...props
    });
}
