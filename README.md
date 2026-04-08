# MoviesVennie

Ứng dụng xem phim xây dựng bằng React 19 + TypeScript + Vite.

Project hỗ trợ:

- xem danh sách phim theo nhiều nhóm (Popular, Now Playing, Upcoming, Top Rated)
- tìm kiếm phim theo từ khóa
- xem trang chi tiết phim (trailer, review, similar movies)
- quản lý danh sách yêu thích bằng localStorage
- giao diện responsive cho desktop và mobile

## Công Nghệ Sử Dụng

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Ant Design
- Swiper
- React Player
- Lucide Icons

## Cấu Trúc Chính

```text
src/
├─ components/
├─ context/
├─ hooks/
├─ pages/
├─ routes/
├─ services/
├─ types/
├─ App.tsx
├─ main.tsx
└─ index.css
```

Tài liệu chi tiết đầy đủ thư mục và luồng dữ liệu nằm trong file `GUIDE.md`.

## Yêu Cầu

- Node.js 18+
- pnpm

## Cài Đặt

```bash
pnpm install
```

## Chạy Ở Môi Trường Development

```bash
pnpm dev
```

## Build Production

```bash
pnpm run build
```

## Preview Bản Build

```bash
pnpm run preview
```

## Lint

```bash
pnpm run lint
```

## Biến Môi Trường

Tạo file `.env` ở root project:

```env
VITE_API_KEY=your_tmdb_bearer_token
VITE_IMG_URL=https://image.tmdb.org/t/p/w500
```

Ghi chú:

- `VITE_API_KEY` là bắt buộc để gọi TMDB API.
- Không commit token thật lên public repository.

## Deploy Vercel

Project đã có `vercel.json` để cấu hình Vercel cho Vite SPA.

Checklist deploy:

1. Root Directory đúng là thư mục `react-v19-vite`.
2. `pnpm-lock.yaml` phải đồng bộ với `package.json`.
3. Đã cấu hình `VITE_API_KEY` trong Project Settings của Vercel.

## Scripts

- `pnpm dev`: chạy local server
- `pnpm run build`: build production
- `pnpm run preview`: chạy thử bản build
- `pnpm run lint`: kiểm tra lint

## Gợi Ý Đọc Code Cho Người Mới

1. `src/main.tsx`
2. `src/App.tsx`
3. `src/routes/AppRoutes.tsx`
4. `src/pages/Home.tsx`
5. `src/services/MoviesService.ts`
6. `src/context/FavoritesContext.tsx`
