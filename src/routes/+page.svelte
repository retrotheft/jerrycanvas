<script lang="ts">
   import { Scene } from '$lib/classes/Scene.svelte.js'

   const scene = new Scene({ width: 1500, height: 500 })
   scene.backgroundUrl = '/bg_green_1000.png'

   const houses = [
      { x: 50, y: 50 },
      { x: 150, y: 50 },
      { x: 250, y: 50 },
      { x: 350, y: 50 },
      { x: 450, y: 50 },
      { x: 50, y: 150 },
      { x: 50, y: 250 },
   ]
</script>

<scene.view>
   {#each houses as pos}
      <Scene.Sprite src="/house00.png" {...pos} size={1} angle={0} }>
         <span>{pos.x}, {pos.y}</span>
      </Scene.Sprite>
   {/each}
</scene.view>

<style>
   span {
      display: block;
      background-color: #000A;
      padding: 0.25em;
      border-radius: 0.5em;
      position: absolute;
      transform: translateY(100%);
      white-space: nowrap;
      align-self: end;
      justify-self: center;
   }
</style>
