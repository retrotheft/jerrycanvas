import { withProps } from "$lib/functions/withProps.js"
import ViewportComponent from '../components/Viewport.svelte'
import WorldComponent from '../components/World.svelte'
import SpriteComponent from '../components/Sprite.svelte'

type Dimensions = {
   width: number,
   height: number
}

export class World {
   public backgroundUrl = $state('')
   public dimensions = $state<Dimensions>({
      width: 0,
      height: 0
   })

   constructor(dimensions: Dimensions) {
      this.dimensions = dimensions
   }

   get viewport() {
      return withProps(ViewportComponent, { world: this })
   }

   get svelte() {
      return withProps(WorldComponent, { world: this })
   }

   get width() {
      return this.dimensions.width
   }

   get height() {
      return this.dimensions.height
   }

   static get Sprite() {
      return SpriteComponent
   }
}
