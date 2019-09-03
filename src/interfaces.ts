/**
 * Cookie选项接口
 */
export default interface CookieOption {
    key: string;
    value: any;
    expires?: number;
    path?: string;
}