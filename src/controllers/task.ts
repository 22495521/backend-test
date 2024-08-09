import { Task } from '@/types/task';
import { RequestHandler } from 'express';
import { handleErrorAsync, errorResponse } from '@/utils/errorHandler';
import { successResponse } from '@/utils/successHandler';
import { pool } from '@/app/connection';
import dayjs from 'dayjs';

export const getTask: RequestHandler = handleErrorAsync(async (req, res, _next) => {
    const { creator } = req.query;
    let sql = '';
    let params = [];

    if (creator) {
        sql = `SELECT * FROM Tasks WHERE creator = ?`;
        params.push(creator);
    } else {
        sql = `SELECT * FROM Tasks`;
    }

    const [result] = await pool.query(sql, params);
    res.status(200).json(
        successResponse({
            message: '查詢成功',
            data: result
        })
    );
});

export const addTask: RequestHandler = handleErrorAsync(async (req, res, _next) => {
    const { name, content, remarks, location, creator } = req.body;

    const now = dayjs();
    const currentDate = now.format('YYYY-MM-DD');
    const currentTime = now.format('HH:mm:ss');

    const sql =
        'INSERT INTO Tasks (name, content, remarks, taskTime, taskDate, location, creator) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const params = [name, content, remarks, currentTime, currentDate, location, creator];

    await pool.query(sql, params);

    res.status(200).json(
        successResponse({
            message: '新增成功'
        })
    );
});

export const deleteTask: RequestHandler = handleErrorAsync(async (req, res, next) => {
    const { id } = req.query;

    if (!id) {
        next(errorResponse(400, 'id格式錯誤'));
        return;
    }

    //first find this id is exist
    const [results] = await pool.query(`select *  FROM Tasks where id = ?`, [id]);
    const data = results as unknown as Task[];

    if (data.length === 0) {
        next(errorResponse(404, '該筆id不存在'));
        return;
    }

    //delete this id data
    await pool.query(`delete  FROM Tasks where id = ?`, [id]);

    res.status(200).json(
        successResponse({
            message: '刪除成功'
        })
    );
});

export const editTask: RequestHandler = handleErrorAsync(async (req, res, next) => {
    const { id, name, remarks, content, location, creator, taskDate, taskTime } = req.body;

    const requiredFields = ['id', 'name', 'remarks', 'content', 'location', 'creator', 'taskDate', 'taskTime'];
    const missingFields = requiredFields.filter(field => req.body[field] === undefined);

    if (missingFields.length > 0) {
        next(errorResponse(400, `缺少必要參數: ${missingFields.join(', ')}`));
        return;
    }

    //check id is exist
    const [results] = await pool.query(`select *  FROM Tasks where id = ?`, [id]);
    const data = results as unknown as Task[];

    if (data.length === 0) {
        next(errorResponse(404, '該筆id不存在'));
        return;
    }

    //update task
    const sql = `UPDATE Tasks SET name = ?, remarks = ?, content = ?, location = ?, creator = ?, taskDate = ?, taskTime = ?   WHERE id = ?`;
    const params = [name, remarks, content, location, creator, taskDate, taskTime, id];
    await pool.query(sql, params);

    res.status(200).json(
        successResponse({
            message: '更新成功'
        })
    );
});
