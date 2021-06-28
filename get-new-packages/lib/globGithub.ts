import type { Octokit } from '@octokit/rest'

// TODO: Double **
const globGithub = async (
  glob: string,
  octokit: Octokit,
  owner: string,
  repo: string,
  ref?: string
): Promise<string[]> => {
  const getFiles = async (glob: string[], path = ''): Promise<string[]> => {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      ref,
      path
    })
    if (data instanceof Array) {
      return (await Promise.all(data
        .filter(({ name }) => glob[0] === '*' || name === glob[0])
        .map(async ({ path }) => {
          if (glob.length > 1) return await getFiles(glob.slice(1), path)
          else return path
        })))
        .flat(1)
    } else return []
  }
  return await getFiles(glob.split('/'))
}

export default globGithub
