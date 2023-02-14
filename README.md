# gitlab-helper

## Installation
Make sure you already install nodejs in your computer by run this command:
```
node -v
```

Install `gitlab-helper` in global
```
npm install -g gitlab-helper
```

Set required environtment variable on your terminal:
```
GITLAB_HOSTNAME=<gitlab_host>
GITLAB_PROJECT_ID=<your_gitlab_project_id>
GITLAB_MERGE_REQUEST_QUERY=<query_to_filter_your_merge_request>
GITLAB_PRIVATE_TOKEN=<gitlab_private_token>
```

## Run command

### Rebase Open MR
```
rebase-mr
```