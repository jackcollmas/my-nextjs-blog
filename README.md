# Minimalist Blog

A clean, black and white themed blog built with Next.js 16, MongoDB, and NextAuth.

## Features

- User authentication (register/login)
- Create and read blog posts
- Black and white minimalist design
- Server-side rendering for SEO
- API routes and Server Actions
- Protected routes with middleware

## Tech Stack

- **Framework:** Next.js 16.4.3
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS + CSS Modules
- **Icons:** Lucide React

## Project Structure

```
myblog/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth configuration
│   │   ├── posts/               # Posts CRUD endpoints
│   │   └── register/            # User registration
│   ├── actions/                 # Server Actions
│   ├── blog/                    # Blog pages
│   │   ├── [slug]/              # Individual post
│   │   └── page.js              # Blog list
│   ├── login/                   # Login page
│   ├── register/                # Register page
│   └── layout.js                # Root layout
├── components/
│   ├── ConfirmModal.js          # Custom confirmation dialog
│   ├── Header.js                # Navigation header
│   ├── SessionProvider.js       # Auth session wrapper
│   └── Toast.js                 # Custom toast notifications
├── lib/
│   └── mongodb.js               # MongoDB connection
├── models/
│   ├── Post.js                  # Post schema
│   └── User.js                  # User schema
└── middleware.js                # Route protection
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd myblog
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your values:
   - Generate a secret: `openssl rand -base64 32`
   - Update MongoDB URI if different

5. Start MongoDB (if not running):
```bash
mongod
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for required environment variables.

## API Routes

### Authentication
- `POST /api/register` - Register new user
- `POST /api/auth/signin` - Login (NextAuth)
- `POST /api/auth/signout` - Logout (NextAuth)

### Posts
- `GET /api/posts` - Get all published posts
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (protected)
- `DELETE /api/posts/[id]` - Delete post (protected)

## Server Actions

Located in `app/actions/posts.js`:
- `createPost(formData)` - Create new post
- `updatePost(id, formData)` - Update existing post
- `deletePost(id)` - Delete post

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Post Model
```javascript
{
  title: String,
  content: String,
  slug: String (unique),
  author: ObjectId (ref: User),
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Protected Routes

The following routes require authentication (via middleware):
- `/dashboard/*`
- `/create-post/*`

## Development

### Adding New Pages

1. Create folder in `app/` directory
2. Add `page.js` file
3. Export default component

### Adding CSS Modules

1. Create `[name].module.css` file
2. Import in component: `import styles from './[name].module.css'`
3. Use: `className={styles.className}`

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Update `MONGODB_URI` to use MongoDB Atlas
5. Deploy

## License

MIT

## Author

Your Name
