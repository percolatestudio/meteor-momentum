meteor-momentum
===============

Reactive animation package for Meteor.

Momentum allows you to easily and simply re-use animation behaviour in your app via plugins that can be shared easily.

# Caveat

We published this package as an exploration of an idea rather than something we rigorously maintain for public consumption. As such, the plugins that we ship probably won't work for many use cases in the wild. You're encouraged to create your own custom plugins specific to the needs of your application. Momentum is designed as a thin interface to `uihooks` that can be declaratively used in your templates.

# Install

```
meteor add percolate:momentum
```

# Usage

Wrap an element which is being added or removed (or moved) from the DOM in

```
{{#momentum plugin='X'}}
  {{! your content }}
{{/momentum}}
```

For example

```
{{#momentum plugin='right-to-left'}}
  {{#if show}}
    <p>My text!</p>
  {{/if}}
{{/momentum}}
```

When the `show` helper changes the element will appear as normal, but mediated by the `right-to-left` plugin (see the examples folder for some example plugins).

See also: [momentum-iron-router](https://atmospherejs.com/percolate/momentum-iron-router)

# Examples

See the example directory in the project, also hosted at [momentum-example.meteor.com](momentum-example.meteor.com)

# Built-in Plugins

## `css`

Makes it easy to drive css transitions. By default adds the `.in`, `.out` and `.off-screen` classes to conrol the transition. Use the `extra` option to set another class during the transition. Add a `timeout` as a fallback if the `transtionEnd` event doesn't fire.

## `growl`

A simple, but useful plugin to do a "growl" style system notification animation.

## `right-to-left`, `left-to-right`

Good for mobile-style page-page transition animations.

## `fade`

Fades in/out.

## `slide-height`

Animate height in from zero to full, out from full to zero. Works with auto-height elements.

# Your own plugin

Writing a plugin is simple. See the existing plugins for examples. You just need to provide an `insertElement` and `removeElement` (and optionally `moveElement`) hook. These have the same API as [Meteor's `_uihooks`](https://github.com/meteor/meteor/blob/master/History.md#blaze-2).

# Contributions

It would make sense to build packages that provide extra plugins. If there's something you need in the core package to make your package work, please, open an issue or make a pull request.

## License 

MIT. (c) Percolate Studio, maintained by Zoltan Olah (@zol).
