import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServiceRequest {
    id: bigint;
    serviceName: string;
    name: string;
    address: string;
    timestamp: Time;
    problemDescription: string;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllServiceRequests(): Promise<Array<ServiceRequest>>;
    submitServiceRequest(serviceName: string, name: string, phone: string, address: string, problemDescription: string): Promise<void>;
}
