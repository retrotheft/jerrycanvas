# Pseudo-Canvas Todo

## Next

- [x] Clean up Canvas (and context) into Viewport and World
- [x] Create intuitive API for WorldObjects

## Bugs

- [ ] using img has to deal with transparency which affects hover... background might be better
- [ ] transform-origin needs work if we want to scale sprites down
- [ ] Zoom Levels less than 1 still show empty space and break panning (because viewport is too big)
- [x] still possible to view outside context if window is resized


## Done

- [x] create main container and provide basic placement mechanism
- [x] create Attachment to unroll custom properties onto element
- [x] scale everything correctly on resize using pure CSS
- [x] react to manual zoom as well as resize
- [x] add pan controls
- [x] Factor in width and height of canvas when panning
- [x] provide a way for user to specify max width and height in dimensions
