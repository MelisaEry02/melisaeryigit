# Melisa Eryiğit — kişisel site

Next.js (App Router) + SQLite + tek-şifreli admin. Sadece Türkçe. Local geliştirme.

## Kurulum

1. Node.js 20+ kurulu olsun (`node -v`, `npm -v`).
2. Proje klasörüne gir:

```bash
cd "~/Desktop/web sitem/melisa-eryigit"
```

3. Bağımlılıklar (ilk sefer):

```bash
npm install
```

4. Ortam dosyası:

```bash
cp .env.example .env.local
```

`.env.local` içinde `ADMIN_PASSWORD` ve `SESSION_SECRET` değerlerini kendine göre değiştir.

5. Geliştirme sunucusu:

```bash
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin  

## Notlar

- SQLite dosyası: `data/site.db` (otomatik oluşur)
- Medya klasörü: `uploads/` (ileride yükleme için)
- E-posta yok; iletişim mesajları admin gelen kutusunda
- Hosting yok (v1 local)
