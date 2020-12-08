const github = require('@actions/github')

const bases = ['major', 'minor', 'patch']
const head = github.context.payload.repository.default_branch

module.exports = octokit => {
    Promise.all(bases.map(async base => {
        await octokit.repos.merge({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            base: base,
            head: head
        })
    }))
        .catch(e => {
            core.setFailed(e)
        })
}
