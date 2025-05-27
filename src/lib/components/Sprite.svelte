<script lang="ts">
   import { style } from '../functions/style.js'
   import { type Snippet } from 'svelte'

   let { src, onclick: onclickExternal, children, ...rest }: { src: string, onclick?: (event: MouseEvent) => void, children?: Snippet, [key: string]: any } = $props()

   const onmousedown = (e: MouseEvent) => e.stopPropagation()
   const onclick = (event: MouseEvent) => onclickExternal?.(event)
</script>

<button class="jc-sprite jc-scale-on-hover" {@attach style(rest)} {onmousedown} {onclick}>
   <img {src} alt={src} />
   {@render children?.()}
</button>

<style>
   button.jc-sprite {
      all: unset;
      position: absolute;
      transform-origin: center;
      --offset: calc(50% * var(--size, 1) * (var(--scale) - 1));
      transform:
         translate(calc(var(--x, 0) * var(--scale) * 1px - 50%), calc(var(--y, 0) * var(--scale) * 1px - 50%))
         scale(calc(var(--size, 1) * var(--scale) * var(--local-scale, 1)))
         rotate(calc(var(--angle, 0) * 1deg));
      display: grid;
      cursor: pointer;

      img {
         object-position: center;
      }
   }

   .jc-scale-on-hover {
      &:hover {
         --local-scale: 1.25;
         animation: scale-up 0.2s ease forwards;
      }

      &:not(:hover) {
         animation: scale-down 0.2s ease forwards;
      }
   }

   @property --local-scale {
      initial-value: 1;
      inherits: false;
      syntax: '<number>';
   }

   @keyframes scale-up {
      from { --local-scale: 1; }
      to { --local-scale: 1.25; }
   }

   @keyframes scale-down {
      from { --local-scale: 1.25; }
      to { --local-scale: 1; }
   }
</style>
