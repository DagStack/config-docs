# dagstack/config-docs

Документация `dagstack/config-spec` — Docusaurus-сайт с примерами кода на Python, TypeScript и Go, подготовленный для индексации в [context7](https://context7.com).

## Что внутри

- **`site/`** — Docusaurus 3.x (TypeScript-шаблон). Исходный язык русский; переводы добавляются командой `npm run write-translations -- --locale <code>`.
- **`site/docs/`** — пользовательская документация. Структура: `intro.mdx` + `concepts/` + `guides/` + `spec/adr/` + `reference/` + `api/`.
- **`context7.json`** — в корне. Содержит `rules` (LLM-инструкции на английском) для качественных ответов в context7-агентах.
- **`pydoc-markdown.yaml`** — конфигурация авто-генерации справочника Python API из исходников пакета `dagstack-config`.
- **`Makefile`** — команды: `make install`, `make build`, `make dev`, `make api-python`, `make validate`, `make hooks`.

## Локальный запуск

```bash
make install        # установить зависимости
make dev            # dev-сервер на :3000
make build          # статическая сборка в site/build/
make hooks          # подключить pre-commit hook (один раз после клона)
```

## Обновление API-справочника

```bash
pip install dagstack-config     # в активное venv
make api-python
```

Сгенерированные `.mdx` попадают в `site/docs/api/python/` и коммитятся в репозиторий — чтобы справка была видна сразу.

## Индексация в context7

`context7.json` в корне репозитория подготовлен, но submission в [context7.com/add-package](https://context7.com/add-package) откладывается до достижения нужной планки качества и публикации всех связанных ресурсов (config-python на pypi.org, config-typescript на npmjs.org, config-docs, опубликованный как public).

## Связанные репозитории

- [`dagstack/config-spec`](https://github.com/dagstack/config-spec) — нормативная спецификация, ADR, формат передачи.
- [`dagstack/config-python`](https://github.com/dagstack/config-python) — Python-реализация (`pip install dagstack-config`).
- [`dagstack/config-typescript`](https://github.com/dagstack/config-typescript) — TypeScript-реализация (roadmap).

## Лицензия

Apache-2.0.
