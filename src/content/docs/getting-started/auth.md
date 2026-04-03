---
title: Authentication
description: How to authenticate with the MARC27 API
---

## Three Auth Methods

### 1. API Key (for agents and scripts)

Generate at [platform.marc27.com/dashboard/api-keys](https://platform.marc27.com/dashboard/api-keys) or via the API.

```bash
curl -H "X-API-Key: m27_your_key_here" \
  https://api.marc27.com/api/v1/users/me
```

- Never expires
- Tied to a user + project
- Preferred for automation, agents, CI/CD

### 2. JWT (for browser sessions)

OAuth login via GitHub, Google, ORCID, or SSO/SAML. The platform exchanges the OAuth token for a platform JWT.

```
Authorization: Bearer eyJ0eXAiOiJKV1Qi...
```

- Expires (refresh with `/api/v1/auth/refresh`)
- Used by the dashboard and SDK

### 3. Device Flow (for CLI)

`prism login` uses the device flow — you get a URL, open it in your browser, approve, and the CLI stores the token.

```bash
prism login
# Opens browser → approve → done
# Token stored at ~/.prism/credentials.json
```

## For AI Agents

Set one environment variable:

```bash
export MARC27_API_KEY=m27_your_key_here
```

Every `prism --platform` command and API call uses it automatically. No login, no token refresh, no OAuth dance.
