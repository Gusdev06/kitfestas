/* Área de Membros — Kit Festas — auth + render */

const KF_CONFIG = {
    storageKey: 'kf_membros_email_v1',
    manifestUrl: 'manifest.json',
};

const KF = {
    auth: {
        getEmail() { return localStorage.getItem(KF_CONFIG.storageKey) || ''; },
        isLogged() { return !!this.getEmail(); },
        isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || '').trim()); },
        login(email) {
            const v = String(email || '').trim().toLowerCase();
            if (!this.isValidEmail(v)) return false;
            localStorage.setItem(KF_CONFIG.storageKey, v);
            return true;
        },
        logout() { localStorage.removeItem(KF_CONFIG.storageKey); window.location.href = 'index.html'; },
        require() {
            if (!this.isLogged()) { window.location.replace('index.html'); }
        },
    },

    manifest: null,
    async loadManifest() {
        if (this.manifest) return this.manifest;
        // Prefer the inlined JS bundle (works from file:// without CORS).
        if (window.KF_MANIFEST) { this.manifest = window.KF_MANIFEST; return this.manifest; }
        const res = await fetch(KF_CONFIG.manifestUrl, { cache: 'no-store' });
        this.manifest = await res.json();
        return this.manifest;
    },

    fmt(n) {
        return new Intl.NumberFormat('pt-BR').format(n);
    },

    reveal() {
        const els = document.querySelectorAll('.reveal');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        els.forEach(el => io.observe(el));
    },
};

window.KF = KF;
