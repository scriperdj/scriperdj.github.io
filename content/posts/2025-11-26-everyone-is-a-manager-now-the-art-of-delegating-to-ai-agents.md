---
title: "Everyone is a Manager Now: The Art of Delegating to AI Agents"
date: "2025-11-26"
category: "Technology"
---

Last week when I watched [Google's Antigravity promo video](https://youtu.be/SVCBA-pBgt0?si=e_EiskKEybW2Qgf2), I was struck by the statement, "Everyone is a manager." It made me realize how true the statement was in the current era of Agents. Any new role requires new skillsets and mindset. Agents are becoming more and more capable everyday but are we ready to accept the fact that we are all managers now and know how to delegate tasks to them?

In this article, I want to share my experience transitioning from a people manager to an AI agents manager, and how to avoid the trap of becoming a micro-manager who hand-holds agents through every single task.

![AI Manager Concept](/images/posts/am1.png)

### Why Developers Struggle to Delegate

Despite the hype, many developers find themselves unable to effectively offload work to AI. From the interactions I had with different engineers, I realized that many find it hard to get anything useful done by agents without handholding or taking-over after few iterations. 

Sure, it's easy to use cursor, claude, and the new Antigravity for tasks like fixing a bug, creating new projects from scratch, making changes to existing code with auto-completion, executing some commands in terminal, etc. But every developer knows that they need to do a lot more in order to orchestrate bridge the gap, getting the tasks to completion state. 

The following sections outline key challenges in agent delegation and practical solutions to enhance their autonomy

### 1. Break Down Silos with Multi-Repo Workspaces

> **The Friction:** As your codebase grows, fixing issues often requires touching multiple repositories (frontend, backend, infra). Agents restricted to a single repo lack the context to understand these dependencies, leading to incomplete fixes.

**The Fix:** Create a unified workspace. Cursor & Antigravity support multi-repo workspace setups via a simple JSON configuration. This allows the agent to perform semantic search across your entire stack. You can create a workspace file like below to include multiple repositories.

```json
{
    "folders": [
        {
            "path": "frontend"
        },
        {
            "path": "backend"
        }
    ],
    "settings": {
        "editor.formatOnSave": true
    }
}
```

This setup indexes all the files in the specified folders and provides context to agents helping them to understand dependencies and make required changes across repos. So next time you assign task to agent, it can plan and make required changes in multiple repos by performing semantic search instead of just grepping through files.

### 2. Codify Your Institutional Knowledge

> **The Friction:** Each platform has its own set of processes, tools, and workflows. The technical know-how about how to troubleshoot, test, and deploy is often "tribal knowledge" not accessible to agents.

**The Fix:** Share your knowledge of rules and workflows. Cursor & Antigravity support sharing context via global or workspace-specific rules. This prevents you from having to repeat the same instructions for every task.

Below is example of global rule we use in our organization.

```md
## Kubernetes Pod Operations 
- Use rancher cli to perform operations on k8s pods
- Resolve the required cluster & pod by using switch command in rancher cli
## Git Workflow
- Branch naming: Use JIRA ticket ID 
- PR title: `<JIRA-ID>: <short summary>`
- Base branch: Usually `develop`
```
![Rules and workflows](/images/posts/ag-rules.png)

You can also add workspace specific commands for starting dev server, running tests, troubleshooting, etc. After creating any workflow, you can test it by starting new agent session and running the workflow. I found the best place to look for such rules & workflows is from your previous interactions with agents. Extract the chats and ask an agent to identify the rules and workflows that can be added globally or workspace specific. Below is a prompt that can help you do that.

```md
You are extracting reusable rules and command patterns from past chat transcripts.

INPUTS
- Repo name: {REPO_NAME}
- Repo path: {REPO_PATH}
- Chat transcript(s): {CHAT_PATHS or paste inline}

TASK
Extract and classify patterns from the chat(s):
- Global rules: kubectl workflows, package manager usage, CORS/proxy practices (repo-agnostic)
- Repo rules: routes/ports, vite config, build commands, nx mappings
- Command patterns: natural-language → parameterized shell (e.g., "exec into <pod-type>")
- Memories: dynamic facts (pod names, paths) - for Cursor memory, NOT rules

PROCESS
1. Identify repeated behaviors, operational commands, troubleshooting flows
2. Normalize: use placeholders (<pod-type>, <app>, <port>), prefer non-interactive flags
3. Deduplicate: collapse similar rules, replace literals with parameters
4. Validate: no conflicts, commands are runnable

OUTPUT (6 sections with code fences)
1) GLOBAL_RULES - cross-repo patterns (e.g., "exec into <pod-type>": kubectl get pods | grep <pod-type>)
2) REPO_RULES - {REPO_NAME}-specific config
3) REUSABLE_COMMAND_PATTERNS - grouped by type (exec, logs, port-forward, etc.)
4) MEMORIES - dynamic facts (pod names, paths, namespaces)
5) OPTIONAL_SYNC_SCRIPT - automation if needed
6) QUICK_TESTS - 2-3 NL commands to verify rules

STYLE
- Concise and imperative
- Use placeholders: <pod-type>, <app>, <port>
- Never hardcode volatile values in rules
```

### 3. Build Trust with Automated Guardrails

> **The Friction:** Before agents, I used to remember every detail of the codebase and exactly why I wrote it in a certain way. Now, it's hard to have control over the changes made by agents because of the sheer volume of code they are capable of generating.

**The Fix:** Implement automated checks. Instead of manually reviewing every line, rely on tools to enforce standards:

- **Version Control:** Use git to track changes and revert back to previous state if needed.
- **Ignore Lists:** Maintain project level `.cursorignore` file and `deny commands list` to control agents.
- **AI Code Review:** Configure AI code reviewing tools like `CodeRabbit`, `BugBot` to perform reviews on the code generated by AI agents and add it to your CI checklist. 
- **Pre-commit Hooks:** Add guardrails like `pre-commit` hooks to perform basic checks like coding style, security, unit-testcases and test-coverage before allowing agents to commit changes. Below is a sample pre-commit config for python projects.

```yaml
repos:
 # Code style and formatting
 - repo: https://github.com/astral-sh/ruff-pre-commit
   rev: v0.11.12
   hooks:
     - id: ruff  # Python linter
       args: ["--fix"]
     - id: ruff-format  # Python formatter

 # Basic file checks
 - repo: https://github.com/pre-commit/pre-commit-hooks
   rev: v4.5.0
   hooks:
     - id: check-yaml  # Validates YAML files
       args: [--allow-multiple-documents]
     - id: check-toml  # Validates TOML files
       additional_dependencies: [tomli]
     - id: check-case-conflict  # Checks for files with names that would conflict on case-insensitive filesystems
     - id: check-merge-conflict  # Checks for files that contain merge conflict strings
     - id: debug-statements  # Checks for debugger imports and py37+ breakpoint() calls
     - id: detect-private-key  # Detects the presence of private keys
     - id: end-of-file-fixer  # Makes sure files end in a newline and only a newline
     - id: mixed-line-ending  # Replaces or checks mixed line ending

 # Security checks
 - repo: https://github.com/PyCQA/bandit
   rev: 1.7.7
   hooks:
     - id: bandit
       args: ["-c", "pyproject.toml"]
       additional_dependencies: ["bandit[toml]"]


 # Local hooks
 - repo: local
   hooks:
     # Run main tests
     - id: pytest-main
       name: pytest (main tests)
       entry: uv run pytest
       language: python
       types: [python]
       pass_filenames: false
       additional_dependencies: ['pytest', 'pytest-xdist']
       args: ["-v", "--tb=short", "--maxfail=1", "tests/", "-n", "auto"]

     # Check dependency conflicts
     - id: uv-dependency-check-mvda
       name: Check dependency conflicts
       entry: uv pip check
       language: python
       files: ^(pyproject\.toml|uv\.lock)$
       pass_filenames: false
```



### 4. Close the Loop with Autonomous Tools

> **The Friction:** Developers often take over when performing functional and integration testing because of the complexity of setup, environment, and dependencies. This breaks the feedback loop and slows down the process of iteratively refining the agent's work.

**The Fix:** Empower agents with tools. The best way to avoid this is to make agents perform these tests autonomously by setting up required tools including browser access, MCP, and CLI with least privilege access. This allows agents to identify mistakes and correct them without human intervention.

![MCP ](/images/posts/ag-mcp.png)

### Conclusion: From Micro-Manager to AI Agents Manager

Delegating to AI agents is a skill that requires a shift in mindset. Instead of treating them like junior developers who need constant supervision, treat them like capable team members who need clear context, knowledge, access, defined boundaries, and the right tools to succeed.

To stop micro-managing your AI agents:

1.  **Provide Context**: Use multi-repo workspaces to give them the full picture.
2.  **Document Processes**: Codify your knowledge into rules and workflows they can follow.
3.  **Trust but Verify**: Implement automated guardrails (pre-commit hooks, CI checks) so you don't have to manually review every character.
4.  **Empower Autonomy**: Give them the tools (CLI, MCP, Browser) to test and validate their own work.

I hope this article was helpful. The truth is, we are all still figuring out this new way of working. If you have other tips for managing AI agents effectively, I'd love to learn from them in the comments.
