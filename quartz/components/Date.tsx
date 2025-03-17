import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"
import { QuartzComponentProps } from "./types"

interface Props {
  locale?: ValidLocale
  fileData: QuartzComponentProps["fileData"]
}

export type ValidDateType = keyof Required<QuartzPluginData>["dates"]

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): Date | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`,
    )
  }
  return data.dates?.[cfg.defaultDateType]
}

export function formatDate(d: Date, locale: ValidLocale = "en-US"): string {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export function Date({ fileData, locale }: Props) {
  const dateString = fileData.frontmatter?.published
  const date = dateString ? new Date(dateString) : undefined
  return date ? <time datetime={date.toISOString()}>{formatDate(date, locale)}</time> : null
}