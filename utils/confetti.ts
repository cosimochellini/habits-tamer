import { logger } from '@/istances/logger'

const emojis = ['🏆', '🌈', '⚡️', '💥', '✨', '💫', '🌸', '🦄', '🦹‍']

const randomChoice = () => Math.random() > 0.5
export const randomConfetti = async () => {
  const Confetti = await import('js-confetti').then((m) => m.default)
  const jsConfetti = new Confetti()

  const useEmojis = randomChoice()
  const randomEmojis = emojis.filter(randomChoice)

  jsConfetti
    .addConfetti({
      emojis: useEmojis ? randomEmojis : undefined,
      emojiSize: 20,
    })
    .catch(logger.error)
}
