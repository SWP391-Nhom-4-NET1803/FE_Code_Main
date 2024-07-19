import { IAdminClinicList, IAPIResponseModel, IClinicModel, ICustomerModel, IDentistModel, IUserInfoModel } from './../Interfaces/interfaces';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { connection_path } from '../../constants/developments';
import { apiCallWithTokenRefresh } from './apiCallWithRefreshToken';
import { IAdminClinicList } from '../interfaces/interfaces';

export interface ClinicServiceCategoryRegistrationModel {
    Name: string;
}

export interface ClinicServiceCategoryModel {
    id: number;
    name: string;
}

export const addCategory = async (category: ClinicServiceCategoryRegistrationModel): Promise<ClinicServiceCategoryModel[] | string> => {
    const apiCall = async () => {
        const api_url: string = connection_path.base_url + connection_path.admin.register_service;
        const accessToken = localStorage.getItem('accessToken');

        const configuration: AxiosRequestConfig = {
            method: 'POST',
            url: api_url,
            data: category,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json' // Set content type as JSON
            }
        };

        try {
            const response: AxiosResponse = await axios(configuration);
            if (response.status === 200) {
                return response.data.content;
                alert('Category added successfully');
            } else {
                const errorMessage = `Failed to add category: ${response.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            let errorMessage = '';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Unauthorized: User is not authenticated.';
                } else {
                    errorMessage = `HTTP Error ${error.response.status}: ${error.response.statusText}`;
                }
            } else if (error.request) {
                errorMessage = 'Network Error: No response received from the server.';
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            throw new Error(errorMessage);
        }
    }
    return await apiCallWithTokenRefresh(apiCall)
};

export const getAllCategories = async (): Promise<ClinicServiceCategoryModel[]> => {
    const apiCall = async () => {
        const api_url: string = connection_path.base_url + connection_path.admin.register_service;
        const accessToken = localStorage.getItem('accessToken');

        const configuration: AxiosRequestConfig = {
            method: 'GET',
            url: api_url,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json' // Set content type as JSON
            }
        };

        try {
            const response: AxiosResponse = await axios(configuration);
            if (response.status === 200) {
                return response.data.content; // Assuming response.data contains the list of categories
            } else {
                const errorMessage = `Failed to fetch categories: ${response.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            let errorMessage = '';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Unauthorized: User is not authenticated.';
                } else {
                    errorMessage = `HTTP Error ${error.response.status}: ${error.response.statusText}`;
                }
            } else if (error.request) {
                errorMessage = 'Network Error: No response received from the server.';
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            throw new Error(errorMessage);
        }
    }
    return await apiCallWithTokenRefresh(apiCall);
};


export interface ClinicInfoModel {
    id: number;
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    openHour: string;
    closeHour: string;
    ownerId: number;
    working: boolean;
    status: string;
}

export const getAllClinics = async (
    page: number,
    page_size: number,
    name?: string,
    open?: string,
    close?: string,
    status?: string,
    working?: boolean
): Promise<{ content: ClinicInfoModel[] } | string> => {
    const apiCall = async () => {

        const api_url: string = `${connection_path.base_url}${connection_path.admin.get_clinics}`;
        const accessToken = localStorage.getItem('accessToken');

        // Prepare request parameters
        const params: { [key: string]: any } = {
            page: page,
            pageSize: page_size,
            name: name || undefined,
            open: open || undefined,
            close: close || undefined,
            status: status || undefined,
            working: working !== undefined ? working : undefined,
        };

        // Configure Axios request
        const configuration: AxiosRequestConfig = {
            method: 'GET',
            url: api_url,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            params: params,
        };

        try {
            const response: AxiosResponse<{ content: ClinicInfoModel[], totalPages: number }> = await axios(configuration);
            if (response.status === 200) {
                return {
                    content: response.data.content,
                };
            } else {
                const errorMessage = `Failed to fetch clinics: ${response.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            let errorMessage = '';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Unauthorized: User is not authenticated.';
                } else {
                    errorMessage = `HTTP Error ${error.response.status}: ${error.response.statusText}`;
                }
            } else if (error.request) {
                errorMessage = 'Network Error: No response received from the server.';
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            throw new Error(errorMessage);
        }
    }
    return await apiCallWithTokenRefresh(apiCall);
};

export interface UserInfoModel {
    id: number;
    username: string;
    passwordHash: string;
    salt: string;
    email: string;
    phone: string;
    fullname: string;
    role: string;
    isActive: boolean;
    isRemoved: boolean;
    joinedDate: string;
    customerId?: number;
    birthdate?: string;
    sex: string;
    insurance: string;
    dentistId?: number;
    clinicId?: number;
    isOwner: boolean;
}

export const getAllUsers = async (): Promise<UserInfoModel[]> => {
    const apiCall = async () => {

        const api_url: string = `${connection_path.base_url}${connection_path.admin.get_users}`;
        const accessToken = localStorage.getItem('accessToken');

        const configuration: AxiosRequestConfig = {
            method: 'GET',
            url: api_url,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json' // Set content type as JSON
            }
        };

        try {
            const response: AxiosResponse = await axios(configuration);
            if (response.status === 200) {
                return response.data.content; // Assuming response.data contains the list of users
            } else {
                const errorMessage = `Failed to fetch users: ${response.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            let errorMessage = '';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Unauthorized: User is not authenticated.';
                } else {
                    errorMessage = `HTTP Error ${error.response.status}: ${error.response.statusText}`;
                }
            } else if (error.request) {
                errorMessage = 'Network Error: No response received from the server.';
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            throw new Error(errorMessage);
        }
    }
    return await apiCallWithTokenRefresh(apiCall);
};

export const getAllDentist = async (): Promise<UserInfoModel[]> => {
    // const apiCall = async () => {
        const configuration: AxiosRequestConfig = {
            method: 'GET',
            baseURL: connection_path.base_url,
            url: connection_path.admin.get_dentists,
            params: {},
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            }
        };

        try {
            const response: AxiosResponse = await axios(configuration);
            if (response.status === 200) {
                return response.data.content;
            } else {
                const errorMessage = `Failed to fetch dentists: ${response.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            let errorMessage = '';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Unauthorized: User is not authenticated.';
                } else {
                    errorMessage = `HTTP Error ${error.response.status}: ${error.response.statusText}`;
                }
            } else if (error.request) {
                errorMessage = 'Network Error: No response received from the server.';
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            throw new Error(errorMessage);
        }
    // }
    // return await apiCallWithTokenRefresh(apiCall);
}

export const getAllCustomer = async (): Promise<UserInfoModel[]> => {
    // const apiCall = async () => {

        const api_url: string = `${connection_path.base_url}${connection_path.admin.get_customer}`;
        const configuration: AxiosRequestConfig = {
            method: 'GET',
            url: api_url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            }
        };
        try {
            const response: AxiosResponse = await axios(configuration);
            if (response.status === 200) {
                return response.data.content;
            } else {
                const errorMessage = `Failed to fetch customers: ${response.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: unknown) {
            let errorMessage = '';
            if (error instanceof AxiosError) {
                if (error.response) {
                    if (error.response.status === 401) {
                        errorMessage = 'Unauthorized: User is not authenticated.';
                    } else {
                        errorMessage = `HTTP Error ${error.response.status}: ${error.response.statusText}`;
                    }
                } else if (error.request) {
                    errorMessage = 'Network Error: No response received from the server.';
                } else {
                    errorMessage = `Error: ${error.message}`;
                }
            }
            
            throw new Error(errorMessage);

        }
    // }
    // return await apiCallWithTokenRefresh(apiCall);
}

export const verifyClinicStatus = async (clinicId: number): Promise<IClinicModel | null> => {
    const apiCall = async() => {
        const configuration: AxiosRequestConfig = {
            method: 'PUT',
            baseURL: connection_path.base_url,
            url: `${connection_path.admin.verify_clinic}/${clinicId}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            }
        };

        const response_data: IClinicModel | null = await axios(configuration)
        .then((res: AxiosResponse<IAPIResponseModel<IClinicModel>>) => {
            return res.data.content;
        })
        .catch((error: unknown) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                    throw new Error('Possible expired token');
            }

            return null;
        });

        return response_data;
    }

    return await apiCallWithTokenRefresh(apiCall) as IClinicModel | null;
};

export const getAllClinicInfo = async (name: string | null, page: number | null, page_size: number | null, status: "verified" | "unverified" | null = null): Promise<IClinicModel[]> => {
    const APICall = async () => {
        const request_config: AxiosRequestConfig = {
            baseURL: connection_path.base_url,
            params: {},
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            }
        }

        if (name)
        {
            request_config.params.name = name;
        }

        if (page_size)
        {
            request_config.params.pageSize = page_size;
        }

        if (page)
        {
            request_config.params.page = page;
        }

        if (status == 'verified') {
            request_config.url = connection_path.admin.get_verified_clinic;
        }
        else if (status == 'unverified') {
            request_config.url = connection_path.admin.get_unverified_clinic;
        }
        else {
            request_config.url = connection_path.admin.get_clinics;
        }

        const return_data: IClinicModel[] = await axios(request_config)
        .then((res: AxiosResponse<IAPIResponseModel<IClinicModel[] | null>>) => 
            {
                const data: IClinicModel[] = res.data.content!;
                return data;
            }
        )
        .catch( (error: unknown) =>
        {
            if (error instanceof AxiosError && error.response?.status === 401)
            {
                throw Error('Possible expired token');
            }

            console.log(error);

            const data: IClinicModel[] = [];

            return data;  
        });
        
        return return_data;
    }

    return await apiCallWithTokenRefresh(APICall) as IClinicModel[];
}

export const getAllCustomerInfo = async (name: string | null = '', page: number | null, page_size: number | null): Promise<ICustomerModel[] | null> => {
    const APICall = async () => {
        const request_config: AxiosRequestConfig = {
            baseURL: connection_path.base_url,
            url: connection_path.admin.get_customer,
            params: {},
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            }
        }

        request_config.params.name = name;

        if (page_size)
        {
            request_config.params.pageSize = page_size;
        }

        if (page)
        {
            request_config.params.page = page;
        }

        const return_data: ICustomerModel[] = await axios(request_config)
        .then((res: AxiosResponse<IAPIResponseModel<ICustomerModel[] | null>>) => 
            {
                const data: ICustomerModel[] = res.data.content!;
                return data;
            }
        )
        .catch( (error: unknown) =>
        {
            if (error instanceof AxiosError && error.response?.status == 401)
            {
                throw new Error('Possible Expired Token');
            }

            const data: ICustomerModel[] = [];
            return data;  
        });

        return return_data;
    }

    return await apiCallWithTokenRefresh(APICall) as ICustomerModel[] | null;
}

export const getAllDentistInfo = async (name: string | null, page: number | null, page_size: number | null): Promise<IDentistModel[] | null> => {
    const APICall = async () => {
        const request_config: AxiosRequestConfig = {
            baseURL: connection_path.base_url,
            url: connection_path.admin.get_dentists,
            params: {
                name: name
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            }
        }

        request_config.params.name = name;


        if (page_size)
        {
            request_config.params.pageSize = page_size;
        }

        if (page)
        {
            request_config.params.page = page;
        }

        const return_data: IDentistModel[] = await axios(request_config)
        .then((res: AxiosResponse<IAPIResponseModel<IDentistModel[] | null>>) => 
            {
                const data: IDentistModel[] = res.data.content!;
                return data;
            }
        )
        .catch( (error: unknown) =>
        {
            if (error instanceof AxiosError && error.response?.status == 401)
            {
                throw new Error('Possible Expired Token');
            }

            const data: IDentistModel[] = [];
            return data;  
        });

        return return_data;
    }

    return await apiCallWithTokenRefresh(APICall) as IDentistModel[] | null;
}

export const getAllUserInfo = async(name: string | null, page: number | null, page_size: number | null): Promise<IUserInfoModel[] | null> => {
    const APICall = async () => {
        const request_config: AxiosRequestConfig = {
            baseURL: connection_path.base_url,
            url: connection_path.admin.get_users,
            params: {},
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            }
        }

        if (name)
        {
            request_config.params.name = name;
        }

        if (page_size)
        {
            request_config.params.pageSize = page_size;
        }

        if (page)
        {
            request_config.params.page = page;
        }

        const return_data: IUserInfoModel[] = await axios(request_config)
        .then((res: AxiosResponse<IAPIResponseModel<IDentistModel[] | null>>) => 
            {
                const data: IUserInfoModel[] = res.data.content!;
                return data;
            }
        )
        .catch( (error: unknown) =>
        {
            if (error instanceof AxiosError && error.response?.status == 401)
            {
                throw new Error('Possible Expired Token');
            }

            const data: IUserInfoModel[] = [];
            return data;  
        });

        return return_data;
    }

    return await apiCallWithTokenRefresh(APICall) as IUserInfoModel[] | null;
}

