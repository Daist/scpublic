//Better QA Window
(function() {
    'use strict';

    let currentSortMode = 'count'; // 'count', 'alpha', 'segment'
    let isProcessing = false;
    let timeoutId = null;

    function reorderAndGroupQaErrors() {
        if (isProcessing) return;

        const tables = document.querySelectorAll('.l-qa-check-report__table-scroll');

        tables.forEach((table) => {
            const tbody = table.querySelector('tbody');
            if (!tbody) return;

            const segmentRows = tbody.querySelectorAll('.l-qa-check-report__go-segment');
            if (segmentRows.length === 0) return;

            const stateKey = `${segmentRows.length}_${currentSortMode}`;
            if (tbody.dataset.processedState === stateKey) return;

            // Блокируем повторные вызовы
            isProcessing = true;

            // 1. Привязываем/обновляем кнопку в заголовке
            const subcatTr = table.closest('tr')?.previousElementSibling;
            if (subcatTr) {
                const titleCell = subcatTr.querySelector('.l-corpr__td_openable .g-wrapper .l-corpr__threeDots');
                if (titleCell) {
                    titleCell.querySelectorAll('.qa-sort-btn').forEach(b => b.remove());
                    addSortButton(titleCell, tbody);
                }
            }

            tbody.querySelectorAll('.qa-sort-btn').forEach(b => b.remove());

            const rows = Array.from(tbody.children);
            const groupsMap = new Map();

            // 2. Собираем группы по уникальным ошибкам
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (!row.classList.contains('l-qa-check-report__go-segment')) continue;

                const detailEl = row.querySelector('.l-qa-check-report__double-indent span[data-bind*="text: $data"]');
                const errorKey = detailEl ? detailEl.textContent.trim().toLowerCase() : '__unknown__';

                const textRow = (rows[i + 1] && rows[i + 1].querySelector('.l-qa-check-report__segment-text')) ? rows[i + 1] : null;

                const segNumEl = row.querySelector('.l-qa-check-report__segment-number p');
                const segNum = segNumEl ? parseInt(segNumEl.textContent.trim(), 10) || 0 : 0;

                if (!groupsMap.has(errorKey)) {
                    groupsMap.set(errorKey, {
                        key: errorKey,
                        items: [],
                        firstSegNum: segNum
                    });
                }
                groupsMap.get(errorKey).items.push({ headRow: row, textRow: textRow, segNum: segNum });
            }

            const groupsArray = Array.from(groupsMap.values());

            // 3. Сортируем группы
            groupsArray.sort((a, b) => {
                if (currentSortMode === 'count') {
                    if (b.items.length !== a.items.length) {
                        return b.items.length - a.items.length;
                    }
                    return a.key.localeCompare(b.key, 'ru');
                } else if (currentSortMode === 'alpha') {
                    return a.key.localeCompare(b.key, 'ru');
                } else {
                    return a.firstSegNum - b.firstSegNum;
                }
            });

            // 4. Безопасная сборка в виртуальный DocumentFragment
            const fragment = document.createDocumentFragment();

            groupsArray.forEach((group) => {
                const items = group.items;
                const primary = items[0];

                const targetCell = primary.headRow.querySelector('.l-qa-check-report__double-indent');

                // Настройка бейджа с выравниванием float: right (не ломает макет)
                let badge = primary.headRow.querySelector('.qa-count-badge');
                if (items.length > 1 && group.key !== '__unknown__') {
                    if (!badge) {
                        badge = document.createElement('b');
                        badge.className = 'qa-count-badge';
                        badge.style.cssText = 'color: #d9534f; font-weight: bold; float: right; background: #fee; padding: 1px 6px; border-radius: 8px; font-size: 11px; white-space: nowrap; font-family: sans-serif; margin-right: 15px;';
                        if (targetCell) targetCell.appendChild(badge);
                    }
                    badge.textContent = `× ${items.length}`;
                } else if (badge) {
                    badge.remove();
                }

                primary.headRow.style.backgroundColor = items.length > 1 ? '#f0f5ff' : '';
                primary.headRow.style.cursor = items.length > 1 ? 'pointer' : 'default';

                fragment.appendChild(primary.headRow);
                if (primary.textRow) fragment.appendChild(primary.textRow);

                const isExpanded = primary.headRow.dataset.isExpanded === "true";

                for (let i = 1; i < items.length; i++) {
                    const item = items[i];
                    fragment.appendChild(item.headRow);
                    if (item.textRow) fragment.appendChild(item.textRow);

                    if (isExpanded) {
                        item.headRow.style.removeProperty('display');
                    } else {
                        item.headRow.style.setProperty('display', 'none', 'important');
                        if (item.textRow) {
                            item.textRow.style.setProperty('display', 'none', 'important');
                        }
                    }
                }

                if (items.length > 1 && !primary.headRow.dataset.hasGroupToggle) {
                    primary.headRow.dataset.hasGroupToggle = "true";

                    primary.headRow.addEventListener('click', (e) => {
                        if (e.target.closest('a.g-link')) return;

                        const currentExpanded = primary.headRow.dataset.isExpanded === "true";
                        const nextExpanded = !currentExpanded;
                        primary.headRow.dataset.isExpanded = String(nextExpanded);

                        for (let i = 1; i < items.length; i++) {
                            if (nextExpanded) {
                                items[i].headRow.style.removeProperty('display');
                            } else {
                                items[i].headRow.style.setProperty('display', 'none', 'important');
                                if (items[i].textRow) {
                                    items[i].textRow.style.setProperty('display', 'none', 'important');
                                }
                            }
                        }
                    }, true);
                }
            });

            // Отключаем наблюдатель перед вставкой элементов
            observer.disconnect();

            tbody.appendChild(fragment);
            tbody.dataset.processedState = stateKey;

            // Включаем обратно после отрисовки
            setTimeout(() => {
                isProcessing = false;
                observer.observe(document.body, { childList: true, subtree: true });
            }, 100);
        });
    }

    function addSortButton(headerElement, tbody) {
        if (headerElement.querySelector('.qa-sort-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'qa-sort-btn';
        btn.style.cssText = 'margin-left: 12px; padding: 2px 8px; font-size: 11px; font-weight: bold; color: #333; background-color: #fcfcfc; border: 1px solid #ccc; border-radius: 4px; cursor: pointer; vertical-align: middle; line-height: 1.2;';

        updateButtonText(btn);

        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (currentSortMode === 'count') currentSortMode = 'alpha';
            else if (currentSortMode === 'alpha') currentSortMode = 'segment';
            else currentSortMode = 'count';

            updateButtonText(btn);

            tbody.dataset.processedState = '';
            scheduleReorder();
        });

        headerElement.appendChild(btn);
    }

    function updateButtonText(btn) {
        if (currentSortMode === 'count') {
            btn.textContent = 'Сортировка: x99-x1';
            btn.title = 'По количеству ошибок (клик — по алфавиту A-Z)';
        } else if (currentSortMode === 'alpha') {
            btn.textContent = 'Сортировка: A-Z';
            btn.title = 'По алфавиту (клик — по порядку сегментов 1-100)';
        } else {
            btn.textContent = 'Сортировка: 1-100';
            btn.title = 'По порядку сегментов (клик — по количеству ошибок x99-x1)';
        }
    }

    function scheduleReorder() {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            reorderAndGroupQaErrors();
        }, 150);
    }

    const observer = new MutationObserver(() => {
        scheduleReorder();
    });

    observer.observe(document.body, { childList: true, subtree: true });


    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

    addGlobalStyle('.g-menubox__dropbox{max-height:95vh !important;}'); //accounts list, no-scroll window
    addGlobalStyle('.g-drpdwn__list.g-drpdwn__list-multiselect {max-height: 300px !important;}'); //list for order filtering, no-scroll

    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__client-vendor-td {width: 130px !important;}'); //client width
    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__projname-th {width: 330px !important;}'); //project width
    addGlobalStyle('.l-corpr__th.l-project__td.l-project__td_progress {width: 120px !important;}'); //progress bar width

    addGlobalStyle('.l-qa-check-report__segment-text {width: 50% !important;}'); //fix width for number/date

    addGlobalStyle('.ui-progressbar__line.ui-progressbar__line--2 {background-color: #e5a5e5 !important;}'); //calm pink progress bar

    addGlobalStyle('.g-popupbox_size_xl {height:75vh !important; width: 75vw !important;}'); //QA window
    addGlobalStyle('.g-popupbox.g-popupbox_size_xl.g-popupbox_content_flexable {max-height:75vh !important;}'); //QA window
    addGlobalStyle('.l-corpr__tbl.l-qa-check-report__table {width:95% !important;}'); //margin to hover cursor while scrolling

    addGlobalStyle('.l-corpr__td.l-qa-check-report__document-title {COLOR: #EFEFEF !important}'); //grey-out filenames
    addGlobalStyle('.g-link {COLOR: #EFEFEF !important}'); //grey-out links
    addGlobalStyle('.g-link:visited {COLOR: #AFFFCF !important}'); //visited links color

    addGlobalStyle('.g-link.g-link_upper.g-link_bold {COLOR: #7e64bd !important}'); //regular server link color

    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.g-tabs__panel_clearfix {bottom: 20px; !important;}'); //formatting
    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.l-project__executive-tab {min-height: 150px !important; height: 150px !important; display: block !important;}'); //show mass confirm here too, don't switch tabs
    addGlobalStyle('div.g-popupbox__bd {height: 555px !important;}'); //window size to avoid clashing with ok/cancel buttons
    
    addGlobalStyle('.g-row.g-row_spacing_xxxl {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.md-select__container.md-select__label_float {padding-top: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_2 {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_3 {margin-bottom: 0px !important;}'); //hole cleanup, button alignment

    addGlobalStyle('.l-corpr__td {padding-top: 0px !important; padding-bottom: 0px !important;}'); //vertical list compression


    //addGlobalStyle('.latin-char { color: #ff5555 !important; font-weight: bold !important; }'); // Красный для латиницы
    //addGlobalStyle('.cyrillic-char { color: #4499ff !important; font-weight: bold !important; }'); // Синий для кириллицы
    addGlobalStyle('.latin-char { color: #EFEFEF !important; font-weight: bold !important; }'); // взбледняем для латиницы
    addGlobalStyle('.cyrillic-char { color: #EFEFEF !important; font-weight: bold !important; }'); // взбледняем для кириллицы
    addGlobalStyle('.cyrillic-yo-word-and-latin { color: #EFEFEF !important; font-weight: bold !important; }'); // взбледняем для кириллицы с ё и латиницы
    addGlobalStyle('.js-latin-highlighted span:not(.latin-char), .js-cyrillic-highlighted span:not(.cyrillic-char), .js-cyrillic-yo-and-latin-highlighted span:not(.cyrillic-yo-word-and-latin) { color: inherit !important; font-weight: inherit !important; }');
    //addGlobalStyle('.js-latin-highlighted span:not(.latin-char), .js-cyrillic-highlighted span:not(.cyrillic-char) { color: inherit !important; font-weight: inherit !important; }');

})();
/*
(function() {
    'use strict';

    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

    addGlobalStyle('.g-menubox__dropbox{max-height:95vh !important;}'); //accounts list, no-scroll window
    addGlobalStyle('.g-drpdwn__list.g-drpdwn__list-multiselect {max-height: 300px !important;}'); //list for order filtering, no-scroll

    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__client-vendor-td {width: 130px !important;}'); //client width
    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__projname-th {width: 330px !important;}'); //project width 
    addGlobalStyle('.l-corpr__th.l-project__td.l-project__td_progress {width: 120px !important;}'); //progress bar width

    addGlobalStyle('.l-qa-check-report__segment-text {width: 50% !important;}'); //fix width for number/date
    
    addGlobalStyle('.ui-progressbar__line.ui-progressbar__line--2 {background-color: #e5a5e5 !important;}'); //calm pink progress bar
    
    addGlobalStyle('.g-popupbox_size_xl {height:75vh !important; width: 75vw !important;}'); //QA window
    addGlobalStyle('.g-popupbox.g-popupbox_size_xl.g-popupbox_content_flexable {max-height:75vh !important;}'); //QA window
    addGlobalStyle('.l-corpr__tbl.l-qa-check-report__table {width:95% !important;}'); //margin to hover cursor while scrolling

    addGlobalStyle('.l-corpr__td.l-qa-check-report__document-title {COLOR: #EFEFEF !important}'); //grey-out filenames
    addGlobalStyle('.g-link {COLOR: #EFEFEF !important}'); //grey-out links
    addGlobalStyle('.g-link:visited {COLOR: #AFFFCF !important}'); //visited links color
    
    addGlobalStyle('.g-link.g-link_upper.g-link_bold {COLOR: #7e64bd !important}'); //regular server link color

    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.g-tabs__panel_clearfix {bottom: 20px; !important;}'); //formatting
    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.l-project__executive-tab {min-height: 150px !important; height: 150px !important; display: block !important;}'); //show mass confirm here too, don't switch tabs
    addGlobalStyle('div.g-popupbox__bd {height: 555px !important;}'); //window size to avoid clashing with ok/cancel buttons

    //addGlobalStyle('.l-corpr__td.l-qa-check-report__segment-number.l-corpr__td_openable {padding-right: 4px !important;}'); //used to cure epilepsy, fixed
    addGlobalStyle('.g-row.g-row_spacing_xxxl {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.md-select__container.md-select__label_float {padding-top: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_2 {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_3 {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    
    addGlobalStyle('.l-corpr__td {padding-top: 0px !important; padding-bottom: 0px !important;}'); //vertical list compression

})();
*/
