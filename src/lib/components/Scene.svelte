<script lang="ts">
   import '$lib/assets/scene.css'
   import { type Scene } from '../classes/Scene.svelte.js'
   import { type Snippet } from 'svelte'

   let { scene, children }: { scene: Scene, children?: Snippet } = $props()
</script>

<div class="jc-scene" style={`--width: ${scene.width}px; --height: ${scene.height}px; background-image: url('${scene.backgroundUrl}');`}>
   {@render children?.()}
</div>
