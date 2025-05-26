import { withProps } from "$lib/functions/withProps.js"
import ViewComponent from '../components/View.svelte'
import sceneComponent from '../components/Scene.svelte'
import SpriteComponent from '../components/Sprite.svelte'

type Dimensions = {
   width: number,
   height: number
}

export class Scene {
   public backgroundUrl = $state('')
   public dimensions = $state<Dimensions>({
      width: 0,
      height: 0
   })

   constructor(dimensions: Dimensions) {
      this.dimensions = dimensions
   }

   get view() {
      return withProps(ViewComponent, { scene: this })
   }

   get svelte() {
      return withProps(sceneComponent, { scene: this })
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
