<script lang="ts">
   import { type Scene } from '../classes/Scene.svelte.js'
   import { type Snippet } from 'svelte'

   let { scene, children }: { scene: Scene, children?: Snippet } = $props()
</script>

<div class="jc-scene" style={`--width: ${scene.width}px; --height: ${scene.height}px; background-image: url('${scene.backgroundUrl}');`}>
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
