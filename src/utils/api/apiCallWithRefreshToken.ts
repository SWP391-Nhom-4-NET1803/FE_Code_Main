import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { connection_path } from "../../constants/developments";
import { IAPIResponseModel, IAuthTokens } from "../Interfaces/interfaces";

type Callable = (...params: unknown[]) => object | null;

export const refreshAccessToken = async (): Promise<boolean> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        baseURL: connection_path.base_url,
        url: connection_path.auth.refresh,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
        }
    }

    const response_data: boolean = await axios(config)
    .then((res: AxiosResponse<IAPIResponseModel<IAuthTokens>>) => {
        if (res.data.success)
        {
            localStorage.setItem('accessToken', res.data.content!.accessToken);
            localStorage.setItem('refreshToken', res.data.content!.refreshToken);
            return true;
        }

        return false;
    })
    .catch(() => {
        return false;
    });

    return response_data;
}

export const apiCallWithTokenRefresh = async (apiCall: Callable, ...params: unknown[]): Promise<object | null> => {
    let result = null;
    
    try {
        console.log("run try");
        return await apiCall(...params);
    } catch (error: unknown) {

        console.log("run catch");

            const refreshed = await refreshAccessToken();

            if (refreshed) {
                try { 
                    result = await apiCall(...params); 

                    return result;
                }
                catch (error) {
                    console.error("error");

                }
            }

            localStorage.clear();
            result = null;
            window.location.pathname = 'login';
        }

    return result;
};
