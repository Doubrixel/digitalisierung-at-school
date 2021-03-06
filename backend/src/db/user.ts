import {Group, User} from '../../types/sso';
import {getFirstResult, insertData, updateData} from './dbAccessor';

export async function addOrUpdateUserInDb(user: User): Promise<void> {
    const userExists = await isUserInDb(user.uuid);
    if (userExists) {
        // update
        const sql = 'UPDATE nutzer SET klasse = ?, vorname = ?, nachname = ?, name = ? WHERE iServUuid = ?';
        updateData(sql, [await getClassFromGroups(user.groups), user.given_name, user.family_name, user.name, user.uuid], (changedRowCount, err) => {
            if (err) console.error(err.message);
            if (changedRowCount == 0) console.error('User not found');
        });
    } else {
        // add
        const sql = 'INSERT INTO nutzer (klasse, vorname, nachname, iServUuid, name) VALUES (?,?,?,?,?)';
        insertData(sql, [await getClassFromGroups(user.groups), user.given_name, user.family_name, user.uuid, user.name], (id ,err) => {
            if (err) console.error(err.message);
        });
    }
}

async function isUserInDb(uuid: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        const sql = 'SELECT id FROM nutzer WHERE iServUuid = ?';
        getFirstResult(sql, [uuid], (obj, err) => {
            if (err) {
                console.error(err.message);
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

async function getClassFromGroups(groups: Group[]|Group): Promise<string> {
    const groupArray = await transformGroupToArray(groups);
    return new Promise<string>(resolve => {
        groupArray.forEach(group => {
            const name = group.name;
            if (name.startsWith('klasse')) {
                resolve(name.split('-')[1]);
            }
        });
        resolve('');
    });
}

export async function transformGroupToArray(groups: Group[]|Group): Promise<Group[]> {
    return new Promise<Group[]>(resolve => {
        if (!Array.isArray(groups)) {
            groups = Object.values(groups);
        }
        resolve(groups);
    });
}