<script lang="ts">
   import { style } from '../functions/style.js'
   import { type Snippet } from 'svelte'

   let { src, children, ...rest }: { src: string, children?: Snippet, [key: string]: any } = $props()

   function onmousedown(event: MouseEvent) {
      event.stopPropagation()
   }
</script>

<button {@attach style(rest)} {onmousedown}>
   <img {src} alt={src} />
   {@render children?.()}
</button>

<style>
   @property --local-scale {
      initial-value: 1;
      inherits: false;
      syntax: '<number>';
   }

   button {
      all: unset;
      position: absolute;
      transform-origin: center;
      --offset: calc(50% * var(--size, 1) * (var(--scale) - 1));
      transform:
         translate(calc(var(--x, 0) * var(--scale) * 1px - 50%), calc(var(--y, 0) * var(--scale) * 1px - 50%))
         /* translate(calc(var(--x, 0) * var(--scale) * 1px - 50% * var(--size)), calc(var(--y, 0) * var(--scale) * 1px - 50% * var(--size)))
         translate(calc(-50% * (1 - var(--size))), calc(-50% * (1 - var(--size)))) */
         scale(calc(var(--size, 1) * var(--scale) * var(--local-scale, 1)))
         rotate(calc(var(--angle, 0) * 1deg));
      display: grid;
   }

   button:hover {
      --local-scale: 1.25;
      animation: scale-up 0.2s ease forwards;
      cursor: pointer;
   }

   button:not(:hover) {
      animation: scale-down 0.2s ease forwards;
   }

   img {
      object-position: center;
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
