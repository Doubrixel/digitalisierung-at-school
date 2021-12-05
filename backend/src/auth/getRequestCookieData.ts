import {createUser} from './sso';
import {Request, Response} from 'express';
import {getFirstResult} from '../db/dbAccessor';

const getStudentId = async function (req : Request, res : Response): Promise<number> {
    try {
        if (process.env.NODE_ENV === 'development')
        {
            // Im development mode, daher muss SSO gemockt werden
            return 1;
        }
        const user = await createUser(req.session?.user);
        return new Promise<number>(resolve => {
            const sql = 'SELECT id FROM nutzer WHERE iServUuid = ?';
            getFirstResult(sql, [user.uuid], (obj, err) => {
                if (err) {
                    res.status(500).json(err.message);
                    resolve(-1);
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
        res.status(500).json('Fehler bei Ermitteln der studentID');
        return -1;
    }
};

export {getStudentId};
