# PENJELASAN

Blog Frontend

Halaman ini dibuat menggunakan html, tailwindcss, dan javascript tanpa framework.

Color pallet yang saya gunakan hanya hitam putih.

HTTP API yang digunakan adalah dari https://jsonplaceholder.typicode.com.

API dipanggil menggunakan fetch API builtin javascript (bukan axios).

Halaman ini responsif, tampilan akan menyesuaikan dengan mobile / desktop menggunakan fitur breakpoints dari tailwindcss.

Halaman dari empat bagian utama: topbar, sidebar, daftar postingan, dan modal (isinya postingan dan komentar).

Entry point javascript adalah function main di main.js, semua yang berkaitan dengan api dan event handling saya letakkan disini. untuk function pemrosesan data dan transformasi ke DOM ada di file renderer.js. Kode yang saya buat minim side-effect, jadi kodenya lebih mudah didebug.

Karena template dan layout html tidak ideal jika dibuat menggunakan javascript dan karena saya tidak memakai framework javascript seperti react / solid. Jadi saya menggunakan html langsung untuk templatenya, lalu saya clone elemen dan saya masukkan data - data yang dibutuhkan (contoh lain ada di renderer.js).

contoh:

```html
<div comments class="post-footer space-y-3">
    <div>Comments</div>
    <ul class="space-y-3 overflow-y-scroll">
        <li comment class="bg-blue-200 rounded-xl p-3 text-sm space-y-2">
            <div class="flex text-xs gap-1">
                <div class="w-10 bg-blue-300 rounded-full"></div>
                <div>
                    <div name>{name}</div>
                    <div email>{email}</div>
                </div>
            </div>
            <div body>{comment}</div>
        </li>
    </ul>
</div>
```

```javascript
async function renderCommentList(comments) {
    const commentListContainer = document.querySelector('[comments]')
    const commentTemplateElement = document.querySelector(
        '[comments] [comment]'
    )
    renderList(
        comments,
        commentListContainer,
        commentTemplateElement,
        function (data, el) {
            el.querySelector('[name]').textContent = data.name
            el.querySelector('[email]').textContent = data.email
            el.querySelector('[body]').textContent = data.body
            el.hidden = false
        }
    )
}
```

Terima kasih!