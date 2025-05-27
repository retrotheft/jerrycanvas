<script lang="ts">
   import '$lib/assets/view.css'
   import { type Scene } from "$lib/classes/Scene.svelte.js";
   import { type Options, View } from "../classes/View.svelte.js"
   import { onMount, type Snippet } from 'svelte'

   let { scene, options, children, debug }: { scene: Scene, options: Options, children?: Snippet, debug?: Snippet<[View]> } = $props()

   const view = new View()

   let isReady = $state(false)
   let observer = $state.raw<ResizeObserver>()
   let viewElement = $state<HTMLDivElement>()

   let isMouseDown = $state(false)

   let lastMouse = $state.raw({
      x: 0,
      y: 0
   })

   const setLastMouse = (x: number, y: number) => lastMouse = { x, y }
   const onmouseup = (e: MouseEvent) => isMouseDown = false
   const onmouseleave = (e: MouseEvent ) => {}

   function onwheel (event: WheelEvent) {
      const rect = viewElement?.getBoundingClientRect()
      if (!rect) return
      view.adjustZoom(event.deltaY, rect, scene)
   }

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
      view.adjustPan(deltaX, deltaY, rect, scene)
   }

   function setup(element: HTMLDivElement) {
      viewElement = element
      if (typeof window !== 'undefined') {
         observer = new ResizeObserver(entries => {
            const entry = entries[0]
            if (entry.target instanceof HTMLElement) view.updateScale(entry.target, entry.contentRect, scene)
         })
         observer.observe(element)
      }
   }

   function setStyles(element: HTMLDivElement) {
      element.style.setProperty('max-width', scene.width + 'px')
      element.style.setProperty('max-height', scene.height + 'px')
      element.style.setProperty('--pan-x', -view.pan.x + 'px')
      element.style.setProperty('--pan-y', -view.pan.y + 'px')
      element.style.setProperty('--zoom', view.zoom.toString())
      element.style.setProperty('--scale', `${view.zoom * view.scale}`)
   }

   onMount(() => {
      isReady = true
   })

   $effect(() => {
      if (options.zoomMax) view.zoomMax = options.zoomMax
      if (options.zoomDampen) view.zoomDampen = options.zoomDampen
   })
</script>

<svelte:window {onmouseup} />

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div role="application" class="jc-view" use:setup {@attach setStyles} {onmousemove} {onmouseup} {onmousedown} {onwheel} {onmouseleave}>
   {#if isReady}
      <scene.svelte>
         {@render children?.()}
      </scene.svelte>
   {/if}
   <div class="jc-view-debug">
      {@render debug?.(view)}
   </div>
</div>
