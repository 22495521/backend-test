interface CustomResponse {
    status: string;
    data?: any;
    message?: string;
}

export const successResponse = ({ data, message }: { data?: any; message?: string }) => {
    const result: CustomResponse = { status: 'success' };
    if (data) result.data = data;
    if (message) result.message = message;
    return result;
};
