export interface User {
    uuid: string;
    roles: Role[];
    name: string;
    given_name: string;
    family_name: string;
    groups: Group[];
}

export interface Role {
    id: string;
    displayName: string;
}

export interface Group {
    name: string;
}