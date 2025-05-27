<script lang="ts">
   import { Scene } from '$lib/classes/Scene.svelte.js'
   import type { Options, View } from '$lib/classes/View.svelte.js'

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

<svelte:head>
   <title>jerrycanvas</title>
</svelte:head>

<scene.view>
   {#snippet debug(view: View)}
      <ul>
         <li>Zoom: {view.zoom.toFixed(1)}</li>
         <li>Min Zoom Allowed: {view.zoomMin.toFixed(1)}</li>
         <li>Max Zoom Allowed: {view.zoomMax.toFixed(1)}</li>
         <li>Zoom Dampening: {view.zoomDampen.toFixed(1)}</li>
         <li>Pan: {view.pan.x.toFixed(1)}, {view.pan.y.toFixed(1)}</li>
         <li>Scale: {view.scale.toFixed(1)}</li>
         <li>Scene to View Ratio: {view.sceneToViewRatio.width.toFixed(1)}, {view.sceneToViewRatio.height.toFixed(1)}</li>
      </ul>
   {/snippet}
   {#each houses as pos}
      <Scene.Sprite src="/house00.png" {...pos} size={1} angle={0} onclick={() => console.log(pos)}>
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

   ul {
      list-style-type: none;
      padding-inline-start: 0;
      font-family: monospace;
      background-color: #000A;
      margin-block: 0;
      padding: 1em;
   }
</style>
