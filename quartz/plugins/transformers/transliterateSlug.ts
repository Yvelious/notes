import { QuartzTransformerPlugin } from "../types"
import { FilePath, FullSlug } from "../../util/path"
import path from "path"

const translitMap: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
  'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
  'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
  'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
  'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch',
  'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
  'э': 'e', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
  'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
  'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
  'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
  'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch',
  'Ш': 'Sh', 'Щ': 'Shch', 'Ы': 'Y', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
}

function transliterate(text: string): string {
  return text.split('').map(char => translitMap[char] || char).join('')
}

function customSlugify(fp: FilePath): FullSlug {
  // Removing the "content/" prefix and extension
  let relative = fp.replace(/^content\//, '').replace(/\.md$/, '')

  const parsed = path.parse(relative)
  const dir = parsed.dir ? parsed.dir + '/' : ''
  let name = parsed.name

  // Transliteration
  name = transliterate(name)

  // Slugify: lowercase, only a-z0-9-, remove unnecessary ones -
  name = name.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-')

  return (dir + name) as FullSlug
}

export const TransliterateSlug: QuartzTransformerPlugin = () => ({
  name: "TransliterateSlug",
  markdownPlugins() {
    return [
      () => (_tree, file) => {
        if (file.data.filePath && !file.data.frontmatter?.permalink) {
          const newSlug = customSlugify(file.data.filePath)
          file.data.slug = newSlug
          file.data.relativePath = newSlug as unknown as FilePath
          console.log(`[TransliterateSlug] ${file.data.filePath} → /${newSlug}/`)
        }
      }
    ]
  }
})

