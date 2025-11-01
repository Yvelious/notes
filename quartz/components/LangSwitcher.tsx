// quartz/components/LangSwitcher.tsx
import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore — как в примере из доков: inline-бандлер возвращает строку со скриптом
import langScript from "./scripts/lang-switcher.inline"

export default (() => {
  const LangSwitcher: QuartzComponent = () => {
    return (
      <nav class="lang-switcher" id="lang-switcher">
        <a href="/notes/de/">De</a>
        <a href="/notes/en/">En</a>
        <a href="/notes/ru/">Ru</a>
      </nav>
    )
  }

  // Включаем клиентский скрипт для этого компонента
  LangSwitcher.afterDOMLoaded = langScript
  return LangSwitcher
}) satisfies QuartzComponentConstructor
