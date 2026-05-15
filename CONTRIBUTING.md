# Contributing

A short set of conventions for page authors and reviewers.

## Language

- Page prose is written **in English**.
- Identifier names, config keys, constant values, and the contents of fenced blocks stay in **English**.
- Avoid jargon and anglicisms where a plain English equivalent reads better. Prefer "registration" over "register-flow", "subscription" over "sub", "deprecated" stays as is, "payload", "fallback", "binding", "wire format", "snapshot" — keep them when they are technical terms of art, otherwise prefer plain wording.
- `rules` in `context7.json` — **English** (LLM-first).

## Code-example tabs

The only allowed pattern is `<Tabs>` + `<TabItem>` with regular fenced code inside:

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="lang" queryString="lang">
  <TabItem value="python" label="Python">
    ```python
    # ...
    ```
  </TabItem>
  <TabItem value="typescript" label="TypeScript">
    ```ts
    // ...
    ```
  </TabItem>
  <TabItem value="go" label="Go">
    ```go
    // ...
    ```
  </TabItem>
</Tabs>
```

Mandatory rules:

- `groupId="lang"` on every block — language selection is synced site-wide.
- `queryString="lang"` — selection is reflected in the URL (`?lang=go`).
- Tab order: **Python → TypeScript → Go**.
- `value=` is strictly `python`, `typescript`, `go` (lowercase, no abbreviations).
- Every fenced block declares a language explicitly (`python`, `ts`, `go`, `bash`, `yaml`, `json`, `toml`).

**Forbidden**:

- Custom JSX wrappers around code (`<CodeExample>`, `<MultiCode>`). The context7 parser doesn't understand them — snippets lose their language.
- `<Tabs>` inside `<details>` or admonitions (`:::note`, `:::tip`). The parser skips nested structures.
- A fenced block with no language or language `text`.
- `groupId="lang"` on tabs that switch **something other than languages** (for example, between runtime adapters). For those, use a separate `groupId` (`"runtime-spec"`, `"os"`, …) or no `groupId` at all.

## Naming dispatch classes and runtimes

The canonical form in prose (page text) uses hyphens:

- "singleton", "broadcast-collect", "broadcast-notify", "chain", "capability" (dispatch classes).
- "in_process", "mcp_stdio", "mcp_http" (runtimes — snake_case, matching the TOML value).

In `toml`/`json`/`yaml`/`code` use snake_case throughout (`broadcast_collect`, `broadcast_notify`), because that's how it's written in the manifest and code.

## Scoping concepts and guides

- **`docs/concepts/`** — "what it is and when to apply it." Overviews, tables, decision flowcharts.
- **`docs/guides/`** — "how to do it and run it." Step-by-step walkthroughs, CI integration, debugging.
- **`docs/spec/adr/`** — "why this was decided." Normative synopses with cross-language examples plus a link to the full ADR.
- **`docs/reference/`** — "where to find the exact specification." Tables of every field, enum value, and error class.

Overlap is natural, but each page dominates in its own category: a concept page should not be a tutorial, and a guide should not replace a normative spec.

## Headings and slugs

Plain prose headings produce predictable URLs, but to keep slugs stable and SEO-friendly, always specify them explicitly:

```mdx
---
sidebar_position: 1
title: Plugin registration
description: <1-2 sentences — context7 uses this as a snippet>
slug: /concepts/registration
---

# Plugin registration

## Overview {#overview}

Content...

## Errors {#errors}
```

Every H2/H3 carries an explicit `{#id}` in English.

## Page structure

- Frontmatter with `title`, `description`, `slug`, optionally `sidebar_position`.
- One H1 (generated from `title`).
- H2 — one operation / concept per heading.
- **Prose → `<Tabs>`**, not `<Tabs>` → prose. API description before the code block.
- Snippets are self-contained (each runs independently of its neighbors).
- Realistic names (`acme-corp`, not `foo`).

## Privacy: what does NOT go into the public repo

The names of internal systems and integrations that must not appear in public documentation are tracked in a **local** `.scrub-patterns` file (gitignored, maintained by core contributors). Before every push, run:

```bash
make scrub-check
```

The command reads patterns from `.scrub-patterns` and reports matches in changed files. If `.scrub-patterns` is not present (e.g., you are an external contributor), the check is silently skipped — but an internal reviewer will run it before merge.

The general rule is to **use generic domains in examples** (SaaS, e-commerce, dev tool, coding assistant). Avoid mentioning specific products, customers, or internal services. If an example was inspired by a real pilot case, rewrite it as generic.

## Local checks before a PR

```bash
make build        # build the site, make sure there are no errors
make validate     # validate context7.json + scrub-check
```

## Pre-commit hook (recommended)

Once after cloning the repo, run:

```bash
make hooks
```

This sets `core.hooksPath` to the `.githooks/` directory. Before each commit, `.githooks/pre-commit` runs automatically and checks:

- If `context7.json` is staged — that it is valid JSON.
- If `.scrub-patterns` is present locally — that the changed files contain no scrub-list names.

You can skip the check with `git commit --no-verify`, but it's not recommended — CI won't let invalid artifacts through anyway.

## CI (build gate)

Every PR and push to `main` triggers the `.gitea/workflows/docs.yml` workflow:

1. `context7.json` validation.
2. `npm ci` + `npm run build` in the `site/` subdirectory — a full site build that fails on broken links and MDX errors.
3. A check that `site/build/index.html` and `site/build/docs` exist — guards against "built successfully but empty."

The workflow runs on the `dagstack-runner` tag.

## Commit messages

- Conventional Commits: `feat(docs): ...`, `fix(docs): ...`, `chore(docs): ...`.
- First line — English imperative. Body details may be in English or Russian.
- No `Co-Authored-By Claude`, no "🤖 Generated with ...", no "AI-assisted".

## Identity

```bash
git config user.name "Evgenii Demchenko"
git config user.email "demchenkoev@gmail.com"
```

For `dagstack/*` repositories the email is gmail (public identity).
