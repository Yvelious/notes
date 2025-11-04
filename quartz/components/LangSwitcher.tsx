// quartz/components/LangSwitcher.tsx
import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore — как в примере из доков: inline-бандлер возвращает строку со скриптом
import langScript from "./scripts/lang-switcher.inline"

export default (() => {
  const LangSwitcher: QuartzComponent = ({cfg}) => {
    const baseUrl = cfg?.baseUrl ?? "/"
    return (
      <nav class="lang-switcher" id="lang-switcher">
        <a href={`${baseUrl}de/`} data-href={'/de/'}>De</a>
        <a href={`${baseUrl}en/`} data-href={'/en/'}>En</a>
        <a href={`${baseUrl}ru/`} data-href={'/ru/'}>Ru</a>
      </nav>
    )
  }

  // Включаем клиентский скрипт для этого компонента
  LangSwitcher.afterDOMLoaded = langScript
  return LangSwitcher
}) satisfies QuartzComponentConstructor
