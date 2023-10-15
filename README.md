## Install

First, install the dependencies.

```bash
npm i
```

On the root, create a `.env.local`:

```env
JWT_SECRET=
MONGO_URI=
BCRYPT_SALT=
```

Install mongoDB, then feed it with:

```bash
npm run generate-db-data
```

Then, run the development server:

```bash
npm run dev
```

You can find all logins at /api/showLogins, and all passwords are "asd" for the sake of testing.

Have fun! Work in progress.
