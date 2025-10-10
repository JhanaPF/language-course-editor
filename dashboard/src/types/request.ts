import { AxiosResponse } from "axios";

export type AxiosCallback = ((res: AxiosResponse<any>) => void) | undefined;
export type AxiosErrCbk = ((res: AxiosResponse<any>) => void) | undefined;
export type Endpoint = string;
export type UnknownObj = { [key: string]: unknown };