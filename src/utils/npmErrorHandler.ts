import { ErrorRequestHandler } from 'express';

export const handlerNPMError: ErrorRequestHandler = (err, _req, res, next): void => {
    //mysql error
    if (err.sqlState && err.sqlMessage && err.sql) {
        res.status(401).json({
            message: err.sqlMessage,
            status: 'false'
        });
        return;
    } else {
        next(err);
    }
};
