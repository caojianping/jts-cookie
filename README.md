# jts-cookie
Caojianping's cookie library.

## Installing
Using npm:
```bash
$ npm install jts-cookie
```

Using yarn:
```bash
$ yarn add jts-cookie
```

## Example
```ts
import {Cookie, CookieOption, CookieStore} from 'jts-cookie';

// test for Cookie
const key1 = 'cookie_number';
Cookie.setItem<number>(key1, 666888, 3600 * 1000 * 2);// return true/false;
Cookie.getItem<number>(key1);// return 666888/null;
Cookie.removeItem(key1);// return true/false;

const key2 = 'cookie_string';
Cookie.setItem<string>(key2, 'hello world', 3600 * 1000 * 2);// return true/false;
Cookie.getItem<string>(key2);// return hello world/null;
Cookie.removeItem(key2);// return true/false;

Cookie.getAllKeys();// return ['cookie_number', 'cookie_string']
```

## API
```ts
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
```
##### Cookie.setItem<T>(key: string, value: T [, expires: number = 2 hours] [, path: string]): boolean
##### Cookie.setItems(options: Array<CookieOption>): boolean
##### Cookie.getItem<T>(key: string): T | null
##### Cookie.getAllKeys(): Array<string>
##### Cookie.removeItem(key: string): boolean
##### Cookie.clear(): void
