import { QuartzTransformerPlugin } from "../types"

export const HidePrivateBlocks: QuartzTransformerPlugin = () => {
  // > [!hidden-in-public]-   или   > [!raw-hidden]
  const headerRe = /^>\s*\[\!(hidden-in-public|raw-hidden)\]\s*[- ]?\s*$/

  return {
    name: "HidePrivateBlocks",

    textTransform(_ctx, src) {
      const lines = src.split(/\r?\n/)
      const out: string[] = []

      let i = 0
      while (i < lines.length) {
        // нашли заголовок скрытого блока
        if (headerRe.test(lines[i])) {
          i++

          // 🔑 вырезаем ВСЕ строки blockquote
          while (i < lines.length && lines[i].startsWith(">")) {
            i++
          }

          continue
        }

        out.push(lines[i])
        i++
      }

      return out.join("\n")
    },
  }
}
