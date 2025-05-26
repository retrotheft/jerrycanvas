<script lang="ts">
   import { type World } from '../classes/World.svelte.js'
   import { type Snippet } from 'svelte'

   let { world, children }: { world: World, children?: Snippet } = $props()
</script>

<div id="world" style={`--width: ${world.width}px; --height: ${world.height}px; background-image: url('${world.backgroundUrl}');`}>
   {@render children?.()}
</div>

<style>
   div#world {
      position: absolute;
      background-color: seagreen;
      background-size: calc(var(--width) * var(--scale));
      background-repeat: repeat;
      width: calc(var(--width) * var(--scale));
      height: calc(var(--height) * var(--scale));
      transform: translate(var(--panX), var(--panY));
   }
</style>
