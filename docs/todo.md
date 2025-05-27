# Pseudo-Canvas Todo

## Next

- [ ] Add touch/gesture functionality
- [ ] scene background-image handling might not be robust enough in async or reactive situations (maybe some clever css fallback trickery can be of use)

## Bugs


## Done

- [x] preventDefault in onwheel handler
- [x] Make it more clear that it requires Svelte
- [x] transform-origin needs work if we want to scale sprites down
- [x] Zoom Levels less than 1 still show empty space and break panning (because view is too big)
- [x] still possible to view outside context if window is resized
- [x] Clean up Canvas (and context) into View and scene
- [x] Create intuitive API for sceneObjects
- [x] create main container and provide basic placement mechanism
- [x] create Attachment to unroll custom properties onto element
- [x] scale everything correctly on resize using pure CSS
- [x] react to manual zoom as well as resize
- [x] add pan controls
- [x] Factor in width and height of canvas when panning
- [x] provide a way for user to specify max width and height in dimensions
