import { type Scene } from './Scene.svelte.js'

type Coords = {
   x: number,
   y: number
}

type Rect = {
   width: number,
   height: number
}

export class View {
   public sceneToViewRatio = $state<Rect>({ width: 0, height: 0 })
   public zoom = $state(1)
   public zoomMin = $derived(Math.max(this.sceneToViewRatio.width, this.sceneToViewRatio.height))
   public zoomMax = $state(2)
   public zoomDampen = $state(200)
   public zoomInvert = $state(false)
   public pan = $state<Coords>({ x: 0, y: 0 })
   public scale = $state(1)

   constructor(

   ) { }

   calculateMaxPan(rect: Rect, scene: Scene) {
      const scaledWidth = scene.width * this.zoom
      const scaledHeight = scene.height * this.zoom
      return {
         x: Math.max(0, scaledWidth - rect.width),
         y: Math.max(0, scaledHeight - rect.height)
      }
   }

   adjustPan(x: number, y: number, rect: Rect, scene: Scene) {
      const maxPan = this.calculateMaxPan(rect, scene)
      const p = {
         x: Math.min(maxPan.x, Math.max(0, this.pan.x -= x)),
         y: Math.min(maxPan.y, Math.max(0, this.pan.y -= y))
      }
      this.pan = p
   }

   adjustZoom(deltaY: number, rect: Rect, scene: Scene) {
      const oldZoom = this.zoom
      this.zoom = Math.min(this.zoomMax, Math.max(this.zoomMin, this.zoom + deltaY / this.zoomDampen))
      const scaleRatio = this.zoom / oldZoom

      const maxPan = this.calculateMaxPan(rect, scene)

      const p = {
         x: Math.min(maxPan.x, Math.max(0, this.pan.x * scaleRatio)),
         y: Math.min(maxPan.y, Math.max(0, this.pan.y * scaleRatio))
      }
      this.pan = p
   }

   updateScale(element: HTMLElement, { width, height }: Rect, scene: Scene ) {
      const scaleX = width / scene.width;
      const scaleY = height / scene.height;
      this.scale = Math.max(1, Math.min(scaleX, scaleY))

      const maxPan = this.calculateMaxPan({ width, height }, scene)

      const p = {
         x: Math.min(maxPan.x, Math.max(0, this.pan.x)),
         y: Math.min(maxPan.y, Math.max(0, this.pan.y))
      };

      this.pan = p

      this.sceneToViewRatio = {
         width: scaleX,
         height: scaleY
      }

      if (this.zoom < this.zoomMin) this.zoom = this.zoomMin
      if (this.zoom > this.zoomMax) this.zoom = this.zoomMax
   }
}

export type Options = {
   zoomMax?: number,
   zoomDampen?: number,
   zoomInvert?: boolean
}
