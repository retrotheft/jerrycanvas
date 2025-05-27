# Jerrycanvas

For those times you should probably be using canvas, but it's too much hassle.

## Requirements

- [![Svelte](https://img.shields.io/badge/Svelte-5.29-FF3E00?logo=svelte)](https://www.npmjs.com/package/svelte?activeTab=versions)

Ever almost reach for HTML Canvas, only to hesitate because you didn't want to deal with changing all your rendering logic? OR have to write a for loop with collision detection to salvage your interactivity?

**Jerrycanvas** is an HTML element that behaves a bit like a canvas. Position elements by their x and y coordinates, zoom and pan, interact with things.

## Quick Start

The code below contains everything you need to use Jerrycanvas. Keep reading for more specific information.

```svelte
<script>
   import { Scene } from 'jerrycanvas'

   const scene = new Scene({ width: 1000, height: 1000 })
   scene.backgroundUrl = '/bg_green_1000.png'

   const sprites = [
      { src="/sprite1.png" x: 50, y: 50, size: 1, angle: 0 },
      { src="/sprite2.png" x: 50, y: 50, size: 1, angle: 0 }
   ]
</script>

<scene.view>
   {#each sprites as sprite}
      <Scene.Sprite {...sprite}>
         <span>My Sprite Label</span>
      </Scene.Sprite>
   {/each}
</scene.view>

<style>
   span {
      position: absolute;
      align-self: center;
      justify-self: center;
   }
</style>
```

## A Scene With a View

Jerrycanvas only exports a single class: Scene. This is where you define the thing that you want to display. You must provide dimensions to instantiate it, and you can optionally provide a background image url.

To render your scene, you can use Svelte's dot notation and get the `view` component from your scene instance. Note that this is an instance getter (hence the lowercase) since it needs information about your scene to function.

```svelte
<scene.view>
   <!-- add your scene elements here -->
</scene.view>
````

To style your scene element further, use `div.jc-scene`.

## Styling the Viewport

Use `div.jc-view`. to target the viewport element.

Jerrycanvas will lock your viewport's max-width and max-height to your scene's dimensions. You're free to use CSS to style the Viewport element however you like from there. So for instance, if you set your viewport to `50vw` and `50vh`, then the viewport will be 50% of your window's width and height until that would make it larger than your scene.

More info on panning and zooming is further below.

## Sprites

Jerrycanvas also comes with a convenient Sprite component that you can use. You can render a sprite again using Svelte's dot notation, however this time notice that it's uppercase: `Scene.Sprite` is a static property on the Scene class. This is because the sprite does not require any information about your scene instance.

```svelte
<Scene.Sprite />
```

Sprite accepts several properties, which can be destructured directly onto the component. These are: `src`, `x`, `y`, `size` and `angle`.

- `src` is the url of the image you want to render
- `x` and `y` are coordinates, and it's up to you to place them within your dimensions or not
- `size` should be a simple multiple of 1, where 1 is the sprite's actual size. If you intend for your scene to be zoomed out from, you should use sprites that are larger and set their initial size to something smaller than 1.
- `angle` is the rotation of the sprite, in degrees.

Putting it all together, you can render a sprite in your scene like so:

```svelte
<scene.view>
   <Scene.Sprite src="/sprite2.png" x={50} y={50} size={1} angle={0} />
</scene.view>
```

Or, if you have an array of sprites you can just loop over them and destructure them:

```svelte
<script>
   const sprites = [
      { src="/sprite1.png" x: 50, y: 50, size: 1, angle: 0 },
      { src="/sprite2.png" x: 50, y: 50, size: 1, angle: 0 }
   ]
</script>

<scene.view>
   {#each sprites as sprite}
      <Scene.Sprite {...sprite} />
   {/each}
</scene.view>
```

You can have other properties in the object that you destructure. The Sprite component will just ignore them.

## Sprite Children

Once you have some sprites displayed, you might like to add further information to them, such as a label, or progress bars, or anything you want. You can do this by adding them inside the Sprite component:

```svelte
<Scene.Sprite {...sprite}>
   <span>My Sprite</span>
</Scene.Sprite>
```

For the most part, it's up to you how you want to style anything you add to your sprite, but Jerrycanvas is designed to make it easy to position elements in the following way:

```css
span {
   position: absolute;
   align-self: center;
   justify-self: center;
}
```

The Sprite container element is a button with all styling unset. It is set to `display: grid`, which means that once you set `position: absolute` on its children, you can position them using `align-self` and `justify-self`. This makes it super easy to place elements over the sprite. Additionally, you can of course use `top`, `right`, `down`, `left` and `inset`.

## Zooming

You can zoom in and out with the mouse wheel. Jerrycanvas will keep your scene at the appropriate zoom level depending on the viewport's size relative to your scene, so in theory you should never see any empty space inside the viewport where the scene has ended. If you do, it's a bug and please let me know!

## Panning

Click and drag inside the viewport to pan the scene. Note that you will be unable to pan on an axis where the entire scene is already visible.

## Resizing

The scene view will respond to window resizing and update its zoom and pan if necessary. In addition, you can set the resize property on `div.jc-view` and it should stay constrained to the scene dimensions.

## Debug Info

If you would like to display debug info, you can create a debug snippet. The viewport renders this if available and passes the view instance to it.

**Important:** `scene.view` and the `view` passed to the debug snippet are NOT the same object. `scene.view` is a Svelte component, while `view` is an instance of the `View` class that contains its pan, zoom, and scale information.

You can import the `View` class to get type information on what's available to display.

```ts
import { type View } from 'jerrycanvas'
````

```svelte
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
</scene.view>
```

You can style the debug element using the `div.jc-view-debug`. It is set to `position: absolute` by default. Additionally, like Sprites, the View element is set to `display: grid` so you can use any combination of `top`, `right`, `down`, `left`, and `inset`, as well as `align-self` and `justify-self`, to position your debug snippet. Here's an example:

```css
div.jc-view-debug {
   align-self: start;
   justify-self: end;

   ul {
      list-style-type: none;
      padding-inline-start: 0;
      font-family: monospace;
      background-color: #000A;
      margin-block: 0;
      padding: 1em;
   }
}
```
