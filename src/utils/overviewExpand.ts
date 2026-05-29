export function checkOverflow(el: HTMLParagraphElement) {
  if (!el) return

  const lineHeight = Math.ceil(parseFloat(getComputedStyle(el).lineHeight))
  const maxHeight = lineHeight * 4

  el.style.webkitLineClamp = 'unset'
  el.style.display = 'block'
  const realHeight = el.scrollHeight
  el.style.webkitLineClamp = ''
  el.style.display = ''

  return realHeight > maxHeight + lineHeight * 0.5
}
