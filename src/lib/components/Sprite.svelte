<script lang="ts">
   import '$lib/assets/sprite.css'
   import { style } from '../functions/style.js'
   import { type Snippet } from 'svelte'

   let { src, children, ...rest }: { src: string, children?: Snippet, [key: string]: any } = $props()

   const onmousedown = (e: MouseEvent) => e.stopPropagation()
</script>

<button class="sprite" {@attach style(rest)} {onmousedown}>
   <img {src} alt={src} />
   {@render children?.()}
</button>
