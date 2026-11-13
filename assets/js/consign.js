/* Consign With Prestige — the 3-step form (Vehicle Info → Contact info → Vehicle Condition).
   Prototype only: it checks the required fields of each step, then says the form is not connected.
   The site's developers wire the submit to the dealer's lead endpoint / CRM. */
(function () {
    var form = document.querySelector('[data-consign]');
    if (!form) return;

    var steps = Array.prototype.slice.call(form.querySelectorAll('.cstep'));
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-step-tab]'));
    var status = form.querySelector('[data-status]');
    var current = 0;

    function show(i, focus) {
        current = i;
        steps.forEach(function (s, n) { s.hidden = n !== i; s.classList.toggle('is-on', n === i); });
        tabs.forEach(function (t, n) {
            t.classList.toggle('is-on', n === i);
            t.classList.toggle('is-done', n < i);
            if (n === i) t.setAttribute('aria-current', 'step'); else t.removeAttribute('aria-current');
        });
        if (status) status.textContent = '';
        if (focus) {
            var first = steps[i].querySelector('input, select, textarea');
            if (first) first.focus({ preventScroll: true });
            var card = form.closest('.form-card');
            if (card && card.getBoundingClientRect().top < 0) card.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }
    }

    function valid(field) {
        var v = (field.value || '').trim();
        if (field.required && !v) return false;
        if (field.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return false;
        return true;
    }

    function check(step) {
        var bad = null;
        step.querySelectorAll('input, select, textarea').forEach(function (f) {
            var ok = valid(f);
            f.classList.toggle('is-invalid', !ok);
            f.setAttribute('aria-invalid', ok ? 'false' : 'true');
            if (!ok && !bad) bad = f;
        });
        if (bad) bad.focus();
        return !bad;
    }

    form.addEventListener('input', function (e) {
        if (e.target.classList.contains('is-invalid') && valid(e.target)) {
            e.target.classList.remove('is-invalid');
            e.target.setAttribute('aria-invalid', 'false');
        }
    });
    form.addEventListener('change', function (e) {
        if (e.target.classList.contains('is-invalid') && valid(e.target)) {
            e.target.classList.remove('is-invalid');
            e.target.setAttribute('aria-invalid', 'false');
        }
    });

    form.addEventListener('click', function (e) {
        if (e.target.closest('[data-next]')) {
            if (check(steps[current])) show(Math.min(current + 1, steps.length - 1), true);
        } else if (e.target.closest('[data-prev]')) {
            show(Math.max(current - 1, 0), true);
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!check(steps[current])) return;
        if (current < steps.length - 1) { show(current + 1, true); return; }
        if (status) status.textContent = 'Prototype: this form is not connected yet.';
    });

    show(0, false);
})();

/* Image upload: click "Upload" or drop files on the zone. Images only, at most data-max (8).
   The chosen files are kept in the real <input type=file> (via DataTransfer), so a normal multipart POST carries them. */
(function () {
    var box = document.querySelector('[data-upload]');
    if (!box) return;
    var input = box.querySelector('[data-upload-input]');
    var zone = box.querySelector('[data-upload-zone]');
    var list = box.querySelector('[data-upload-list]');
    var count = box.querySelector('[data-upload-count]');
    var max = parseInt(box.getAttribute('data-max'), 10) || 8;
    var files = [];
    var canSync = typeof DataTransfer !== 'undefined';

    function sync() {
        if (canSync) {
            try { var dt = new DataTransfer(); files.forEach(function (f) { dt.items.add(f); }); input.files = dt.files; } catch (e) { /* older browsers keep the last native pick */ }
        }
        list.querySelectorAll('img').forEach(function (img) { URL.revokeObjectURL(img.src); });
        list.innerHTML = '';
        files.forEach(function (f, i) {
            var li = document.createElement('li');
            li.className = 'cup__item';
            var img = document.createElement('img');
            img.src = URL.createObjectURL(f);
            img.alt = f.name;
            var rm = document.createElement('button');
            rm.type = 'button';
            rm.className = 'cup__rm';
            rm.setAttribute('aria-label', 'Remove ' + f.name);
            rm.innerHTML = '&times;';
            rm.addEventListener('click', function () { files.splice(i, 1); sync(); });
            li.appendChild(img);
            li.appendChild(rm);
            list.appendChild(li);
        });
        count.textContent = files.length ? files.length + ' / ' + max : '';
        box.classList.toggle('is-full', files.length >= max);
    }

    function add(fileList) {
        Array.prototype.forEach.call(fileList, function (f) {
            if (files.length < max && /^image\//.test(f.type)) files.push(f);
        });
        sync();
    }

    box.querySelector('[data-upload-pick]').addEventListener('click', function () {
        if (files.length < max) input.click();
    });
    input.addEventListener('change', function () {
        var picked = Array.prototype.slice.call(input.files);
        add(picked);
    });
    ['dragenter', 'dragover'].forEach(function (t) {
        zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.add('is-over'); });
    });
    ['dragleave', 'drop'].forEach(function (t) {
        zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.remove('is-over'); });
    });
    zone.addEventListener('drop', function (e) { if (e.dataTransfer) add(e.dataTransfer.files); });
})();
