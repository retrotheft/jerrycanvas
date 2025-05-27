<script lang="ts">
   import { type Scene } from '../classes/Scene.svelte.js'
   import { type Snippet } from 'svelte'

   let { scene, children }: { scene: Scene, children?: Snippet } = $props()

   function setStyles(element: HTMLDivElement) {
      element.style.setProperty('--width', scene.width + 'px')
      element.style.setProperty('--height', scene.height + 'px')
      if (scene.backgroundUrl) element.style.setProperty('background-image', `url(${scene.backgroundUrl})`)
   }
</script>

<div class="jc-scene" {@attach setStyles}>
   {@render children?.()}
</div>

<style>
   div.jc-scene {
      position: absolute;
      background-size: calc(var(--width) * var(--scale));
      width: calc(var(--width) * var(--scale));
      height: calc(var(--height) * var(--scale));
      transform: translate(var(--pan-x), var(--pan-y));
   }
</style>
