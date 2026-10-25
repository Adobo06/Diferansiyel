# ODE Lab — Birinci Mertebeden Diferansiyel Denklem Çözücü

Kullanıcıdan alınan `y' = f(x,y)` ve `y(x0)=y0` başlangıç koşulunu, seçilen Euler, orta nokta RK2 veya klasik RK4 yöntemiyle sayısal çözen eğitim amaçlı web arayüzü.

## Dosyalar

- `index.html`: form ve grafik alanının HTML yapısı
- `style.css`: görsel tasarım
- `app.js`: girişleri okuma, matematiksel ifadeyi doğrulama ve grafik çizimi
- `solver.js`: **sadece sayısal yöntemler** (kaynak Python dosyasındaki formüllerin JavaScript karşılıkları)
- `birinci_derece_cozucu.py`: Python için önceki sayısal çözücü; aynı yöntemler

Tarayıcılar yerel Python dosyasını doğrudan çalıştırmadığı için sayısal yöntemler değişmeden `solver.js` içine de yazılmıştır. Hazır ODE çözücüsü veya hata kontrolüne dayalı otomatik adım seçimi kullanılmaz.

## Çalıştırma / yayımlama

**GitHub Pages:** Bu dosyaları bir **public** GitHub deposunun köküne yükleyin. GitHub → Settings → Pages → Build and deployment → Source: `Deploy from a branch` → Branch: `main`, Folder: `/ (root)` → Save. Site adresi `https://KULLANICI.github.io/DEPO/` olur. Depo özel (private) durumdaysa önce erişim ve Pages plan/izinlerini kontrol edin. Bu ayarlardan sonra GitHub Pages yayının tamamlandığını doğrulayın.

Diğer statik barındırma servislerinde de klasörü olduğu gibi yayımlayabilirsiniz. Çalışmak için sunucu tarafında Python kurulumu gerekmez.

Yerel deneme: klasörde `python -m http.server 8000`, ardından `http://localhost:8000`.

## Denklemin yazılışı

`3*exp(-x)-0.4*y`, `sin(x)-y`, `y^2`, `y**2-2*y+1`. İzin verilen matematik fonksiyonları: `sin`, `cos`, `tan`, `exp`, `log`, `sqrt`, `abs`; sabitler `pi`, `e`. Çarpım için `*` gerekir (ör. `2*y`). `log` doğal logaritmadır.

**Kapsam:** Bir bilinmeyenli, birinci mertebeden ve `y'=f(x,y)` olarak açıkça yazılmış başlangıç değer problemleri. Çözümün her koşulda varlığı/tekliği veya kararlılığı garanti edilmez. İkinci mertebeden denklemler ve diferansiyel denklem sistemleri kapsam dışıdır.