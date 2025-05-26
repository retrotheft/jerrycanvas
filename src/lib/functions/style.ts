import { type Attachment } from "svelte/attachments"

export function style(obj: Object): Attachment<HTMLElement> {
   return function (element: HTMLElement) {
      if (!obj) return
      Object.entries(obj).forEach(([key, value]) => {
         element.style.setProperty(`--${key}`, String(value))
      })
   }
}
