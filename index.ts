import { AxiosInstance } from "axios";

export class SwaggerApi {
    axiosInstance: AxiosInstance;
    options: Record<string, any>;

    constructor(axiosInstance: AxiosInstance, options: Record<string, any>) {
        this.axiosInstance = axiosInstance;
        this.options = options;
    }

    _request(options: Record<string, any>): Promise<any> {
        options.url = options.url.replace(/{(w+)}/g, (match, p1) => options.path?.[p1])
        delete options.path;
        return this.axiosInstance.request({...options, ...this.options});
    }
}
