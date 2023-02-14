#!/usr/bin/env node

import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config()
const config = {
  hostname: process.env.GITLAB_HOSTNAME,
  project_id: process.env.GITLAB_PROJECT_ID,
  mr_query: process.env.GITLAB_MERGE_REQUEST_QUERY,
  private_token: process.env.GITLAB_PRIVATE_TOKEN
}

const main = async ({ hostname, project_id, mr_query, private_token }) => {
  const headers = {
    'PRIVATE-TOKEN': private_token
  }

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

  const mrs = await fetch(`${hostname}/api/v4/projects/${project_id}/merge_requests?${mr_query}`, requestOptions);
  const mrs_response = await mrs.json();

  const mrs_rebase = mrs_response.filter(it => !it.has_conflicts);

  for (let index = 0; index < mrs_rebase.length; index++) {
    const mr = mrs_rebase[index];
    const rebase = await fetch(`${hostname}/api/v4/projects/${project_id}/merge_requests/${mr.iid}/rebase`, {
      method: 'PUT',
      headers: headers,
    })
    const result = await rebase.json();
    console.log(`${mr.title} (${mr.iid}): ${result.rebase_in_progress}`)
  }
}

await main(config);