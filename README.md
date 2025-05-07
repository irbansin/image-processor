# Image Processor Backend

This is the backend for the Image Processor project. It provides RESTful APIs for image upload, processing, storage in AWS S3, and metadata management using a PostgreSQL database via Prisma ORM.

## Features
- Upload multiple images (HEIC, HEIF, PNG, JPEG, JPG)
- Image validation and conversion using Sharp
- Stores image metadata (filename, URL, status, createdAt) in PostgreSQL
- AWS S3 integration for image storage
- Prisma ORM for database management
- CORS-enabled for frontend integration

## Requirements
- Node.js (v16+ recommended)
- PostgreSQL (local or remote)
- AWS S3 bucket & credentials

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/irbansin/image-processor
   cd image-processor
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**  
   Copy `.env.example` to `.env` and fill in your values:
   ```env
   PORT=3001
   DATABASE_URL=postgresql://user:password@localhost:5432/aragon_image_processor
   S3_BUCKET=your-bucket-name
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=your-region
   ```
4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```
5. **Start the server**
   ```bash
   npm run dev
   ```
   The server should start on `http://localhost:3001` by default.

## API Endpoints

### POST `/api/images/upload`
- **Description:** Upload multiple images (field: `images`)
- **Request:** `multipart/form-data`
- **Response:** JSON array with status for each file

### GET `/api/images/all`
- **Description:** Retrieve all image metadata stored in the database
- **Response:** JSON array of image records

## Database
- Uses Prisma ORM
- Image model fields: `id`, `filename`, `url`, `status`, `createdAt`

## Development
- Run `npx prisma studio` to visually inspect your database
- Logs and errors are output to the console

## Troubleshooting
- **No metadata in DB?** Ensure `status` is provided in `prisma.image.create` and migrations are up to date.
- **CORS issues?** CORS is enabled for all origins, but check frontend/backend port alignment.
- **AWS errors?** Check your S3 credentials and bucket permissions.

## Notes
- The backend is designed to work with the Next.js frontend in the `/frontend` directory.
- For production, secure your API endpoints and environment variables.

---

For further help, open an issue or contact the maintainer.
