# GUIDE DỰ ÁN MOVIESVENNIE

Tài liệu này mô tả đầy đủ cấu trúc thư mục, cách chạy, kiến trúc, và luồng hoạt động của project `react-v19-vite`.

## 1. Tổng Quan

Project này là một ứng dụng React 19 + TypeScript + Vite, dùng để xem phim từ TMDB, tìm kiếm, xem chi tiết phim, xem trailer, đọc review, và quản lý danh sách yêu thích.

### Công nghệ chính

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Ant Design
- Swiper
- React Player
- Lucide Icons
- TMDB API

### Tính năng chính

- Trang Home với banner và các khối phim nổi bật
- Trang Movies để tìm kiếm và phân trang
- Trang Popular, Now Playing, Upcoming, Top Rated
- Trang chi tiết phim có trailer, review, phim tương tự, và nút yêu thích
- Danh sách phim yêu thích lưu trên trình duyệt
- Giao diện responsive cho desktop và mobile

## 2. Cấu Trúc Thư Mục Gốc

```text
react-v19-vite/
├─ .env
├─ .gitignore
├─ README.md
├─ GUIDE.md
├─ eslint.config.js
├─ index.html
├─ package.json
├─ package-lock.json
├─ pnpm-lock.yaml
├─ postcss.config.cjs
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ tsconfig.tsbuildinfo
├─ vercel.json
├─ vite.config.ts
├─ public/
│  ├─ banner.png
│  └─ vite.svg
├─ src/
└─ dist/            # Thư mục build, được tạo ra sau khi chạy build
```

### Ý nghĩa từng thư mục gốc

- `public/`: chứa file tĩnh, ảnh banner mặc định, favicon hoặc asset không qua xử lý bởi bundler.
- `src/`: mã nguồn chính của ứng dụng.
- `dist/`: thư mục build output, chỉ xuất hiện sau khi chạy `pnpm run build`.
- `node_modules/`: thư viện cài đặt, không nên sửa trực tiếp.

## 3. Cấu Trúc Thư Mục `src/`

```text
src/
├─ App.tsx
├─ index.css
├─ main.tsx
├─ vite-env.d.ts
├─ components/
│  ├─ Banner/
│  │  └─ Banner.tsx
│  ├─ Footer/
│  │  └─ Footer.tsx
│  ├─ MobileNav/
│  │  └─ MobileNav.tsx
│  ├─ MoviesList/
│  │  └─ MoviesList.tsx
│  ├─ Navbar/
│  │  └─ Navbar.tsx
│  ├─ Sidebar/
│  │  └─ Sidebar.tsx
│  └─ common/
│     ├─ MoviesGridSkeleton.tsx
│     └─ PaginationControls.tsx
├─ context/
│  └─ FavoritesContext.tsx
├─ hooks/
│  └─ useFavorites.ts
├─ pages/
│  ├─ Favorite.tsx
│  ├─ Home.tsx
│  ├─ MovieDetails.tsx
│  ├─ Movies.tsx
│  ├─ Nowplaying.tsx
│  └─ Popular.tsx
├─ routes/
│  └─ AppRoutes.tsx
├─ services/
│  ├─ MoviesService.ts
│  └─ tmdbClient.ts
└─ types/
   └─ tmdb/
      ├─ api.ts
      ├─ index.ts
      └─ movie.ts
```

## 4. Giải Thích Từng Phần Trong `src/`

### `App.tsx`

- Là khung ứng dụng chính.
- Gồm sidebar desktop, navbar, vùng render route, nút scroll lên đầu trang.
- Có xử lý ẩn sidebar trên mobile và thêm bottom navigation cho mobile.

### `main.tsx`

- Điểm khởi động của React.
- Bọc app bằng `FavoritesProvider` và `BrowserRouter`.

### `index.css`

- Chứa style toàn cục.
- Định nghĩa font chữ, nền tổng thể, hiệu ứng glass, gradient text, animation, scrollbar tùy biến.

### `vite-env.d.ts`

- Khai báo kiểu cho biến môi trường Vite.

## 5. Components

### `components/Banner/Banner.tsx`

- Banner lớn ở đầu trang Home.
- Hiển thị poster/hero chính, tiêu đề nổi bật, mô tả và nút hành động.

### `components/Footer/Footer.tsx`

- Chân trang của site.
- Hiển thị tên brand, bản quyền, và các icon mạng xã hội.

### `components/Navbar/Navbar.tsx`

- Thanh đầu trang.
- Có ô tìm kiếm, logo brand, và icon người dùng.
- Khi nhập và nhấn Enter hoặc nút search sẽ chuyển sang trang Movies với query.

### `components/Sidebar/Sidebar.tsx`

- Thanh điều hướng dọc cho desktop.
- Dùng `NavLink` để highlight route đang active.

### `components/MobileNav/MobileNav.tsx`

- Thanh điều hướng dưới cùng cho mobile.
- Thay thế trải nghiệm sidebar trên màn nhỏ.
- Có các mục: Home, Now, Hot, Movies, Liked.

### `components/MoviesList/MoviesList.tsx`

- Hiển thị danh sách phim theo dạng carousel.
- Dùng Swiper để cuộn ngang.
- Nhận vào `title`, `data`, `genres`, `singleRow`.

### `components/common/MoviesGridSkeleton.tsx`

- Skeleton loading cho các màn danh sách phim.

### `components/common/PaginationControls.tsx`

- Bộ điều khiển chuyển trang cho các màn có phân trang.

## 6. Pages

### `pages/Home.tsx`

- Trang chủ.
- Tải đồng thời:
  - phim popular
  - now playing
  - upcoming
  - top rated
  - genres
- Sau đó truyền dữ liệu xuống `MoviesList`.

### `pages/Movies.tsx`

- Trang tra cứu phim.
- Nếu có `query` trên URL thì dùng search API.
- Nếu không có `query` thì lấy phim popular.
- Có phân trang bằng `page` trên query string.

### `pages/Popular.tsx`

- Trang phim phổ biến.
- Tải danh sách phim phổ biến theo trang.
- Kèm genres để map thể loại.

### `pages/Nowplaying.tsx`

- Trang phim đang chiếu.
- Cấu trúc tương tự Popular.

### `pages/Favorite.tsx`

- Danh sách phim yêu thích lưu bằng context + localStorage.
- Có xóa từng phim và xóa tất cả.

### `pages/MovieDetails.tsx`

- Trang chi tiết phim.
- Hiển thị:
  - backdrop hero
  - poster
  - điểm vote
  - thể loại
  - mô tả
  - trailer YouTube
  - review
  - phim tương tự
  - nút yêu thích
  - nút share/copy link
- Có hỗ trợ mobile sticky action bar.

## 7. Routes

### `routes/AppRoutes.tsx`

File này khai báo toàn bộ route của ứng dụng.

Các route hiện có:

- `/` → chuyển sang `/home`
- `/home` → trang chủ
- `/nowplaying` → phim đang chiếu
- `/popular` → phim phổ biến
- `/movies` → trang tìm kiếm/phân trang
- `/movie/:id` → trang chi tiết phim
- `/favorites` → phim yêu thích

Route được load lười bằng `lazy()` để giảm kích thước bundle ban đầu.

## 8. Context và Hook

### `context/favoritesContext.ts`

- Chứa kiểu `FavoritesContextValue` và context object `FavoritesContext`.
- Mục tiêu: tách context object khỏi file component để tối ưu Fast Refresh.

### `context/FavoritesContext.tsx`

- Chứa `FavoritesProvider` để quản lý state yêu thích cho toàn app.
- Đọc và ghi danh sách id phim vào localStorage.
- Cung cấp actions:
  - `toggleFavorite`
  - `addFavorite`
  - `removeFavorite`
  - `clearFavorites`
  - `isFavorite`

### `hooks/useFavorites.ts`

- Hook tiện dụng để lấy state và actions từ `FavoritesContext`.

## 9. Services

### `services/tmdbClient.ts`

- Là lớp fetch chung cho TMDB.
- Đọc `VITE_API_KEY` từ biến môi trường.
- Gửi request tới TMDB API bằng Bearer token.
- Trả về `null` nếu thiếu key hoặc request lỗi.

### `services/MoviesService.ts`

- Chứa các hàm gọi API theo chức năng:
  - `getPopularMovies`
  - `searchMovies`
  - `getNowPlayingMovies`
  - `getUpcomingMovies`
  - `getTopRatedMovies`
  - `getGenres`
  - `getMovieDetails`
  - `getSimilarMovies`
  - `getMovieVideos`
  - `getMovieReviews`

## 10. Types

### `types/tmdb/movie.ts`

- Chứa kiểu dữ liệu liên quan đến phim, genre, review, video.

### `types/tmdb/api.ts`

- Chứa kiểu dữ liệu response API như list response, genre list response.

### `types/tmdb/index.ts`

- File gom export để import gọn hơn từ `../types/tmdb`.

## 11. Luồng Dữ Liệu Chính

### Luồng Home

1. `Home.tsx` mount.
2. Gọi nhiều API song song qua `Promise.all()`.
3. Nhận dữ liệu genres + các nhóm phim.
4. Truyền dữ liệu xuống `MoviesList`.

### Luồng Search

1. Người dùng nhập ở `Navbar`.
2. Bấm Enter hoặc nút search.
3. Điều hướng sang `/movies?query=...&page=1`.
4. `Movies.tsx` đọc query từ URL.
5. Nếu có query thì gọi `searchMovies()`.
6. Nếu không có query thì gọi `getPopularMovies()`.

### Luồng Favorite

1. Người dùng bấm yêu thích trong `MovieDetails`.
2. `FavoritesContext` cập nhật state.
3. Danh sách id được lưu vào localStorage.
4. Trang `Favorite.tsx` đọc lại danh sách phim từ API theo id.

## 12. Biến Môi Trường

Project hiện sử dụng các biến môi trường sau:

- `VITE_API_KEY`: TMDB Bearer token.
- `VITE_IMG_URL`: base URL ảnh poster nếu cần dùng ở component.

Gợi ý `.env`:

```env
VITE_API_KEY=your_tmdb_bearer_token
VITE_IMG_URL=https://image.tmdb.org/t/p/w500
```

## 13. Cách Chạy Project

### Cài dependencies

```bash
pnpm install
```

### Chạy development server

```bash
pnpm dev
```

### Build production

```bash
pnpm run build
```

### Preview bản build

```bash
pnpm run preview
```

### Kiểm tra lint

```bash
pnpm run lint
```

## 14. Deploy Lên Vercel

Project đã có `vercel.json` để phù hợp với Vite SPA.

Các thiết lập hiện tại:

- framework: `vite`
- install command: `pnpm install --frozen-lockfile`
- build command: `pnpm run build`
- output directory: `dist`
- rewrite SPA về `index.html`

Nếu deploy, cần đảm bảo:

1. Root Directory đúng là thư mục `react-v19-vite`.
2. `pnpm-lock.yaml` phải khớp với `package.json`.
3. Biến môi trường trên Vercel phải có `VITE_API_KEY`.

## 15. Quy Ước Làm Việc Trong Project

- Component nhỏ nên tách riêng trong `components/`.
- Logic gọi API phải đi qua `services/`.
- Kiểu dữ liệu nên khai báo trong `types/`.
- State dùng chung toàn app nên đặt trong `context/`.
- Không để UI desktop phá mobile.
- Build phải chạy sạch trước khi push.

## 16. Ghi Chú Khi Đọc Code

Nếu mới học project này, nên đọc theo thứ tự:

1. `src/main.tsx`
2. `src/App.tsx`
3. `src/routes/AppRoutes.tsx`
4. `src/pages/Home.tsx`
5. `src/components/Navbar/Navbar.tsx`
6. `src/components/MoviesList/MoviesList.tsx`
7. `src/services/MoviesService.ts`
8. `src/context/favoritesContext.ts`
9. `src/context/FavoritesContext.tsx`

Thứ tự này giúp hiểu:

- app khởi động ra sao
- route nào được render
- dữ liệu được lấy từ đâu
- component nào phụ trách phần nào

## 17. Tóm Tắt Nhanh

Đây là một app movie dashboard dạng SPA, kiến trúc đã chia tương đối rõ:

- `pages/` cho màn hình
- `components/` cho UI tái sử dụng
- `services/` cho API
- `context/` cho state dùng chung
- `types/` cho kiểu dữ liệu
- `routes/` cho điều hướng
