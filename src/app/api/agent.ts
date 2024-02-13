import axios, {AxiosError, AxiosResponse} from "axios";
import { toast } from 'react-toastify';
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const defaultBaseUrl =
    'http://localhost:5248/server'
const responseBody = <T>(response: AxiosResponse<T>) => response.data;


const createAxiosInstance = (baseUrl: string) => {
    const instance = axios.create({
        baseURL: baseUrl,
    });

    instance.interceptors.response.use(
        async (response) => response,
        ({response, message}: AxiosError) => {
            let errorMessage = '';
            if (message === 'Network Error') {
                errorMessage = message;
            }
            switch (response?.status) {
                case StatusCodes.INTERNAL_SERVER_ERROR:
                    errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR;
                    break;
                case StatusCodes.NOT_FOUND:
                    errorMessage = ReasonPhrases.NOT_FOUND;
                    break;
                case StatusCodes.BAD_REQUEST:
                    errorMessage = ReasonPhrases.BAD_REQUEST;
                    break;
                case StatusCodes.FORBIDDEN:
                    errorMessage = ReasonPhrases.FORBIDDEN;
                    break;
                default:
                    break;
            }
            if (errorMessage !== '' && process.env.NODE_ENV === 'development') {
                toast.error(errorMessage);
            }

            return Promise.reject(message);
        },
    );

    return {
        get: async <T>(url: string) => instance.get<T>(url)
            .then(responseBody),

        post: async <T>(url: string, body: object) => instance.post<T>(url, body)
            .then(responseBody),

        put: async <T>(url: string, body: object) => instance.put<T>(url, body)
            .then(responseBody),

        delete: async <T>(url: string) => instance.delete<T>(url)
            .then(responseBody),
    };
};


const Agent = createAxiosInstance(defaultBaseUrl);

export default Agent;