function highlightLang() {
  const path = window.location.pathname
  const links = document.querySelectorAll<HTMLAnchorElement>("#lang-switcher a")
  links.forEach((a) => {
    a.classList.remove("active")

    const raw = a.getAttribute("data-href") || ""
    const newPath = replaceLangCode(path, raw)

    // We normalize it to an absolute path and take only pathname
    const hrefPath = new URL(raw, window.location.origin).pathname

    a.setAttribute("href", newPath)

    // Highlight if the current path matches/is inside the desired language
    if (hrefPath === "/" ? path === "/" : (path === hrefPath || path.includes(hrefPath))) {
      a.classList.add("active")
    }
  })
}

function replaceLangCode(originalUrl: string, newLang: string) {
  const langRegex = /\/(en|de|ru)\//i

  if (langRegex.test(originalUrl)) {
    return originalUrl.replace(langRegex, `${newLang}`)
  } else {
    console.warn("The language code (/xx/) was not found in the string")
    return originalUrl
  }
}


// First launch after loading the DOM
document.addEventListener("DOMContentLoaded", highlightLang)

// Restart after every Quartz navigation (SPA)
document.addEventListener("nav", () => {
  highlightLang()
  // Recommended Handler Cleaning
  window.addCleanup?.(() => {
  })
})
