# Melisa Eryiğit sitesi — Mac kurulum rehberi

## Klasör

```
~/Desktop/web sitem/melisa-eryigit
```

(`web sitem` adında boşluk olduğu için Next.js alt klasöre kuruldu.)

## Node.js

Bu makinede Node, `~/.local/node` altına kuruldu. Yeni terminalde `node` / `npm` görünmezse:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

(Kalıcı olsun diye bu satır `~/.zshrc` dosyasına eklendi.)

## `.env` / `.env.local` nedir?

- **`.env.example`**: örnek şablon; git’e girebilir, gerçek şifreni yazma.
- **`.env.local`**: senin gizli ayarların; Next.js bunu okur. Git’e **girmez**.

### Şifreyi nasıl koyarsın?

1. Finder’da `Desktop → web sitem → melisa-eryigit` aç.
2. `.env.local` dosyasını metin editörüyle aç (yoksa `.env.example`’ı kopyalayıp `.env.local` yap).
3. Şu satırları kendine göre düzenle:

```
SESSION_SECRET=uzun-rastgele-bir-metin
ADMIN_PASSWORD=kendi-sifren
```

4. Kaydet. Geliştirme sunucusunu yeniden başlat (`Ctrl+C`, sonra `npm run dev`).

İsteğe bağlı: düz şifre yerine hash kullanmak için `.env.example` içindeki `ADMIN_PASSWORD_HASH` notuna bak.

**Chat’e veya başkasına şifreni yazma.** Örnek değer sadece `.env.example` içinde kalsın.

## Siteyi çalıştırma

```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd "~/Desktop/web sitem/melisa-eryigit"
npm install          # ilk sefer / paket değişince
npm run dev
```

| Ne | Adres |
| --- | --- |
| Site | http://localhost:3000 |
| Admin giriş | http://localhost:3000/admin/login |
| Admin panel | http://localhost:3000/admin |

Admin şifresi = `.env.local` içindeki `ADMIN_PASSWORD` (veya hash).

## Ne hazır?

- Public: ana sayfa, hakkımda, projeler, blog, deneyim, yetenekler, iletişim
- İletişim formu → SQLite → admin gelen kutusu (e-posta yok)
- Admin CRUD: yazılar, projeler, deneyim, yetenekler, mesajlar, site ayarları
- Soft pastel pembe tema, TR arayüz, placeholder içerik

## Bilinçli eksikler (sonraki turlar)

- Medya / foto yükleme arayüzü
- CV için dosya yükleme (şimdilik URL alanı)
- Zengin metin editörü
- Gerçek içerik (sen admin’den gireceksin)
- Hosting / domain

## Veri dosyaları

- Veritabanı: `data/site.db`
- Yüklemeler (ileride): `uploads/`
