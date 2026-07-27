// Глобальные переменные интерфейса и состояния скрипта
var script_about = "https://greasyfork.org/scripts/13007-text-highlight-and-seek";
var hlframe, hlobjDefault, kwhieditstyle, hljson, hlobj, hlkeys, kwold, hlold, hlbtnvis, hlprecode, hlnextset, hbtndisp;

// Определение версии Greasemonkey (GM4 использует асинхронные GM.* функции)
var GM4 = (typeof GM_getValue === "undefined") ? true : false;

// =========================================================================
// ИНИЦИАЛИЗАЦИЯ СКРИПТА И ИНТЕРФЕЙСА
// =========================================================================
async function THS_init(){
  // Загрузка настроек фрейма
  if (!GM4){
    hlframe = GM_getValue("hlframe", "");
  } else {
    hlframe = await GM.getValue("hlframe", "");
  }
  if (hlframe == ""){
    hlframe = "none";
    if (!GM4){
      GM_setValue("hlframe", hlframe);
    } else {
      await GM.setValue("hlframe", hlframe);
    }
  }

  // Проверка работы во вложенных iframe
  if ((window.self !== window.top) && (hlframe != "any")) {
    if (hlframe == "none") return;
  }

  // Наборы правил по умолчанию (если скрипт запускается впервые)
  hlobjDefault = {
    "set100" : {
      keywords : "scripts|script",
      type : "string",
      hlpat : "",
      textcolor : "rgb(0,0,0)",
      backcolor : "rgb(255,255,128)",
      fontweight : "inherit",
      custom : "",
      enabled : "true",
      visible : "true",
      updated : ""
    },
    "set099" : {
      keywords : "site",
      type : "word",
      hlpat : "",
      textcolor : "rgb(0,0,0)",
      backcolor : "rgb(255,192,255)",
      fontweight : "inherit",
      custom : "",
      enabled : "true",
      visible : "true",
      updated : ""
    },
    "set098" : {
      keywords : "^October \\d{1,2}",
      type : "regex",
      hlpat : "",
      textcolor : "rgb(0,0,0)",
      backcolor : "rgb(192,255,192)",
      fontweight : "inherit",
      custom : "",
      enabled : "true",
      visible : "true",
      updated : ""
    }
  };
  kwhieditstyle = ["rgb(0,0,255)","rgb(255,255,0)","inherit",""];

  // Чтение сохраненных правил пользователя из хранилища GM
  if (!GM4){
    hljson = GM_getValue("kwstyles");
  } else {
    hljson = await GM.getValue("kwstyles");
  }
  if (!hljson || hljson.length == 0){
    hlobj = hlobjDefault;
    if (!GM4){
      kwold = GM_getValue("keywords");
    } else {
      kwold = await GM.getValue("keywords");
    }
    if (kwold && kwold.length > 0) {
      hlobj.set100.keywords = kwold.split(',').join('|');
    }
    if (!GM4){
      hlold = GM_getValue("highlightStyle");
    } else {
      hlold = await GM.getValue("highlightStyle");
    }
    if (hlold && hlold.length > 0) {
      hlobj.set100.custom = hlold;
    }
    hljson = JSON.stringify(hlobj);
    if (!GM4){
      GM_setValue("kwstyles", hljson);
    } else {
      await GM.setValue("kwstyles", hljson);
    }
  } else {
    hlobj = JSON.parse(hljson);
  }
  hlkeys = Object.keys(hlobj);

  // Загрузка состояния плавающей кнопки "H"
  if (!GM4){
    hlbtnvis = GM_getValue("hlbtnvis", "");
  } else {
    hlbtnvis = await GM.getValue("hlbtnvis", "");
  }
  if (hlbtnvis == ""){
    hlbtnvis = "on";
    if (!GM4){
      GM_setValue("hlbtnvis", hlbtnvis);
    } else {
      await GM.setValue("hlbtnvis", hlbtnvis);
    }
  }

  // Загрузка флага подсветок в тегах pre/code
  if (!GM4){
    hlprecode = GM_getValue("hlprecode", "");
  } else {
    hlprecode = await GM.getValue("hlprecode", "");
  }
  if (hlprecode == ""){
    hlprecode = true;
    if (!GM4){
      GM_setValue("hlprecode", hlprecode);
    } else {
      await GM.setValue("hlprecode", hlprecode);
    }
  }

  // Счетчик ID для новых наборов правил
  if (!GM4){
    hlnextset = GM_getValue("hlnextset", "");
  } else {
    hlnextset = await GM.getValue("hlnextset", "");
  }
  if (hlnextset == ""){
    hlnextset = 101;
    if (!GM4){
      GM_setValue("hlnextset", hlnextset);
    } else {
      await GM.setValue("hlnextset", hlnextset);
    }
  }

  // Генерация динамических CSS правил для всех наборов
  insertCSS(hlkeys);

  // Первый запуск подсветок на странице
  THmo_doHighlight(document.body, null);

  // -----------------------------------------------------------------------
  // Настройка MutationObserver (Слежение за изменениями DOM в Smartcat)
  // -----------------------------------------------------------------------
  var THmo_MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver;
  if (THmo_MutOb){
    var THmo_chgMon = new THmo_MutOb(function(mutationSet){
      // Отправляем запрос на перерасчет подсветок через Debounce (чтобы избежать лагов)
      queueHighlight();
    });
    var opts = {childList: true, subtree: true, characterData: true};
    THmo_chgMon.observe(document.body, opts);
  }

  // -----------------------------------------------------------------------
  // Построение элементов верхнего меню управления (Top Bar UI)
  // -----------------------------------------------------------------------
  var kwhibar = document.createElement("div");
  kwhibar.id = "thdtopbar";
  var btnchk = hlbtnvis == "on" ? " checked=\"checked\"" : "";
  var btnprecode = hlprecode ? " checked=\"checked\"" : "";
  kwhibar.innerHTML = "<form id=\"thdtopform\" onsubmit=\"return false\"><p id=\"thdtopbarhome\"><a href=\"" + script_about + "\" target=\"_blank\" title=\"Go to script install page\">JS</a></p>" +
    "<div id=\"thdtopcurrent\"><p id=\"thdtopkeywords\" title=\"Click to View, Edit, Seek, or Add Keywords\">Click to manage keyword/highlight sets &bull; <em>Add New Set</em></p>" +
    "<div id=\"thdtopdrop\" style=\"display:none;\"><div id=\"thdtable\"><table cellspacing=\"0\"><tbody id=\"kwhitbod\"></tbody></table></div><p><button id=\"btnkwhiadd\">Add New Set</button>" +
    "<span style=\"float:right\"><button id=\"btnkwhiexport\">Export Sets</button> <button id=\"btnkwhiimport\">Import Sets</button> <button id=\"thdtopdropclose\">X</button></span></p></div></div>" +
    "<div id=\"thdtopfindbuttons\"><button title=\"First match\" thdaction=\"f\"><b>l</b>&#x25c0;</button> <button title=\"Previous match\" thdaction=\"p\">&#x25c0;</button> <span id=\"thdseekdesc\">Seek</span> <button title=\"Next match\" thdaction=\"n\">&#x25b6;</button> <button title=\"Last match\" thdaction=\"l\">&#x25b6;<b>l</b></button><div id=\"thdseekfail\"></div></div>" +
    "<div id=\"thdtopoptions\"><div>Options</div><ul><li><label title=\"Float a button in the upper right corner of the document to quickly access this panel\"><input type=\"checkbox\" id=\"chkhbtn\"" + btnchk +
    "> Show H button</label></li><li><label title=\"Highlight matches in &lt;pre&gt; and &lt;code&gt; tags\"><input type=\"checkbox\" id=\"chkprecode\"" + btnprecode +
    "> Match in pre/code</label></li><li><label style=\"padding-left:4px\">Framed pages:</label><br><select id=\"hlframeselect\" size=\"3\"><option value=\"none\">No highlighting</option><option value=\"same\">Same site only</option>" +
    "<option value=\"any\">Any site</option></select></li><li><button id=\"btnthsreread\" title=\"Update from and apply stored settings\" disabled>Re-Read Saved Prefs</button></li></ul></div>" +
    "<button class=\"btnkwhiclose\" onclick=\"document.getElementById('thdtopbar').style.display='none';document.getElementById('thdtopspacer').style.display='none';return false;\" style=\"float:right\">X</button></form>" +
    "<style type=\"text/css\">#thdtopbar{position:fixed;top:0;left:0;height:26px;width:100%;padding:0;color:#024;background:#ddd;font-family:sans-serif;font-size:16px;line-height:16px;border-bottom:1px solid #024;z-index:2500;display:none} " +
    "#thdtopbar,#thdtopbar *{box-sizing:content-box;} #thdtopform{display:block;position:relative;float:left;width:100%;margin:0;border:none;} " +
    "#thdtopbarhome,#thdtopcurrent,#thdtopfindbuttons,#thdtopoptions{float:left;top:0;left:0;margin:0;padding:5px 8px 4px;border-right:1px solid #fff;font-size:16px;} " +
    "#thdtopbarhome{width:22px;text-align:center;overflow:hidden;} #thdtopbarhome a{display:block;} #thdtopbarhome a img{display:block;border:none;border-radius:3px;padding:3px;margin:-3px 0 -4px 0;background-color:#fff} " +
    "#thdtopfindbuttons{padding-bottom:1px;position:relative} #thdtopfindbuttons button{margin:-5px 0 -2px 0;width:28px;height:18px;color:#024;background:#f0f0f0;border:1px solid #024;border-radius:4px;padding:1px 3px;} " +
    "#thdtopfindbuttons button:hover{background:#ffa;} #thdseekdesc{cursor:pointer} #thdtopkeywords{margin:0;width:500px;cursor:pointer;} #thdtopkeywords em{padding: 0 2px;} #thdtopkeywords em:hover{background:#ffa;}" +
    "#thdseekfail{display:none;position:absolute;top:30px;left:15px;z-index:2001;width:200px;color:#f8f8f8;background:#b00;border-radius:6px;text-align:center;font-size:12px;padding:3px}" +
    "#thdtopkeywords span{display:inline-block;width:100%;overflow:hidden;text-overflow:ellipsis;} #thdtable{max-height:90vh;overflow-y:auto;overflow-x:hidden} " +
    "#thdtopdrop{position:absolute;top:26px;left:38px;width:500px;margin:0 -1px 0 -1px;padding:0 8px 8px 8px;background:#ddd;border:1px solid #024;border-top:none;border-radius:0 0 6px 6px;} " +
    "#thdtopdrop table{width:100%;background:#fff;border-top:1px solid #000;border-left:1px solid #000;table-layout:fixed} " +
    "#thdtopdrop td{padding:4px 4px; vertical-align:top;border-right:1px solid #000;border-bottom:1px solid #000;} #thdtopdrop td div{word-wrap:break-word} #thdtopdrop p{margin-top:8px;margin-bottom:0;} " +
    "#thdtopoptions{position:relative;width:160px;height:26px;padding:0 8px;} #thdtopoptions > div{padding:5px 0 4px;} " +
    "#thdtopoptions ul{position:absolute;top:26px;left:0;width:160px;margin:0 -1px 0 -1px;padding:0 8px 8px 8px;background:#ddd;border:1px solid #024;border-top:none;border-radius:0 0 6px 6px;list-style:none;} " +
    "#thdtopoptions li{width:100%;float:left;padding:2px 0;} #thdtopoptions ul{display:none;} #thdtopoptions:hover ul{display: block;border:1px solid #024;border-top:none;} #thdtopoptions li:hover{background:#eee;}" +
    ".btnkwhiclose{float:right;font-size:11px;margin-top:2px;} .thdtype{color:#ccc;float:right;font-size:12px;padding-top:8px;} #thdtopbar label{font-weight:normal;display:inline;margin:0} #hlframeselect{margin:3px 0 3px 4px;border-radius:4px}</style>";
  document.body.appendChild(kwhibar);

  // Навешивание обработчиков событий на элементы управления Top Bar
  document.getElementById("thdtopkeywords").addEventListener("click",thddroptoggle,false);
  document.getElementById("kwhitbod").addEventListener("click",kwhiformevent,false);
  document.getElementById("kwhitbod").addEventListener("dblclick",kwhiformevent,false);
  document.getElementById("btnkwhiadd").addEventListener("click",kwhinewset,false);
  document.getElementById("btnkwhiexport").addEventListener("click",kwhiexport,false);
  document.getElementById("btnkwhiimport").addEventListener("click",kwhiimport,false);
  document.getElementById("thdtopfindbuttons").addEventListener("click",thdseek,false);
  document.getElementById("chkhbtn").addEventListener("click",kwhihbtn,false);
  document.getElementById("chkprecode").addEventListener("click",kwhiprecode,false);
  document.getElementById("btnthsreread").addEventListener("click",thsreread,false);
  document.getElementById("thdtopdropclose").addEventListener("click",kwhitopdropclose,false);
  document.getElementById("hlframeselect").addEventListener("change",thsframeselect,false);
  setthsframeopts();

  // Отступ под верхнюю панель
  var divsp = document.createElement("div");
  divsp.id = "thdtopspacer";
  divsp.setAttribute("style","clear:both;display:none");
  divsp.style.height = parseInt(27 - parseInt(window.getComputedStyle(document.body,null).getPropertyValue("margin-top"))) + "px";
  document.body.insertBefore(divsp, document.body.childNodes[0]);

  // Иконка скрипта
  var JSBTN = document.createElement("img");
  if (!GM4){
    JSBTN.src = GM_getResourceURL("mycon");
  } else {
    JSBTN.src = await GM.getResourceUrl("mycon");
  }
  document.querySelector("#thdtopbar a").textContent = "";
  document.querySelector("#thdtopbar a").appendChild(JSBTN);

  if (!GM4) GM_registerMenuCommand("Show Text Highlight and Seek Bar - View, Edit, Add Keywords and Styles", editKW);

  // Создание плавающей кнопки "H" в углу экрана
  hbtndisp = hlbtnvis == "off" ? ' style="display:none"' : '';
  var dNew = document.createElement("div");
  dNew.innerHTML = '<button id="btnshowkwhi"' + hbtndisp + '>H</button><style type="text/css">#btnshowkwhi{position:fixed;top:4px;right:4px;opacity:0.2;' +
    'color:#000;background-color:#ffa;font-weight:bold;font-size:12px;border:1px solid #ccc;border-radius:4px;padding:2px 3px;z-index:1999;min-width:22px;min-height:22px}' +
    '#btnshowkwhi:hover{opacity:0.8}@media print{#btnshowkwhi{display:none;}}</style>';
  document.body.appendChild(dNew);
  document.getElementById("btnshowkwhi").addEventListener("click",editKW,false);

  // -----------------------------------------------------------------------
  // Создание модального окна редактирования правил (Edit/Add Keywords)
  // -----------------------------------------------------------------------
var kwhied = document.createElement("div");
  kwhied.id = "kwhiedit";
  kwhied.innerHTML = "<form onsubmit=\"return false;\"><p style=\"margin-top:0\"><b>Edit/Add Keywords/Highlighting</b>" +
    "<span class=\"btnkwhiclose\"><button id=\"btnkwhimax\" title=\"Maximize dialog size\">^</button>&nbsp;&nbsp;" +
    "<button onclick=\"document.getElementById('kwhiedit').style.display='none'; return false;\" title=\"Close dialog\">X</button></span>" +
    "</p><p>List longer forms of a word first to match both in full. Example: \"children|child\" will highlight both, but \"child|children\" " +
    "will only highlight child, it won't expand the selection to children.</p>" +
    "<table cellspacing=\"0\" style=\"table-layout:fixed\"><tbody><tr kwhiset=\"new\"><td style=\"width:calc(100% - 464px)\">" +
    "<p contenteditable=\"true\" style=\"border:1px dotted #000;word-wrap:break-word;display:block!important\" class=\"\">placeholder</p>" +
    "<p style=\"margin-top:2em\">Match type: <select id=\"kwhipattype\"><option value=\"string\" selected>Anywhere in a word</option>" +
    "<option value=\"word\">\"Whole\" words only</option><option value=\"regex\">Regular Expression (advanced)</option></select></p></td>" +
    "<td style=\"width:416px\" id=\"stylecontrols\"><p><span>Text color:</span> <input id=\"txtcolorinput\" type=\"color\" value=\"#000000\" title=\"Pop up color picker\"> " +
    "R:<input id=\"txtr\" type=\"number\" min=\"0\" max=\"255\" step=\"1\" style=\"width:3.25em\" value=\"0\"> " +
    "G:<input id=\"txtg\" type=\"number\" min=\"0\" max=\"255\" step=\"1\" style=\"width:3.25em\" value=\"0\"> " +
    "B:<input id=\"txtb\" type=\"number\" min=\"0\" max=\"255\" step=\"1\" style=\"width:3.25em\" value=\"0\"> " +
    "<button id=\"btntxtreset\">Reset</button></p>" +
    "<p><span>Background:</span> <input id=\"bkgcolorinput\" type=\"color\" value=\"#ffff80\" title=\"Pop up color picker\"> " +
    "R:<input id=\"bkgr\" type=\"number\" min=\"0\" max=\"255\" step=\"1\" style=\"width:3.25em\" value=\"255\"> " +
    "G:<input id=\"bkgg\" type=\"number\" min=\"0\" max=\"255\" step=\"1\" style=\"width:3.25em\" value=\"255\"> " +
    "B:<input id=\"bkgb\" type=\"number\" min=\"0\" max=\"255\" step=\"1\" style=\"width:3.25em\" value=\"128\"> <button id=\"btnbkgreset\">Reset</button></p>" +
    "<p><span>Font-weight:</span> <select id=\"fwsel\"><option value=\"inherit\" selected>inherit</option>" +
    "<option value=\"bold\"><b>bold</b></option><option value=\"normal\">not bold</option></select></p><p><span>Custom:</span> <input type=\"text\" " +
    "id=\"kwhicustom\" style=\"width:55%\"> <button id=\"kwhicustomapply\">Apply</button></p></td></tr></tbody></table>" +
    "<p><button id=\"btnkwhisave\">Save Changes</button> <button id=\"btnkwhicancel\">Discard Changes</button> " +
    "<button id=\"btnkwhiremove\">Hide Set</button> <button id=\"btnkwhirevert\" disabled>Revert Last Keyword Edit</button></p></form><style type=\"text/css\">" +
    "#kwhiedit{position:fixed;top:2.5vh;left:50%;transform:translateX(-50%);width:800px;max-width:95vw;max-height:95vh;overflow-y:auto;box-sizing:border-box;border:1px solid #000;border-radius:6px;padding:1em;color:#000;" +
    "background:#fafafa;z-index:2501;display:none} #kwhiedit table{width:100%;background:#fff;border-top:1px solid #000;" +
    "border-left:1px solid #000;} #kwhiedit td{padding:0 12px; vertical-align:top;border-right:1px solid #000;border-bottom:1px solid #000;}" +
    "#kwhiedit td p{margin-top:12px;} #stylecontrols>p>span{display:inline-block;width:6.5em;} " +
    "#stylecontrols input[type=\"color\"]{padding:0; width:24px; height:1.25em; border:none;}</style><style type=\"text/css\" id=\"kwhiedittemp\"></style></div>";
  document.body.appendChild(kwhied);

  // Обработчики событий окна редактирования
  document.getElementById("btnkwhisave").addEventListener("click",kwhisavechg,false);
  document.getElementById("btnkwhicancel").addEventListener("click",kwhicancel,false);
  document.getElementById("btnkwhiremove").addEventListener("click",kwhiremove,false);
  document.getElementById("btnkwhirevert").addEventListener("click",kwhirevert,false);
  document.getElementById("stylecontrols").addEventListener("input",updatestyle,false);
  document.getElementById("stylecontrols").addEventListener("change",updatecolor,false);
  document.getElementById("btntxtreset").addEventListener("click",kwhicolorreset,false);
  document.getElementById("btnbkgreset").addEventListener("click",kwhicolorreset,false);
  document.getElementById("fwsel").addEventListener("change",kwhifwchg,false);
  document.getElementById("kwhicustomapply").addEventListener("click",kwhicustom,false);
  document.getElementById("btnkwhimax").addEventListener("click",kwhimaxrestore,false);
}
THS_init();

// =========================================================================
// ДВИЖОК ПОДСВЕТКИ (CSS Custom Highlight API - Без изменения DOM страницы)
// =========================================================================

// Задержка выполнения (Debounce) для предотвращения зависаний при массовых DOM-мутациях Smartcat
var hlDebounceTimer = null;
function queueHighlight() {
  if (hlDebounceTimer) clearTimeout(hlDebounceTimer);
  hlDebounceTimer = setTimeout(function() {
    THmo_doHighlight(document.body, null);
  }, 100); // Подсветка перезапускается через 100мс после полного затишья мутаций
}

/**
 * Главная функция поиска совпадений и построения диапазонов (Highlight Ranges)
 * @param {Element} el - Контейнер для поиска (используется как ориентир)
 * @param {Array|null} subset - Массив конкретных ключей наборов для обновления (null = все)
 */
function THmo_doHighlight(el, subset){
  // Проверка поддержки современного CSS Custom Highlight API браузером
  if (!CSS || !CSS.highlights) return;

  // Ограничиваем область поиска строго целевыми ячейками редактора Smartcat
  var targetCells = document.getElementsByClassName("l-segments__cell_editor-target");
  if (targetCells.length === 0) return;

  var keyset = subset || hlkeys;

  for (var j = 0; j < keyset.length; ++j) {
    var hlset = keyset[j];

    // Проверяем, активен и видим ли текущий набор правил
    if (hlobj[hlset].visible == "true" && hlobj[hlset].enabled == "true"){
      var hlkeywords = hlobj[hlset].keywords;
      if (hlkeywords.length > 0) {

        // Преобразование обычных слов/фраз в регулярные выражения
        if (hlobj[hlset].type != "regex"){
          var rQuantifiers = /[-\/\\^$*+?.()[\]{}]/g;
          hlkeywords = hlkeywords.replace(rQuantifiers, '\\$&'); // Экранирование спецсимволов
          if (hlobj[hlset].type == "word"){
            hlkeywords = "\\b" + hlkeywords.replace(/\|/g, "\\b|\\b") + "\\b"; // Ограничение границ слов
          }
        }

        var pat = new RegExp('(' + hlkeywords + ')', 'gi');
        var ranges = [];

        // Обход всех ячеек редактора
        for (var c = 0; c < targetCells.length; c++) {
          var cell = targetCells[c];

          // Сфокусированный поиск текста строго внутри редактора `.sc-editor`
          var editorInput = cell.querySelector('.sc-editor') || cell;

          // Быстрый XPath-поиск только текстовых узлов (пропуская style, script и пустые блоки)
          var snapElements = document.evaluate(
            './/text()[normalize-space() != "" and not(ancestor::style) and not(ancestor::script)]',
            editorInput, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

          // Сканирование каждого текстового узла на совпадения
          for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {
            var node = snapElements.snapshotItem(i);
            var text = node.nodeValue;
            var match;
            pat.lastIndex = 0;

            while ((match = pat.exec(text)) !== null) {
              try {
                // Создание точного текстового диапазона без оборачивания в HTML-теги
                var range = new Range();
                range.setStart(node, match.index);
                range.setEnd(node, match.index + match[0].length);
                ranges.push(range);
              } catch (e) {
                // Безопасный перехват ошибок создания диапазонов при динамеческом изменении узлов
              }
            }
          }
        }

        // Передача диапазонов в системный реестр CSS Highlights
        if (ranges.length > 0) {
          CSS.highlights.set(hlset, new Highlight(...ranges));
        } else {
          CSS.highlights.delete(hlset);
        }
      }
    } else {
      // Удаление подсветки, если правило отключено пользователем
      CSS.highlights.delete(hlset);
    }
  }
}

/**
 * Динамическая генерация CSS-стилей ::highlight() для каждого набора
 * @param {Array} setkeys - Список ID правил
 */
function insertCSS(setkeys){
  for (var j = 0; j < setkeys.length; ++j){
    var hlset = setkeys[j];
    if (hlobj[hlset].visible == "true"){
      var rule = "::highlight(" + hlset + ") {";
      var menuRule = "." + hlset + " {"; // Псевдо-класс для отображения стиля в выпадающем меню

      // Цвет текста
      if (hlobj[hlset].textcolor.length > 0) {
        rule += "color:" + hlobj[hlset].textcolor + ";";
        menuRule += "color:" + hlobj[hlset].textcolor + ";";
      }
      // Цвет фона
      if (hlobj[hlset].backcolor.length > 0) {
        rule += "background-color:" + hlobj[hlset].backcolor + ";";
        menuRule += "background-color:" + hlobj[hlset].backcolor + ";";
      }

      // Имитация жирного шрифта через text-shadow (обход ограничения Highlight API на font-weight)
      if (hlobj[hlset].fontweight === "bold") {
        rule += "text-shadow: 0.4px 0 0 currentColor, -0.4px 0 0 currentColor;";
        menuRule += "font-weight: bold;"; // В обычном DOM меню font-weight работает напрямую
      }

      // Пользовательские CSS свойства
      if (hlobj[hlset].custom.length > 0) {
        rule += hlobj[hlset].custom + ";";
        menuRule += hlobj[hlset].custom + ";";
      }

      rule += "}";
      menuRule += "}";

      // Добавление или обновление CSS элементов <style> в DOM
      var setrule = document.querySelector('style[hlset="' + hlset +'"]');
      if (!setrule){
        var s = document.createElement("style");
        s.type = "text/css";
        s.setAttribute("hlset", hlset);
        s.appendChild(document.createTextNode(rule + "\n" + menuRule));
        document.body.appendChild(s);
      } else {
        setrule.innerHTML = rule + "\n" + menuRule;
      }
    }
  }
}

/**
 * Очистка реестра подсветок
 * @param {string|null} setnum - ID конкретного набора (или null для очистки всех)
 */
function unhighlight(setnum){
  if (!CSS || !CSS.highlights) return;
  if (setnum) {
    CSS.highlights.delete(setnum);
  } else {
    CSS.highlights.clear();
  }
}

// =========================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ИНТЕРФЕЙСА И НАСТРОЕК
// =========================================================================

// Открытие верхней панели
function editKW(e){ refreshSetList(); document.getElementById("thdtopbar").style.display = "block"; document.getElementById("thdtopspacer").style.display = "block"; }

// Открытие выпадающего списка правил
function thdDropSetList(e){ refreshSetList(); document.getElementById("thdtopdrop").style.display = "block"; }
function thddroptoggle(e){ if (document.getElementById("thdtopdrop").style.display == "none"){ thdDropSetList(); if (e.target.nodeName == "EM") kwhinewset(); } else if (e.target.nodeName == "EM"){ kwhinewset(); } else { document.getElementById("thdtopdrop").style.display = "none"; } }

// Обновление таблицы правил в выпадающем меню
function refreshSetList(e){ document.getElementById("kwhitbod").innerHTML = ""; for (var j = 0; j < hlkeys.length; ++j){ var hlset = hlkeys[j]; if (hlobj[hlset].visible == "true"){ var strchk = hlobj[hlset].enabled == "true" ? ' checked=\"checked\"' : ''; var newrow = document.createElement("tr"); var thdtypenote = hlobj[hlset].type != "string" ? '<span class="thdtype">' + hlobj[hlset].type + '</span>' : ''; newrow.setAttribute("kwhiset", hlset); newrow.innerHTML = '<td><div class=\"' + hlset + '\">' + hlobj[hlset].keywords + '</div>' + thdtypenote + '</td><td><button kwhiset=\"' + hlset + '\" title=\"Bring matches into view\">Seek</button> <button kwhiset=\"' + hlset + '\">Edit</button> <label><input type=\"checkbox\" kwhiset=\"' + hlset + '\"' + strchk + '"> Enabled </label></td>'; document.getElementById("kwhitbod").appendChild(newrow); } } }

// Обработка кликов по элементам управления правила (Edit, Checkbox Enable)
async function kwhiformevent(e){ if (e.target.nodeName == "INPUT"){ var hlsetnum = e.target.getAttribute("kwhiset"); kwhienabledisable(hlsetnum, e.target.checked); } if (e.target.nodeName == "BUTTON"){ var hlset = e.target.getAttribute('kwhiset'); if (e.target.textContent == "Edit"){ kwhicancelipe(hlset); document.querySelector('#kwhiedit tr').setAttribute('kwhiset', hlset); document.querySelector('#kwhiedit td:nth-of-type(1) p:nth-of-type(1)').className = hlset; document.querySelector('#kwhiedit td:nth-of-type(1) p:nth-of-type(1)').textContent = hlobj[hlset].keywords; document.getElementById("kwhipattype").selectedIndex = hlobj[hlset].type == "word" ? 1 : (hlobj[hlset].type == "regex" ? 2 : 0); kwhieditstyle = ["rgb(0,0,255)","rgb(255,255,0)","inherit",""]; if (hlobj[hlset].textcolor.length > 0) kwhieditstyle[0] = hlobj[hlset].textcolor; if (hlobj[hlset].backcolor.length > 0) kwhieditstyle[1] = hlobj[hlset].backcolor; if (hlobj[hlset].fontweight.length > 0) kwhieditstyle[2] = hlobj[hlset].fontweight; if (hlobj[hlset].custom.length > 0) kwhieditstyle[3] = hlobj[hlset].custom; kwhiShowEditForm(); } } }

// Включение/отключение конкретного набора
async function kwhienabledisable(hlsetnum,enable){ hlobj[hlsetnum].enabled = enable ? "true" : "false"; hljson = JSON.stringify(hlobj); if (!GM4) GM_setValue("kwstyles", hljson); else await GM.setValue("kwstyles", hljson); if (!enable) unhighlight(hlsetnum); else THmo_doHighlight(document.body,[hlsetnum]); }

// Подготовка формы для создания нового набора
function kwhinewset(e,kwtext){ document.querySelector('#kwhiedit tr').setAttribute('kwhiset', 'new'); document.querySelector('#kwhiedit td:nth-of-type(1) p:nth-of-type(1)').className = ""; document.querySelector('#kwhiedit td:nth-of-type(1) p:nth-of-type(1)').textContent = kwtext || "larry|moe|curly"; document.getElementById("kwhipattype").selectedIndex = 0; kwhieditstyle = ["rgb(0,0,255)","rgb(255,255,0)","inherit",""]; kwhiShowEditForm(); }

// Отображение диалога редактирования
function kwhiShowEditForm(){ var rule = "#stylecontrols>p>span{"; if (kwhieditstyle[0].length > 0) rule += "color:"+kwhieditstyle[0]+";"; if (kwhieditstyle[1].length > 0) rule += "background-color:"+kwhieditstyle[1]+";"; if (kwhieditstyle[2].length > 0) rule += "font-weight:"+kwhieditstyle[2]+";"; if (kwhieditstyle[3].length > 0) rule += kwhieditstyle[3]+";"; document.getElementById("kwhiedittemp").innerHTML = rule + "}"; populateRGB("txt",kwhieditstyle[0]); populateRGB("bkg",kwhieditstyle[1]); document.getElementById("fwsel").value = kwhieditstyle[2]; document.getElementById("kwhicustom").value = kwhieditstyle[3]; updateColorInputs(); document.getElementById("kwhiedit").style.display = "block"; }

// Экспорт/Импорт конфигурации правил в JSON
function kwhiexport(e){ var newWin = window.open(); newWin.document.write(JSON.stringify(hlobj)); newWin.document.close(); }
async function kwhiimport(e){ var txtImport = prompt("Paste in exported JSON:", ""); try { var objImport = JSON.parse(txtImport); hlobj = objImport; hlkeys = Object.keys(hlobj); hljson = JSON.stringify(hlobj); if (!GM4) GM_setValue("kwstyles", hljson); else await GM.setValue("kwstyles", hljson); insertCSS(hlkeys); refreshSetList(); THmo_doHighlight(document.body); } catch(err){ alert("Error: " + err); } }

// Переключатели опций в меню
async function kwhihbtn(e){ hlbtnvis = e.target.checked ? "on" : "off"; if (!GM4) GM_setValue("hlbtnvis",hlbtnvis); else await GM.setValue("hlbtnvis",hlbtnvis); document.getElementById("btnshowkwhi").style.display = e.target.checked ? "" : "none"; }
async function kwhiprecode(e){ hlprecode = e.target.checked; if (!GM4) GM_setValue("hlprecode",hlprecode); else await GM.setValue("hlprecode",hlprecode); THmo_doHighlight(document.body); }
function kwhicancelipe(setno){ var kwdiv = document.querySelector('#kwhitbod .'+setno); if (kwdiv) kwdiv.innerHTML = hlobj[setno].keywords; }
function kwhitopdropclose(e){ kwhicancelipe(''); document.getElementById('thdtopdrop').style.display='none'; }
function thsreread(e){}
async function thsframeselect(e){ hlframe = e.target.options[e.target.selectedIndex].value; if (!GM4) GM_setValue("hlframe",hlframe); else await GM.setValue("hlframe",hlframe); setthsframeopts(); }
function setthsframeopts(){ var sel = document.getElementById("hlframeselect"); for(var i=0; i<3; i++) sel.options[i].selected = (sel.options[i].value === hlframe); }
function thdseek(e){}
function thdshow(elt){}
function seekagain(dir){}
function seekfailnotc(txt){}

// Сохранение изменений в правиле
async function kwhisavechg(e){ var hlset = document.querySelector('#kwhiedit td:nth-of-type(1) p:nth-of-type(1)').className; var kwtext = document.querySelector('#kwhiedit td:nth-of-type(1) p:nth-of-type(1)').textContent; if (hlset == ""){ hlset = "set" + hlnextset; hlnextset += 1; if (!GM4) GM_setValue("hlnextset",hlnextset); else await GM.setValue("hlnextset",hlnextset); hlobj[hlset] = { keywords : kwtext, type : document.getElementById("kwhipattype").value, hlpat : "", textcolor : kwhieditstyle[0], backcolor : kwhieditstyle[1], fontweight : kwhieditstyle[2], custom : kwhieditstyle[3], enabled : "true", visible : "true", updated : "" }; hlkeys = Object.keys(hlobj); } else { hlobj[hlset].keywords = kwtext; hlobj[hlset].type = document.getElementById("kwhipattype").value; hlobj[hlset].textcolor = kwhieditstyle[0]; hlobj[hlset].backcolor = kwhieditstyle[1]; hlobj[hlset].fontweight = kwhieditstyle[2]; hlobj[hlset].custom = kwhieditstyle[3]; } hljson = JSON.stringify(hlobj); if (!GM4) GM_setValue("kwstyles", hljson); else await GM.setValue("kwstyles", hljson); insertCSS([hlset]); refreshSetList(); THmo_doHighlight(document.body,[hlset]); document.getElementById('kwhiedit').style.display='none'; }
function kwhicancel(e){ document.getElementById('kwhiedit').style.display='none'; }

// Скрытие (удаление) набора правил
async function kwhiremove(e){ var hlset = document.querySelector('#kwhiedit td:nth-of-type(1) p:nth-of-type(1)').className; if (hlset != ""){ hlobj[hlset].visible = "false"; hljson = JSON.stringify(hlobj); if (!GM4) GM_setValue("kwstyles", hljson); else await GM.setValue("kwstyles", hljson); refreshSetList(); unhighlight(hlset); document.getElementById('kwhiedit').style.display='none'; } }
async function kwhirevert(e){}

// Обработка палитры цветов в окне редактирования
function kwhicolorreset(e){ var set = document.querySelector('#kwhiedit tr').getAttribute('kwhiset'); if (e.target.id == "btntxtreset"){ kwhieditstyle[0] = set == "new" ? "rgb(0,0,255)" : hlobj[set].textcolor; populateRGB("txt",kwhieditstyle[0]); setdivstyle(["txt"]); } if (e.target.id == "btnbkgreset"){ kwhieditstyle[1] = set == "new" ? "rgb(255,255,0)" : hlobj[set].backcolor; populateRGB("bkg",kwhieditstyle[1]); setdivstyle(["bkg"]); } }
function populateRGB(prop,stylestring){ var rgbvals = stylestring.substr(stylestring.indexOf("(")+1); rgbvals = rgbvals.substr(0,rgbvals.length-1).split(","); document.getElementById(prop+"r").value = parseInt(rgbvals[0]); document.getElementById(prop+"g").value = parseInt(rgbvals[1]); document.getElementById(prop+"b").value = parseInt(rgbvals[2]); }
async function updatestyle(e){ var tgt = e.id != undefined ? e : e.target; if (tgt.id.indexOf("txt") == 0) setdivstyle(["txt"]); if (tgt.id.indexOf("bkg") == 0) setdivstyle(["bkg"]); }
function setdivstyle(props){ for (var i=0; i<props.length; i++){ if (props[i] == "txt") kwhieditstyle[0] = "rgb(" + document.getElementById("txtr").value + "," + document.getElementById("txtg").value + "," + document.getElementById("txtb").value + ")"; if (props[i] == "bkg") kwhieditstyle[1] = "rgb(" + document.getElementById("bkgr").value + "," + document.getElementById("bkgg").value + "," + document.getElementById("bkgb").value + ")"; } var rule = "#stylecontrols>p>span{"; if (kwhieditstyle[0].length > 0) rule += "color:"+kwhieditstyle[0]+";"; if (kwhieditstyle[1].length > 0) rule += "background-color:"+kwhieditstyle[1]+";"; if (kwhieditstyle[2].length > 0) rule += "font-weight:"+kwhieditstyle[2]+";"; if (kwhieditstyle[3].length > 0) rule += kwhieditstyle[3]+";"; document.getElementById("kwhiedittemp").innerHTML = rule + "}"; updateColorInputs(); }
async function updateColorInputs(){ document.getElementById('txtcolorinput').value = '#' + ('0' + parseInt(document.getElementById("txtr").value).toString(16)).slice(-2) + ('0' + parseInt(document.getElementById("txtg").value).toString(16)).slice(-2) + ('0' + parseInt(document.getElementById("txtb").value).toString(16)).slice(-2); document.getElementById('bkgcolorinput').value = '#' + ('0' + parseInt(document.getElementById("bkgr").value).toString(16)).slice(-2) + ('0' + parseInt(document.getElementById("bkgg").value).toString(16)).slice(-2) + ('0' + parseInt(document.getElementById("bkgb").value).toString(16)).slice(-2); }
async function updatecolor(e){ if (e.target.id.indexOf("colorinput") > -1){ var hexcolor = e.target.value; var prefix = e.target.id.slice(0,3); document.getElementById(prefix + 'r').value = parseInt(hexcolor.slice(1,3), 16); document.getElementById(prefix + 'g').value = parseInt(hexcolor.slice(3,5), 16); document.getElementById(prefix + 'b').value = parseInt(hexcolor.slice(5,7), 16); updatestyle(document.getElementById(prefix + 'r')); } }
function kwhifwchg(e){ kwhieditstyle[2] = e.target.value; setdivstyle([]); }
function kwhicustom(e){ kwhieditstyle[3] = document.getElementById("kwhicustom").value; setdivstyle([]); }

// Разворачивание окна редактирования на полный экран
async function kwhimaxrestore(e){ var el = document.getElementById('kwhiedit'); if (e.target.textContent == '^'){ e.target.textContent = '_'; el.style.left = '1px'; el.style.width = 'calc(100% - 3px - 2em)'; el.style.height = 'calc(100% - 4px - 2em)'; } else { e.target.textContent = '^'; el.style.left = ''; el.style.width = ''; el.style.height = ''; } }
