declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"404.md": {
	id: "404.md";
  slug: "404";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"account/getBalance.mdx": {
	id: "account/getBalance.mdx";
  slug: "account/getbalance";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/first.md": {
	id: "blog/first.md";
  slug: "blog/first";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/Awswaf.mdx": {
	id: "guides/ImageTasks/Awswaf.mdx";
  slug: "guides/imagetasks/awswaf";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"guides/ImageTasks/BLS.mdx": {
	id: "guides/ImageTasks/BLS.mdx";
  slug: "guides/imagetasks/bls";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"guides/ImageTasks/Capy.md": {
	id: "guides/ImageTasks/Capy.md";
  slug: "guides/imagetasks/capy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/Cloudflare.md": {
	id: "guides/ImageTasks/Cloudflare.md";
  slug: "guides/imagetasks/cloudflare";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/CyberSierra.md": {
	id: "guides/ImageTasks/CyberSierra.md";
  slug: "guides/imagetasks/cybersierra";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/FriendlyCaptcha.md": {
	id: "guides/ImageTasks/FriendlyCaptcha.md";
  slug: "guides/imagetasks/friendlycaptcha";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/GeeTest4.md": {
	id: "guides/ImageTasks/GeeTest4.md";
  slug: "guides/imagetasks/geetest4";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/ImageToText.mdx": {
	id: "guides/ImageTasks/ImageToText.mdx";
  slug: "guides/imagetasks/imagetotext";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"guides/ImageTasks/Lemin.md": {
	id: "guides/ImageTasks/Lemin.md";
  slug: "guides/imagetasks/lemin";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/Rotate.md": {
	id: "guides/ImageTasks/Rotate.md";
  slug: "guides/imagetasks/rotate";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/Tencent.md": {
	id: "guides/ImageTasks/Tencent.md";
  slug: "guides/imagetasks/tencent";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/TikTok.md": {
	id: "guides/ImageTasks/TikTok.md";
  slug: "guides/imagetasks/tiktok";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/Turnstile.md": {
	id: "guides/ImageTasks/Turnstile.md";
  slug: "guides/imagetasks/turnstile";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/mtCaptcha.md": {
	id: "guides/ImageTasks/mtCaptcha.md";
  slug: "guides/imagetasks/mtcaptcha";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/ImageTasks/reCaptchaV2.mdx": {
	id: "guides/ImageTasks/reCaptchaV2.mdx";
  slug: "guides/imagetasks/recaptchav2";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"guides/SpeechTasks/AwsWaf.md": {
	id: "guides/SpeechTasks/AwsWaf.md";
  slug: "guides/speechtasks/awswaf";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/SpeechTasks/reCaptchaV2.md": {
	id: "guides/SpeechTasks/reCaptchaV2.md";
  slug: "guides/speechtasks/recaptchav2";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/TokenTasks/awswaf.md": {
	id: "guides/TokenTasks/awswaf.md";
  slug: "guides/tokentasks/awswaf";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/TokenTasks/reCaptchaV2.md": {
	id: "guides/TokenTasks/reCaptchaV2.md";
  slug: "guides/tokentasks/recaptchav2";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/TokenTasks/reCaptchaV3.md": {
	id: "guides/TokenTasks/reCaptchaV3.md";
  slug: "guides/tokentasks/recaptchav3";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/VisionTasks/OBB.md": {
	id: "guides/VisionTasks/OBB.md";
  slug: "guides/visiontasks/obb";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/VisionTasks/ObjectDetection.md": {
	id: "guides/VisionTasks/ObjectDetection.md";
  slug: "guides/visiontasks/objectdetection";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/VisionTasks/Segmentation.md": {
	id: "guides/VisionTasks/Segmentation.md";
  slug: "guides/visiontasks/segmentation";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/VisionTasks/SlideCaptcha.md": {
	id: "guides/VisionTasks/SlideCaptcha.md";
  slug: "guides/visiontasks/slidecaptcha";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/VisionTasks/Temu.md": {
	id: "guides/VisionTasks/Temu.md";
  slug: "guides/visiontasks/temu";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"guides/index.mdx": {
	id: "guides/index.mdx";
  slug: "guides";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"intro/extension.mdx": {
	id: "intro/extension.mdx";
  slug: "intro/extension";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"intro/intro.mdx": {
	id: "intro/intro.mdx";
  slug: "intro/intro";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"intro/task.mdx": {
	id: "intro/task.mdx";
  slug: "intro/task";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"legal/abuse.mdx": {
	id: "legal/abuse.mdx";
  slug: "legal/abuse";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"legal/privacy.mdx": {
	id: "legal/privacy.mdx";
  slug: "legal/privacy";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"legal/terms.mdx": {
	id: "legal/terms.mdx";
  slug: "legal/terms";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"notes/Changelogs.md": {
	id: "notes/Changelogs.md";
  slug: "notes/changelogs";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
