import { ICustomerModel, ICustomerUpdateModel } from './../Interfaces/interfaces';
import { IUserAccount } from "../interfaces/User/UserDefinition"
import { connection_path } from "../../constants/developments"
import { checkAuth } from "./AuthenticateUtils";
import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { AppointmentViewModelFetch } from "./ClinicOwnerUtils";
import { UserInfoModel } from "./SystemAdminUtils";
import { apiCallWithTokenRefresh } from "./apiCallWithRefreshToken";
import { config } from "@fortawesome/fontawesome-svg-core";
import { PaymentModel } from "./BookingRegister";
import { IAPIResponseModel, ICustomerModel } from "../Interfaces/interfaces";

export const getUserData = async (): Promise<IUserAccount> => {
    const api_url: string = connection_path.base_url + connection_path.user.customer;

    const config = {
        method: 'GET',
        url: api_url,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        },
    };

    try {
        const response = await axios(config);
        if (response.status === 200) {
            const user: IUserAccount = response.data.content;
            console.log('Fetch user data successfully');
            return user;
        } else {
            console.log('Failed to fetch user');
            return {} as IUserAccount;
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return {} as IUserAccount;
    }
}

export const putUserData = async (userData: UserInfoModel) => {
    const apiCall = async () => {
        const api_url: string = `${connection_path.base_url}${connection_path.user.customer_update}`;

        const config = {
            method: "PUT",
            url: api_url,
            data: userData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
        }

        try {
            const response = await axios(config);
            if (response.status = 200) {
                alert("User updated successfully");
                return response.data;
            } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            throw error;
        }
    }
    return await apiCallWithTokenRefresh(apiCall);
};

export const getCustomerAppointments = async (customerId: string, from_date?: Date, to_date?: Date, from_time?: string, to_time?: string, requestOldItems = true, page_size?: number, page_index?: number): Promise<AppointmentViewModelFetch[]> => {
    const apiCall = async () => {
        const api_url: string = connection_path.base_url + connection_path.booking.get_customer_booking.replace(':id', customerId);

        const config = {
            method: 'GET',
            url: api_url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            params: {
                from_date: from_date,
                to_date: to_date,
                from_time,
                to_time,
                requestOldItems,
                page_size,
                page_index
            }
        }

        // const isAuthenticated = await checkAuth();
        // if (!isAuthenticated) {
        //     console.error('User is not authenticated');
        //     return [];
        // }


        try {
            const response = await axios(config)
            if (response.status == 200) {
                console.log("User appointments");
                return response.data.content;
            } else {
                console.log("Failed to fetch appointment")
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    return await apiCallWithTokenRefresh(apiCall);
}

export interface PaymentDetail {
    id: number;
    transactId: string;
    amount: number;
    info: string;
    expiration: string;
    createdTime: string;
    status: string;
    provider: string;
    appointmentId: string;
}

export const getCustomerPayments = async (customerId: string): Promise<PaymentDetail[]> => {
    const api_url = connection_path.base_url + connection_path.booking.get_customer_payment + `${customerId}`;
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: api_url,
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        const response = await axios(config);
        if (response) {
            return response.data.content;
        } else {
            console.log(response)
            return []
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getCustomerInfo = async (): Promise<ICustomerModel | null> => {
    const APICall = async () => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            baseURL:connection_path.base_url,
            url: connection_path.user.customer,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
        };

        const response_data: ICustomerModel | null = await axios(config)
        .then((res: AxiosResponse<IAPIResponseModel<ICustomerModel>>) => {
            const data: ICustomerModel = res.data.content!;

            return data;
        })
        .catch((error: unknown) => {
            console.log(error);
            throw new Error("error");
        })

        return response_data;
    }

    const result = await apiCallWithTokenRefresh(APICall);

    return result as ICustomerModel | null;
}

export const updateCustomerInfo = async (updateInfo: ICustomerUpdateModel): Promise<ICustomerModel | null> => {
    const apiCall = async () => {
        const config: AxiosRequestConfig = {
            method: "PUT",
            baseURL:connection_path.base_url,
            url: connection_path.user.customer_update,
            data: updateInfo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
        }

        const response_data: ICustomerModel | null = await axios(config)
        .then((res: AxiosResponse<IAPIResponseModel<ICustomerModel>>) => {
            const data: ICustomerModel | null = res.data.content;

            return data;
        })
        .catch((error: unknown) => {
            if (error instanceof AxiosError)
            {
                if(error.status === 401)
                {
                    throw error;
                }
            }

            return null;
        });

        return response_data;
    }
    return await apiCallWithTokenRefresh(apiCall, updateInfo) as ICustomerModel | null;
}

export const updateUserPassword = async (user_id: string, new_password: string): Promise<object | null> => {
    const APICall = async () => {
        const request_config: AxiosRequestConfig = {
            baseURL: connection_path.base_url,
            url: connection_path.admin.get_users,
            data: {
                id: user_id,
                password: new_password,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        };

        const response_data: boolean = await axios(request_config)
        .then((res: AxiosResponse<IAPIResponseModel<string>>) => {
            if (res.data.success)
            {
                return true;
            }

            return false;
        })
        .catch((error: unknown) => {
            if (error instanceof AxiosError && error.status === 401)
            {
                throw new Error('Possible expired token');
            }
            return false;
        });
        
        return response_data;
    }

    return await apiCallWithTokenRefresh(APICall) as object | null;
}