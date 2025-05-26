<script lang="ts">
   import { World } from '$lib/classes/World.svelte.js'

   const world = new World({ width: 1500, height: 500 })
   world.backgroundUrl = '/bg_green_1000.png'

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

<world.viewport>
   {#each houses as pos}
      <World.Sprite src="/house00.png" {...pos} size={1} angle={0} }>
         <span>{pos.x}, {pos.y}</span>
      </World.Sprite>
   {/each}
</world.viewport>

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
