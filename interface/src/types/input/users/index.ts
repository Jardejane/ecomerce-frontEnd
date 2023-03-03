export interface IUser {
	username: string;
	email?: string;
	password: string;
	roles?: string[];
}

export interface IUserApi {
	_id: string;
	username: string;
	email: string;
	password: string;
	roles: string[];
	__v: number;
}
