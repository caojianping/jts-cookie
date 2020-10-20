/**
 * Cookie选项接口
 */
export interface CookieOption {
    key: string;
    value: any;
    expires?: number;
    path?: string;
}

/**
 * Cookie数据类
 */
export class CookieStore<T> {
    data: T;

    constructor(data: T) {
        this.data = data;
    }
}
