const { OPENAI_API_KEY } = process.env

type Path = 'completions' | 'create' | 'delete'

const fetcher = <T>(path: Path, body: Record<string, unknown>) =>
  fetch(`https://api.openai.com/v1/chat/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json() as Promise<T>)

interface Completion {
  id: string
  created: number
  choices: {
    message: {
      role: string
      content: string
    }
    index: number
    finish_reason: string
  }[]
}

const role = 'user'
const model = 'gpt-3.5-turbo'

export const completions = (content: string) => {
  const body = { model, messages: [{ role, content }] }

  return fetcher<Completion>('completions', body)
}
