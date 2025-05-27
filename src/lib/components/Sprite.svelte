<script lang="ts">
   import '$lib/assets/sprite.css'
   import { style } from '../functions/style.js'
   import { type Snippet } from 'svelte'

   let { src, onclick: onclickExternal, children, ...rest }: { src: string, onclick?: (event: MouseEvent) => void, children?: Snippet, [key: string]: any } = $props()

   const onmousedown = (e: MouseEvent) => e.stopPropagation()
   const onclick = (event: MouseEvent) => onclickExternal?.(event)
</script>

<button class="jc-sprite" {@attach style(rest)} {onmousedown} {onclick}>
   <img {src} alt={src} />
   {@render children?.()}
</button>
