<script lang="ts">
   import { type Scene } from "$lib/classes/Scene.svelte.js";
   import { onMount, type Snippet } from 'svelte'

   let { scene, children }: { scene: Scene, children?: Snippet } = $props()

   let isReady = $state(false)
   let observer = $state.raw<ResizeObserver>()
   let viewElement = $state<HTMLDivElement>()

   let isMouseDown = $state(false)
   let zoom = $state(1)
   const ZOOM_DAMPEN = 200
   // need to prevent zoom below 1 unless view is smaller
   // first, need to calculate allowed ratio for x and y
   //
   // could zoom out on resize in these cases
   const ZOOM_MIN = 1
   const ZOOM_MAX = 2

   let sceneToViewRatio = $state.raw({
      width: 0,
      height: 0
   })

   let scale = $state(1)
   let pan = $state.raw({
      x: 0,
      y: 0
   })

   let lastMouse = $state.raw({
      x: 0,
      y: 0
   })
   const setLastMouse = (x: number, y: number) => lastMouse = { x, y }

   const onwheel = (event: WheelEvent) => adjustZoom(event.deltaY)

   const onmouseup = (e: MouseEvent) => isMouseDown = false
   const onmouseleave = (e: MouseEvent ) => {}

   function onmousedown(event: MouseEvent) {
      setLastMouse(event.clientX, event.clientY)
      isMouseDown = true
   }

   function onmousemove(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
      if (!isMouseDown) return
      const rect = event.currentTarget.getBoundingClientRect()

      const deltaX = event.clientX - lastMouse.x;
      const deltaY = event.clientY - lastMouse.y;

      setLastMouse(event.clientX, event.clientY)
      adjustPan(deltaX, deltaY, rect)
   }


   function updateScale(element: HTMLElement, { width, height }: { width: number, height: number} ) {
      const scaleX = width / scene.width;
      const scaleY = height / scene.height;
      scale = Math.max(1, Math.min(scaleX, scaleY))

      const maxPan = calculateMaxPan({ width, height })

      pan = {
         x: Math.min(maxPan.x, Math.max(0, pan.x)),
         y: Math.min(maxPan.y, Math.max(0, pan.y))
      };

      // update sceneToViewRatio


   }

   function calculateMaxPan(rect: { width: number, height: number}) {
      const scaledWidth = scene.width * zoom
      const scaledHeight = scene.height * zoom
      return { x: scaledWidth - rect.width, y: scaledHeight - rect.height }
   }

   // could potentially move pan custom property into CSS
   function adjustPan(x: number, y: number, rect: DOMRect) {
      const maxPan = calculateMaxPan(rect)
      const p = {
         x: Math.min(maxPan.x, Math.max(0, pan.x -= x)),
         y: Math.min(maxPan.y, Math.max(0, pan.y -= y))
      }
      pan = p
   }

   function adjustZoom(deltaY: number) {
      const oldZoom = zoom
      zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom + deltaY / ZOOM_DAMPEN))
      const scaleRatio = zoom / oldZoom
      const rect = viewElement!.getBoundingClientRect()

      // could potentially move this into setPan or adjustPan with some tweaking
      const maxPan = calculateMaxPan(rect)

      pan = {
         x: Math.min(maxPan.x, Math.max(0, pan.x * scaleRatio)),
         y: Math.min(maxPan.y, Math.max(0, pan.y * scaleRatio))
      }
   }
   function setup(element: HTMLDivElement) {
      viewElement = element
      if (typeof window !== 'undefined') {
         observer = new ResizeObserver(entries => {
            const entry = entries[0]
            if (entry.target instanceof HTMLElement) updateScale(entry.target, entry.contentRect)
         })
         observer.observe(element)
      }
   }

   function setStyles(element: HTMLDivElement) {
      // untrack(() => updateScale(element, element.getBoundingClientRect()))
      element.style.setProperty('max-width', scene.width + 'px')
      element.style.setProperty('max-height', scene.height + 'px')
      element.style.setProperty('--pan-x', -pan.x + 'px')
      element.style.setProperty('--pan-y', -pan.y + 'px')
      element.style.setProperty('--zoom', zoom.toString())
      element.style.setProperty('--scale', `${zoom * scale}`)
   }

   onMount(() => {
      isReady = true
   })
</script>

<svelte:window {onmouseup} />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div role="application" id="view" use:setup {@attach setStyles} {onmousemove} {onmouseup} {onmousedown} {onwheel} {onmouseleave}>
   {#if isReady}
      <scene.svelte>
         {@render children?.()}
      </scene.svelte>
   {/if}
</div>
