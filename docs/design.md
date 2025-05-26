# Pseudo-Canvas Design

Pseudo-Canvas should provide the benefits of working with canvas - namely, quick and easy placement of elements using x and y coordinates.

We want to be able to add Svelte elements as children to the main container and have them automatically appear. To achieve this we will need to use a context register/unregister system.

Problems to Solve

- Use translate to avoid layout thrashing
- As much as possible should be handled via CSS - such as scaling


/* --scale: calc(var(--zoom) * max(1, min(var(--scale-x), var(--scale-y)))); */
