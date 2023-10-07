## Install

First, install the dependencies.

```bash
npm i
```

On the root, create a `.env.local`:

```env
JWT_SECRET=
MONGO_URI=
```

Install mongoDB, then feed it with:

```bash
npm run generate-students
```

Then, run the development server:

```bash
npm run dev
```

Have fun! Work in progress.
