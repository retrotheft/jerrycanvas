# jerrycanvas

Ever almost reach for HTML Canvas but hesitate because you dind't want to deal with changing all your rendering logic from HTML/CSS to Context draw methods? Not to mention looping through everything to salvage your interactions.

jerrycanvas is an HTML element that behaves a bit like a canvas. Position elements by their x and y coordinates, zoom, pan, interact with things.

It's really easy to set up. Just do the following:

```svelte
<script>
   import { scene } from 'jerrycanvas'

   const scene = new scene({ width: 1000, height: 1000 })
   scene.backgroundUrl = '/bg_green_1000.png'

   const sprites = [
      { src="/sprite1.png" x: 50, y: 50, size: 1, angle: 0 },
      { src="/sprite2.png" x: 50, y: 50, size: 1, angle: 0 }
   ]
</script>

<scene.view>
   {#each sprites as sprite}
      <scene.Sprite {...sprite} />
   {/each}
</scene.view>
```
