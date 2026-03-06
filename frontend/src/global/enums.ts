export const E_QueryKeys = {
    USER_INFO: "user-info",
} as const;
export type E_QueryKeys = (typeof E_QueryKeys)[keyof typeof E_QueryKeys];
