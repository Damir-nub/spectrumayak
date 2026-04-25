# Playwright MCP Server - Руководство по использованию

## Установка完成 ✅

**Пакет**: `playwright-mcp-tabbed` v1.1.2
**Лицензия**: MIT
**Безопасность**: ✅ Только 2 зависимости, без веб-сертера

## Что это такое

MCP сервер для автоматизации браузера Playwright с поддержкой **параллельных агентов**. Каждый агент может работать в своём табе, разделяя cookies и login state.

## Доступные команды

### Управление табами

- `browser_tabs` - создать/закрыть/листать табы
- `browser_context_info` - информация о открытых табах

### Навигация

- `browser_navigate` - перейти на URL (поддерживает tab_index/tab_id)
- `browser_navigate_back` - назад

### Содержимое страницы

- `browser_snapshot` - HTML снимок страницы
- `browser_take_screenshot` - скриншот страницы
- `browser_evaluate` - выполнить JavaScript

### Действия на странице

- `browser_click` - клик по элементу
- `browser_type` - ввод текста
- `browser_fill_form` - заполнение формы
- `browser_select_option` - выбор в dropdown
- `browser_press_key` - нажатие клавиш
- `browser_hover` - наведение мыши
- `browser_drag` - drag-and-drop

### Отладка

- `browser_network_requests` - сетевые запросы
- `browser_console_messages` - консоль браузера

### Дополнительно

- `browser_resize` - размер окна
- `browser_file_upload` - загрузка файлов
- `browser_handle_dialog` - обработка alert/confirm
- `browser_wait_for` - ожидание условий
- `browser_run_code` - выполнить Playwright код
- `browser_close` - закрыть браузер
- `browser_install` - установить браузеры

## Ключевая особенность: tab_index

Почти все команды принимают **`tab_index`** или **`tab_id`** для работы с конкретным табом:

```json
{ "tab_index": 0 }  // первый таб
{ "tab_index": 1 }  // второй таб
{ "tab_id": "550e8400-e29b-41d4-a716-446655440000" }  // стабильный ID
```

## Примеры использования

### Открыть Google и сделать скриншот

```
1. browser_navigate → url: "https://google.com", tab_index: 0
2. browser_take_screenshot → tab_index: 0
```

### Заполнить форму

```
1. browser_navigate → url: "https://example.com", tab_index: 0
2. browser_fill_form → tab_index: 0, selector: "#name", value: "John"
3. browser_click → tab_index: 0, selector: "button[type='submit']"
```

### Параллельная работа в двух табах

```
Таб 1: browser_navigate → url: "https://example.com/page1", tab_index: 0
Таб 2: browser_navigate → url: "https://example.com/page2", tab_index: 1
```

## Конфигурация

Файл: `.mcp.json` (в корне проекта)

```json
{
  "mcpServers": {
    "playwright-tabbed": {
      "command": "node",
      "args": [
        "/g/DOM PROEKT/node_modules/playwright-mcp-tabbed/dist/index.js"
      ],
      "env": {
        "PLAYWRIGHT_MCP_RECORD_VIDEO_DIR": "/g/DOM PROEKT/.claude/playwright-recordings"
      }
    }
  }
}
```

## Видео-запись

Когда `PLAYWRIGHT_MCP_RECORD_VIDEO_DIR` задан, каждая сессия записывается в видео.
Файлы сохраняются в `.claude/playwright-recordings/`

## Следующие шаги

**ВАЖНО**: MCP сервер загружается при старте Claude Code. Чтобы начать пользоваться:

1. Перезапустите этот сеанс Claude Code
2. Или закройте и откройте проект заново
3. MCP сервер появится в списке доступных инструментов

## Безопасность

✅ **Локальный только** - браузер запускается на вашей машине
✅ **Без интернета** - всё работает локально (localhost)
✅ **Минимальные зависимости** - только @modelcontextprotocol/sdk + playwright
✅ **Open Source** - [GitHub репозиторий](https://github.com/songofhawk/playwright-mcp-tabbed)

## Troubleshooting

Если MCP сервер не появился:

1. Проверьте, что файл `.mcp.json` существует
2. Перезапустите Claude Code полностью
3. Проверьте логи на ошибки при запуске

## Документация

- [Официальный README](node_modules/playwright-mcp-tabbed/README.md)
- [GitHub репозиторий](https://github.com/songofhawk/playwright-mcp-tabbed)
