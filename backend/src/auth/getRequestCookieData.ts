import {createUser} from './sso';
import {Request, Response} from 'express';
import {getFirstResult} from '../db/dbAccessor';

const getStudentId = async function (req : Request, res : Response): Promise<number> {
    try {
        const user = await createUser(req.session?.user);
        return new Promise<number>(resolve => {
            const sql = 'SELECT id FROM nutzer WHERE iServUuid = ?';
            getFirstResult(sql, [user.uuid], (obj, err) => {
                if (err) {
                    res.status(500).json(err.message);
                } else {
                    if (!obj) res.status(500).json('Nutzer nicht bekannt');
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    else { // @ts-ignore
                        resolve(obj.id);
                    }
                }
            });
        });
    } catch (e) {
        return 1;
    }
};

export {getStudentId};