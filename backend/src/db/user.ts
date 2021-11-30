import {Group, User} from '../../types/sso/interfaces';
import {Response} from 'express';
import {defaultInsertCallback, defaultUpdateCallback, getFirstResult, insertData, updateData} from './dbAccessor';

export async function addOrUpdateUserInDb(user: User, res: Response): Promise<void> {
    const userExists = await isUserInDb(user.uuid, res);
    if (userExists) {
        // update
        const sql = 'UPDATE nutzer SET klasse = ?, vorname = ?, nachname = ? WHERE iServUuid = ?';
        updateData(sql, [await getClassFromGroups(user.groups), user.given_name, user.family_name, user.uuid], defaultUpdateCallback(res));
    } else {
        // add
        const sql = 'INSERT INTO nutzer (klasse, vorname, nachname, iServUuid) VALUES (?,?,?,?)';
        insertData(sql, [await getClassFromGroups(user.groups), user.given_name, user.family_name, user.uuid], defaultInsertCallback(res));
    }
}

async function isUserInDb(uuid: string, res: Response): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        const sql = 'SELECT id FROM nutzer WHERE iServUuid = ?';
        getFirstResult(sql, [uuid], (obj, err) => {
            if (err) {
                res.status(500).json(err.message);
            } else {
                if (!obj) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        });
    });
}

async function getClassFromGroups(groups: Group[]): Promise<string> {
    return new Promise<string>(resolve => {
        groups.forEach(group => {
            const name = group.name;
            if (name.startsWith('klasse')) {
                resolve(name.split('-')[1]);
            }
        });

        resolve('');
    });
}