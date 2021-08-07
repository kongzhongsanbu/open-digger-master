module.exports = async function(config, utils) {
  const weight = config.weight;
  const table = config.table;
  const topN_repo = 100000;
  const topN_language = 20;
  const query = `SELECT 
    repo_language as language,
    COUNT(*) AS count, 
    argMax(repo_name, repo_activity) AS top_repo, 
    max(repo_activity) AS activity, 
    SUM(actor_count) AS actor_count
FROM 
(
    SELECT 
        contribute_list.repo_id AS repo_id, 
        anyLast(contribute_list.repo_name) AS repo_name, 
        max(contribute_list.repo_language) AS repo_language, 
        round(sum(sqrt(contribute_list.score)), 2) AS repo_activity, 
        COUNTDistinct(contribute_list.actor_id) AS actor_count
    FROM
    (
        SELECT
            icc.repo_id AS repo_id, 
            icc.repo_name AS repo_name, 
            icc.actor_id AS actor_id, 
            mpc.repo_language AS repo_language, 
            ${weight.issueCommentWeight}*icc.count+${weight.openIssueWeight}*oic.count+${weight.openPullWeight}*opc.count+${weight.pullReviewWeight}*rcc.count+${weight.mergePullWeight}*mpc.count AS score
        FROM 
        (
            SELECT 
                repo_id, 
                anyLast(repo_name) AS repo_name, 
                actor_id, 
                COUNT(*) AS count
            FROM ${table}
            WHERE (type = 'IssueCommentEvent') AND (action = 'created')
            GROUP BY 
                repo_id, 
                actor_id
        ) AS icc
        LEFT JOIN 
        (
            SELECT 
                repo_id, 
                actor_id, 
                COUNT(*) AS count
            FROM ${table}
            WHERE (type = 'IssuesEvent') AND (action = 'opened')
            GROUP BY 
                repo_id, 
                actor_id
        ) AS oic ON (icc.repo_id = oic.repo_id) AND (icc.actor_id = oic.actor_id)
        LEFT JOIN 
        (
            SELECT 
                repo_id, 
                actor_id, 
                COUNT(*) AS count
            FROM ${table}
            WHERE (type = 'PullRequestEvent') AND (action = 'opened')
            GROUP BY 
                repo_id, 
                actor_id
        ) AS opc ON (icc.repo_id = opc.repo_id) AND (icc.actor_id = opc.actor_id)
        LEFT JOIN 
        (
            SELECT 
                repo_id, 
                actor_id, 
                COUNT(*) AS count
            FROM ${table}
            WHERE (type = 'PullRequestReviewCommentEvent') AND (action = 'created')
            GROUP BY 
                repo_id, 
                actor_id
        ) AS rcc ON (icc.repo_id = rcc.repo_id) AND (icc.actor_id = rcc.actor_id)
        LEFT JOIN 
        (
            SELECT 
                repo_id, 
                issue_author_id AS actor_id, 
                max(repo_language) AS repo_language, 
                COUNT(*) AS count
            FROM ${table}
            WHERE (type = 'PullRequestEvent') AND (action = 'closed') AND (pull_merged = 1)
            GROUP BY 
                repo_id, 
                actor_id
        ) AS mpc ON (icc.repo_id = mpc.repo_id) AND (icc.actor_id = mpc.actor_id)
    ) AS contribute_list
    GROUP BY repo_id
    ORDER BY repo_activity DESC
    LIMIT ${topN_repo}
)
WHERE language != ''
GROUP BY language
ORDER BY count DESC
LIMIT ${topN_language}
`;
  
  const data = await utils.queryGitHubEventLog(query);

  const keys = ['language', 'count', 'top_repo', 'activity', 'actor_count'];
  
  return {
    html: `
    ${utils.genComponentTitle(`GitHub most used ${topN_language} languages`)}
    ${utils.genComponentContent(`We have collected activity statistics and the ranking of the most used languages.`)}
    ${utils.genTable({
      keys,
      data,
    })}`,
    css: '',
    js: '',
  };
}
