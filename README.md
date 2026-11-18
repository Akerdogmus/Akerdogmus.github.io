# akerdogmus.github.io

Alim Kerem Erdoğmuş'un akademik ve uygulama portfolyosu. GitHub Pages ile yayınlanır:
**https://akerdogmus.github.io**

Statik bir sitedir; derleme adımı yoktur. İçerik `data/` klasöründeki JSON dosyalarından okunur,
sayfa İngilizce/Türkçe olarak gösterilir (sağ üstteki `[TR]` / `[EN]` düğmesi, ya da `?lang=tr`).

## İçeriği güncellemek

| Ne değişecek | Dosya |
| --- | --- |
| Yeni yayın | `data/publications.json` — listeye bir nesne ekle (`year`, `title`, `authors`, `venue`, `type`, `theme`, `url`) |
| Araştırma alanı / proje | `data/themes.json` — yayınlar `theme` alanındaki `id` ile buraya bağlanır |
| Uygulama / ekran görüntüsü | `data/apps.json` — görseller `assets/img/` altına (tercihen `.webp`) |
| Profil, istatistikler, kitap | `data/profile.json` |
| Deneyim zaman çizelgesi | `data/experience.json` (`to: null` → "devam ediyor") |
| Ar-Ge projeleri | `data/projects.json` — `to` gelecekteyse "aktif (planlanan bitiş)", geçmişteyse "tamamlandı"; `"left": true` → "katkım sona erdi"; bitiş ayı bilinmiyorsa `"done": true` |
| Arayüz metinleri (TR/EN) | `assets/js/app.js` içindeki `UI` nesnesi |

Alan değerleri:

- `type`: `article` · `conference` · `preprint`
- `theme`: `vv` · `genai` · `nocode` · `ev` · `edu` · `other`
- Tema ikonu: `themes.json` içinde `"icon"` alanı (`robot`, `sparkles`, `blocks`, `battery`, `cap`, `wave`); yoksa tema `id`'sine göre seçilir
- CSS/JS değiştirince `index.html` içindeki `?v=` numarasını artır (tarayıcı önbelleği için)
- `doi` → yayının altında tıklanabilir DOI etiketi çıkar (`url` alanı da `https://doi.org/...` olmalı)
- `fullText: true` → yayında "tam metin" etiketi görünür
- `titleAlt` → Türkçe başlıklı yayınlar için İngilizce başlık
- İki dilli metinler `{ "en": "...", "tr": "..." }` biçimindedir
- Profil fotoğrafı eklemek için `profile.json` içine `"photo": "assets/img/foto.webp"` yaz

## Yerelde çalıştırmak

```bash
python -m http.server 8765
```

Sonra http://localhost:8765 adresini aç. (Dosyayı doğrudan açmak JSON okumayı engeller.)

## Yayınlamak

`main` dalına gönderilen her değişiklik GitHub Pages tarafından birkaç dakika içinde yayına alınır.
