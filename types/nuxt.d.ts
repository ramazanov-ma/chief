interface PageMeta {
	middleware?: string | string[]
	layout?: string | false
	[key: string]: any
}

declare module '#app' {
	interface PageMeta {
		middleware?: string | string[] | MiddlewareHandler | MiddlewareHandler[]
		layout?: string | false
		[key: string]: any
	}
}

declare function definePageMeta(meta: PageMeta): void;

export {}
