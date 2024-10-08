import { RequestHandler, ErrorRequestHandler } from 'express';
import { handlerNPMError } from '@/utils/npmErrorHandler';

interface CustomError extends Error {
    status: string;
    statusCode: number;
    isOperational: boolean;
}

export const errorResponse = (statusCode: number, message: string) => {
    const error = new Error(message) as CustomError;
    error.status = 'false';
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};

export const handleErrorAsync = function handleErrorAsync(func: RequestHandler): RequestHandler {
    return function (req, res, next) {
        Promise.resolve(func(req, res, next)).catch(function (error) {
            return next(error);
        });
    };
};

export const NpmError: ErrorRequestHandler = handlerNPMError;

export const NotFoundError: RequestHandler = (_req, res) => {
    res.status(404).send({
        status: 'false',
        message: '無此路由資訊'
    });
};

export const catchGlobalError = () => {
    // 初始化，捕捉全域錯誤
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET 未設定!');
    }

    //可以放先Log，先不處理
    process.on('uncaughtException', error => {
        console.error('未捕獲的異常！');
        console.error(error);
        process.exit(1);
    });

    //可以放先Log，先不處理
    process.on('unhandledRejection', (reason, promise) => {
        console.error('未捕捉到的 rejection :', promise, '原因：', reason);
    });
};

export const catchCustomError: ErrorRequestHandler = (err: CustomError, _req, res, _next) => {
    // 若已經發送給客戶端就不再發
    if (!res.headersSent) {
        const status = err.statusCode || 500;
        const message = err.message || '重大伺服器錯誤，請聯絡管理員';

        if (process.env.NODE_ENV === 'development') {
            res.status(status).send({
                status: 'false',
                message: message,
                stack: err.stack
            });

            return;
        }

        if (process.env.NODE_ENV === 'production') {
            res.status(status).send({
                status: 'false',
                message: message
            });
            return;
        }
    }
};
