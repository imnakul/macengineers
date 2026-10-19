# MAC Engineers website

The public marketing and enquiry website for MAC Engineers (Mac Engineers India), an industrial equipment manufacturer and engineering services company based in Ankleshwar, Gujarat. It helps process-industry teams understand the company's equipment and services, then contact the team or request a quote or engineering proposal.

The public site is [macengineers.in](https://macengineers.in/). The project is a website frontend; product, service, blog, client and job content is maintained in the repository rather than through a CMS.

## Project at a glance

- **Framework:** Next.js 16.3.2 App Router, React 19, TypeScript 5, Tailwind CSS 4.
- **Package manager:** npm; use the committed `package-lock.json`.
- **Image delivery:** Cloudinary through the custom loader in `src/lib/image-loader.ts`.
- **Enquiry delivery:** Resend from server-side route handlers.
- **Site monitoring:** Vercel Analytics and Speed Insights packages are integrated.
- **Hosting:** the repository does not declare a deployment provider. Confirm the current production host in its deployment account; the analytics packages alone do not identify it.

The visual system is called **Corporate Atlas** in the source: industrial editorial typography, navy and slate, fine rules, and equipment imagery. The selected homepage design in this repository is implemented in `src/variants/variant5`; it is not a variant selector.

## Run the site locally

Use Node.js 20.9 or newer, as required by the installed Next.js version.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a local `.env.local` file and set the values described below. The file is ignored by Git.

| Variable | Required for | Notes |
|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | Site images | The Cloudinary cloud name. It is included in delivered image URLs, so it is not a secret. |
| `RESEND_API_KEY` | Sending website enquiries | Keep this server-side; never expose or commit the key. |
| `CONTACT_FROM_EMAIL` | Sending website enquiries | Must be an address on a domain verified in Resend. |
| `CONTACT_TO_EMAIL` | Optional recipient override | If omitted, the recipient falls back to the inbox configured in `src/data/site.ts`. |

The mail variables are listed in `.env.example`. Cloudinary's cloud name is read by `next.config.ts`; add it to your local environment. Without it, Cloudinary images cannot load. If the Resend settings are missing, the forms still validate submissions and return a clear message that email delivery is not connected.

Useful commands:

| Task | Command |
|---|---|
| Development server | `npm run dev` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |
| Production build | `npm run build` |
| Run a production build locally | `npm run start` |

There is currently no `test` script in `package.json`.

## Pages and requests

| URL | Purpose |
|---|---|
| `/` | Homepage: equipment, services, industries, delivery process and client logos. |
| `/about-us` | Company story, capabilities and quality information. |
| `/product` | Equipment catalogue and product details. |
| `/service` | Engineering, fabrication and installation services. |
| `/blog` | Blog index. |
| `/{slug}` | Blog articles defined in `src/data/blog-posts.ts`; article URLs are at the site root. |
| `/job-openings` | Current job listings. |
| `/jobs/{slug}` | Individual job details. |
| `/contact-us` | Contact information and enquiry form. |
| `/get-a-quote` | Quote request form. |

The contact, quote and homepage engineering-proposal forms submit to `POST /api/contact`, `POST /api/quote` and `POST /api/rfq`. Each route validates its input on the server and sends mail through Resend. The quote form can include a drawing attachment.

The public form routes still have a TODO for shared rate limiting. Check those route handlers before expanding public submission features or traffic.

## Where to make changes

| Change | Source of truth |
|---|---|
| Company facts, navigation, contact details and shared site text | `src/data/site.ts` |
| Product page content | `src/data/products.ts` |
| Homepage equipment showcase | `src/variants/data/variantsData.ts` |
| Service page content | `src/data/services.ts` |
| Blog index and article content | `src/data/blog.ts`, `src/data/blog-posts.ts` |
| Job listings | `src/data/jobs.ts` |
| Client logo names, order and display sizing | `src/data/clients.ts` |
| Homepage layout | `src/variants/variant5/Variant5Page.tsx` |
| Shared page shell and navigation | `src/components/atlas` and `src/app/(atlas)/layout.tsx` |
| SEO metadata, structured data and image delivery | `src/lib` |

The `(atlas)` directory is a Next.js route group; its name does not appear in public URLs. The route files under it share the Atlas header and footer. Blog article slugs are public URLs, so check existing entries before changing a slug or adding a page at the same path.

Several company and product content files note that their text came from MAC Engineers' public materials, and some record when that source was captured. Re-check company facts, specifications, contact details and claims with MAC Engineers before publishing updates.

## Images and Cloudinary

The application refers to images with logical paths such as `/images/hero/filename.jpg`, `/images/product/filename.png` and `/images/clients/filename.webp`. The custom loader uses the **basename, including its extension**, as the Cloudinary public ID; the directory in the source path is for organization and is not part of that ID.

Keep the Cloudinary Media Library organized under `website-images/hero`, `website-images/product` and `website-images/clients`, and preserve each referenced filename exactly when replacing or uploading an image. Because the loader does not include the folder in the public ID, avoid reusing the same filename for different images in separate folders.

The loader applies responsive width and automatic format/quality transformations. Change an image by updating the corresponding TypeScript data entry and uploading the matching Cloudinary asset. Local brand marks and app icons live under `public/brand` and `src/app`. Original render sources and helper scripts are kept in `assets/renders-source`.

## Project structure

- `src/app`: route entry points, layouts, metadata, sitemap and API handlers.
- `src/components`: shared Atlas pages, forms, SEO and interface components.
- `src/data`: company, product, service, blog, job and client content.
- `src/variants/variant5`: current homepage composition and its visual parts.
- `src/lib`: image loader, email handling, validation, metadata and structured data.
- `assets/renders-source`: source artwork and scripts used to prepare equipment and factory imagery.
- `public`: local public assets such as the brand mark and icons.

## Git and maintenance notes

The working promotion flow is to commit and push changes to `dev`, then fast-forward `master` from `dev` when `master` is an ancestor. If the branches have diverged or the fast-forward cannot be made cleanly, stop and review the history before promoting; do not force-push.

The root `AGENTS.md` contains a Next.js 16 instruction block generated by `next dev`. Keep that block. Before changing framework APIs, read the matching guide shipped with the installed package under `node_modules/next/dist/docs/`; this project's Next.js version has breaking changes from older conventions.
