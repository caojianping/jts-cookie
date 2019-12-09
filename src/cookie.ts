import CONSTANTS from "./constants";
import {CookieOption} from "./interfaces";

export default class Cookie {
	/**
	 * 设置过期时间
	 * @param expires 过期时间，单位：毫秒
	 * @private
	 */
	private static _setExpires(expires: number = CONSTANTS.TWO_HOURS): string {
		let date = new Date();
		date.setTime(date.getTime() + expires);
		return `expires=${date.toUTCString()}`;
	}

	/**
	 * 设置路径
	 * @param path 路径：默认/
	 * @private
	 */
	private static _setPath(path: string = "/"): string {
		return `path=${path}`;
	}


	/**
	 * 设置单个cookie
	 * @param key
	 * @param value
	 * @param expires
	 * @param path
	 */
	public static setItem<T = object>(key: string, value: T, expires?: number, path?: string): boolean {
		if (!key) return false;
		if (value === undefined || value === null) return false;

		try {
			document.cookie = (function (value: string) {
				return `${key}=${value}; ${Cookie._setExpires(expires)}; ${Cookie._setPath(path)}`;
			})(JSON.stringify(value));
			return true;
		} catch (ex) {
			throw `Cookie's setItem error: ${JSON.stringify(ex)}!`;
		}
	}

	/**
	 * 设置多个cookie
	 * @param options
	 */
	public static setItems(options: Array<CookieOption>): boolean {
		options.forEach((option: CookieOption) => {
			Cookie.setItem(option.key, option.value, option.expires, option.path);
		});
		return true;
	}

	/**
	 * 获取cookie所有的key集合
	 */
	public static getAllKeys(): Array<string> {
		let parts = document.cookie.split(";");
		if (parts.length <= 0) return [];

		let result: Array<string> = [];
		for (let i = 0; i < parts.length; i++) {
			let part = (parts[i] || "").trim();
			result.push(part.substring(0, part.indexOf("=")));
		}
		return result;
	}

	/**
	 * 获取cookie
	 * @param key
	 */
	public static getItem<T = object>(key: string): T | null {
		if (!key) return null;

		key = `${key}=`;
		let parts = document.cookie.split(";");
		if (parts.length <= 0) return null;

		let value: any = "";
		for (let i = 0; i < parts.length; i++) {
			let part = (parts[i] || "").trim();
			if (part.indexOf(key) === 0) {
				value = part.substring(key.length, part.length);
				break;
			}
		}

		try {
			if (!value) return null;
			return <T>JSON.parse(value);
		} catch (ex) {
			throw "Cookie deserialization failed!";
		}
	}

	/**
	 * 移除cookie
	 * @param key
	 */
	public static removeItem(key: string): boolean {
		if (!key) return false;
		this.setItem<string>(key, "", -1);
		return true;
	}

	/**
	 * 清除所有cookie
	 */
	public static clear(): void {
		let keys = Cookie.getAllKeys();
		keys.forEach(function (key: string) {
			Cookie.removeItem(key);
		});
	}
}