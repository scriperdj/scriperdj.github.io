---
title: "Everyone is a Manager Now: The Art of Delegating to AI Agents"
date: "2025-11-26"
category: "Technology"
---

Last week when I watched [Google's Antigravity promo video](https://youtu.be/SVCBA-pBgt0?si=e_EiskKEybW2Qgf2), I was struck by the statement, "Everyone is a manager." made me realize how true the statement was in current era of Agents. Any new role requires new skillsets and mindset. Agents are becomming more and more capable everyday but are we ready to accept the fact that we are all managers now and know how to delegate tasks to them?

In this article, I want to share my experience transitioning from a people manager to an AI agents manager, and how to avoid the trap of becoming a micro-manager who hand-holds agents through every single task.

![AI Manager Concept](/images/posts/am1.png)

### Why Developers Struggle to Delegate

Despite the hype, many developers find themselves unable to effectively offload work to AI.From the interactions I had with different engineers, I realized that many find it hard to get anything useful done by agents without handholding or taking-over after few iterations. 

Sure, it's easy to use cursor, claude, and the new Antigravity in creating new projects from scratch or make changes to existing code with auto-completion, execute some commands in terminal, etc. But every developer knows that they need to do lot more in order to get the changes to completion state. 

Below are some of the problems and how to address them so your agents can be more effective.

#### Multi-repo changes:
As your codebase grows, fixing issues might require changes in multiple repositories, frontend, backend, etc. It's not easy to get the changes to completion state without proper context and setup.

Solution:

##### Multi-repo workspace setup
Cursor & Antigravity supports multi-repo workspace setup. You can create a workspace file like below to include multiple repositories.

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

This setup indexes all the files in the specified folders and provides context to agents helping them to understand dependencies and make required changes across repos. So noext time you assign task to agent, it can plan and make required changes in multiple repos.

#### Internal processes & platform knowledge:
Each platform has its own set of processes, tools and workflows. The technical know-how about how to troubleshoot, test and deploy is not provided to agents.

Solution:

##### Shared knowledge of rules and workflows
Cursor & Antigravity supports sharing of knowledge of rules and workflows. You can create global or workspace specific knowledge that can you avoid repeating yourself.

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

You can add workspace specific workflows for starting dev server, running tests, troubleshooting, etc. After creating any workflow, you can test it by starting new agent session and running the workflow. I found the best place to look for such rules & workflows is from your previous interactions with agents. Extract the chats and ask aan agent to identify the rules and workflows that can be added globally or workspace specific. Below is a prompt that can help you do that.

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

#### Cold Feet & Trust Issues:
Before agents, I used to remember every detail of codebase exactly why I wrote it in certain way. Now, its hard to have a control over the changes made by agents because of the volume of code that its capable of generating. 

Solutions:

- Use git to track changes and revert back to previous state if needed.
- Add gaurdrails like `pre-commit` hooks to perform basic checks like coding style, security, unit-testcases and test-coverage before allowing agents to commit changes.
- Maintain project level `.cursorignore` file and `deny commands list` to control agents.

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

Apart from this, you can configure AI code reviewing tools like `CodeRabbit`, `BugBot` to perform reviews on the code generated by AI agents and add it to your CI checklist. 

#### The Feedback Loop
I observed that developers tend to takeover when performing functional and integration testing because of the complexity of setup, environment and dependencies. This adds friction to the workflow and slows down the development process that involves copying changes made by agents, testing and copying feedback to agents iteratively.

Solution:

##### Browser, terminal and MCP
The best way to avoid this to make agents perform these tests autonomously by setting up required tools including browser access, MCP and cli with least privilege access for agents. So when agents make a mistake, they can correct it themselves.

