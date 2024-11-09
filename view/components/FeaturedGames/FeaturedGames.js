export class FeaturedGames extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="featured">
            <h2 class="title">Destacados</h2>
            <div class="carousel">
                <div class="carousel-item">
                    <img src="https://imgs.search.brave.com/-BADI2_MboFWOj4AtPWnqCMu1m3uXwBGc-KRf_HsHho/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMubmludGVuZG8u/Y29tL2ltYWdlL3Vw/bG9hZC9mX2F1dG8v/cV9hdXRvL2Rwcl8x/LjUvbmNvbS9zb2Z0/d2FyZS9zd2l0Y2gv/NzAwMTAwMDAwMDE4/MDEvM2RkMDk1MWUy/ZmEzODA4YWIyN2Fm/MWQ5OThhOWQwYTE4/ZDc3ODA5MTE4NDM3/ZDE5NzIxMjRiNjIx/OTI0NjQyMA" alt="Featured Game" class="main-image">
                </div>
                <div class="carousel-item carousel-item-info">
                <h2 class="game-title">Stardew Valley</h2>
                    <div class="thumbnails">
                        <img src="https://imgs.search.brave.com/E2ig6qj6O25g_uA5PLdcHBDW9YQZHTTaw3LvHfwczUc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpqUXhNMkUy/WVdRdE9EWXhaQzAw/TXpKaExXRmtZVEl0/T1RSa09EazFNRE13/TkRKaVhrRXlYa0Zx/Y0djQC5qcGc" alt="Thumbnail 1" class="thumbnail">
                        <img src="https://imgs.search.brave.com/Ev0450MK-f4tU5iQTC43NqOSCjYuVIvUHA-AUzh7i5Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbmRy/b2lkcmV5LmNvbS91/cGxvYWRzL21pbmkv/c2tyaW55L2U3Ny8x/NTk1NDI1MTU1X2Nv/bWNodWNrbGVmaXNo/c3RhcmRld3ZhbGxl/eV8xLmpwZw" alt="Thumbnail 2" class="thumbnail">
                        <img src="https://imgs.search.brave.com/ak6X1F3ArGU7j9vOjybkAETNNQM-tdmhhOoEQh0DmEU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/c3RhcmRldy12YWxs/ZXktc2NyZWVuc2hv/dHMtZnJvbS0yMDEz/LXYwLTd2N3l5cng0/eHRkYzEucG5nP3dp/ZHRoPTY0MCZjcm9w/PXNtYXJ0JmF1dG89/d2VicCZzPTE2YTdi/MzExNjMwZTFkOTUx/M2M3YmYwY2JjNGZh/ZDNkZmMxODQzYmY" alt="Thumbnail 3" class="thumbnail">
                        <img src="https://imgs.search.brave.com/4L-CJTo58ZOZEDfFHZsdvedZgWj2HgXALT7tZzzlpE0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnNyY2RuLmNv/bS93b3JkcHJlc3Mv/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MTAvdmlsbGFnZXJz/LWZyb20tc3RhcmRl/dy12YWxsZXktd2l0/aC1hLWZhcm0uanBn" alt="Thumbnail 3" class="thumbnail">
                    </div>
                </div>
            </div>
            <div class="dots">
                <div class="dot active"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;
    }

    #agregarEstilos(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "/view/components/FeaturedGames/FeaturedGames.css");
        shadow.appendChild(link);
    }
}
