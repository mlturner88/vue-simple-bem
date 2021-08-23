# Vue Simple BEM

> **Note**: The below documentation is for using `vue-simple-bem` with Vue 3. If you're looking for instructions on using `vue-simple-bem` with Vue 2, see [previous versions of the README](https://github.com/mlturner88/vue-simple-bem/blob/v1.2.0/README.md).

A simple directive to bring BEM to Vue 3. Less than 1KiB compressed. No external dependencies.

## Installation

Install using your package manager of choice.

`yarn add vue-simple-bem`

`npm i --save vue-simple-bem`

You can install the directive as a global dependency. The [configuration options](#plugin-configuration) are optional.

```javascript
import { createApp } from 'vue';
import VueSimpleBem from 'vue-simple-bem';

const app = createApp({...});
app.use(VueSimpleBem);
```

You can also import it directly into a component.

```vue
<script>
import { bem } from 'vue-simple-bem';

export default {
  name: 'MyComponent',
  directives: { bem }
};
</script>
```

## What is BEM?

Before continuing, you may want to get familiar with BEM and the problem it's solving. 

At it's simplest, it is a css naming convention that keeps your selectors flat and 
expresses an explicit relationship between classes in a component.

Here is some further reading:
 * https://css-tricks.com/bem-101/
 * http://getbem.com/

## Usage

### A simple example.

```vue
<script>
export default {
  name: 'MyComponent',
};
</script>

<template>
  <div v-bem>
    <div v-bem:sampleText>Example Text</div>
  </div>
</template>
```

* The root `div` will become `<div class="my-component">`. The Block name is derived from component name.
* The child element `div` will become `<div class="my-component__sample-text">`

### Example with modifiers

```vue
<script>
export default {
  name: 'MyComponent',
  props: {
    bold: {
      type: Boolean,
      default: true
    },
    italics: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <div v-bem="{ bold, emphasizeText: italics }">
    <div v-bem:sampleText="{ bold, center }">Example Text</div>
  </div>
</template>
```

* The root `div` will become `<div class="my-component my-component--bold my-component--emphasize-text">`
* The child element `div` will become `<div class="my-component__sample-text my-component__sample-text--bold">`

### Example with simplified modifiers
If a modifier isn't dynamic then you can use this syntax. 

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem.floatLeft>
    <div v-bem:sampleText.italics>Example Text</div>
  </div>
</template>
```

* The root `div` will become `<div class="my-component my-component--float-left">`
* The child element `div` will become `<div class="my-component__sample-text my-component__sample-text--italics">`

### Example using both simple modifiers and dynamic modifiers
You can use both together as well.
```vue
<script>
export default {
  name: 'MyComponent',
  props: {
    bold: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<template>
  <div v-bem.floatLeft>
    <div v-bem:sampleText.italics="{ bold }">Example Text</div>
  </div>
</template>
```

* The root `div` will become `<div class="my-component my-component--float-left">`
* The child element `div` will become `<div class="my-component__sample-text my-component__sample-text--bold my-component__sample-text--italics">`


## API

### Block

The BEM block will automatically use the name of the component.
If the component does not have a name then it will fallback to using the component's tag that
Vue uses (which is usually what you registered the component as in the parent).
If neither of these are available, it will attempt to use the `uuid` assigned to the component by the vue framework. If for _some_ reason, even this field is `undefined` (I'm not sure if that is actually possible) it defaults to `bem-block`.

The component's name may be either pascal cased or kebab cased. The name will be converted into kebab casing either way for the CSS class name. For example, if the component's name is `SomeComponent` then the CSS block class name will be `some-component`.
If the component's name is `another-component` then the CSS block class name will be the same.

### Block Modifiers

If you bind an object with properties to the directive then anything that evaluates as `truthy`
will be converted to kebab casing and used as a block modifier.
[It is also possible to add a block modifier onto a child component's context.](#block-mod-in-child-component-context)
The below example will add the following CSS classes.

* `my-component`
* `my-component--bold-text`
* `my-component--italics`

```vue
<script>
export default {
  name: 'MyComponent'
  setup() {
    const someConditional = ref(false);
    return { someConditional };
  }
};
</script>

<template>
  <div v-bem="{ boldText: true, underline: false, italics: true, someConditional }">
    Some Text
  </div>
</template>
```

If a modifier is permanent and does not need to be evaluated then you may use the below syntax.
The classes will be the same as above.

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem.boldText.italics>
    Some Text
  </div>
</template>
```

You can also mix these two syntaxes together.
The result will be the same.
The object values inside of the quotations will take precedence.

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem.boldText.italics="{ underline: false }">
    Some Text
  </div>
</template>
```

### Element

You may add an element CSS class using the below syntax.
The [block portion will still use the component's name.](#block)
The below example will generate CSS element classes called
`my-component__some-elem` and `my-component__text` respectively.

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem>
    <span v-bem:someElem>Some Text</span>
    <span v-bem:text>More Text</span>
  </div>
</template>
```

### Element Modifiers

The syntax remains the same for element modifiers as it does for [block modifiers](#block-modifiers).
The below example will generate the following classes.

* `my-component__some-elem--bold`
* `my-component__some-elem--underline`
* `my-component__text--underline`

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem>
    <span v-bem:someElem="{ bold: true, underline: true, center: false }">Some Text</span>
    <span v-bem:text="{ bold: false, underline: true }">More Text</span>
  </div>
</template>
```

Here is that example again using the alternative syntax if the modifiers do not need to be evaluated.

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem>
    <span v-bem:someElem.bold.underline>Some Text</span>
    <span v-bem:text.underline>More Text</span>
  </div>
</template>
```

Once again with the combined syntaxes.

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem>
    <span v-bem:someElem.bold.underline="{ center: false }">Some Text</span>
    <span v-bem:text.underline="{ bold: false }">More Text</span>
  </div>
</template>
```

### Block Mod in Child Component Context

If you have a BEM class mod defined in the styles of a reusable component, but you want to trigger that mod in the context of the consuming component (the parent), then you can specify the directive argument as `self`. The child component's name or tag will be used to determine the block and the mod will be determined like normal. The example below will generate the following CSS classes for the child component and add them to the child component CSS class list.

* `child-component--bold`
* `child-component--underline`

```vue
<script>
import ChildComponent from './ChildComponent';

export default {
  name: 'ParentComponent',
  components: { ChildComponent }
};
</script>

<template>
  <div v-bem>
    <child-component v-bem:self.bold="{ underline: true, strikeout: false }" />
  </div>
</template>
```

## Plugin Configuration

### Name

> default: `'bem'`

This changes the name the directive is globally registered as by the plugin. This will change the directive in your template. The below example shows adding a block after changing the name to `'css'`.

```vue
<template>
  <div v-css>Example Text</div>
</template>
```

## Planned Work

- [x] Add ability to apply BEM mod to child component
- [ ] Add option to manually specify component property that indicates the BEM block instead of using `name`
- [ ] Add option to configure whether names are kebab cased or not
