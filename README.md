# Vue Simple BEM

A simple Vue.js directive to map BEM CSS class names.

## Installation

Install using your package manager of choice.

`yarn add vue-simple-bem`

`npm i --save vue-simple-bem`

You can install the directive as a global dependency. The [configuration options](#plugin-configuration) are optional.

```javascript
import Vue from 'vue';
import bem from 'vue-simple-bem';

Vue.use(bem, {...});
```

You can also import it directly into a component. Note that you do not use the default export when using this method.

```vue
<script>
import { bem } from 'vue-simple-bem';

export default {
  name: 'MyComponent',
  directives: { bem }
};
</script>
```

## Examples

A simple example without using modifiers.

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
  <div v-bem>
    <div v-bem:sampleText>Example Text</div>
  </div>
</template>
```

The root `div` will become `<div class="my-component">`.
The child element `div` will become `<div class="my-component__sample-text">`.

The same example but with modifiers.

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

The root `div` will become `<div class="my-component my-component--bold my-component--emphasize-text">`.
The child element `div` will become `<div class="my-component__sample-text my-component__sample-text--bold">`.

If a modifier is always on then you can use this syntax. You can use both together as well.

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

The root `div` will become `<div class="my-component my-component--float-left">`.
The child element `div` will become `<div class="my-component__sample-text my-component__sample-text--bold my-component__sample-text--italics">`.

## API

### Block

The BEM block will automatically use the name of the component.
If the component does not have a name then it will fallback to using `bem-block`.
The component's name may be either pascal cased or kebab cased.
The name will be converted into kebab casing either way for the CSS class name.

If the component's name is `SomeComponent` then the CSS block class name will be `some-component`.
If the component's name is `another-component` then the CSS block class name will be the same.

### Block Modifiers

If you bind an object with properties to the directive then anything that evaluates as `truthy` will be converted to kebab casing and used as a block modifier.
The below example will add the following CSS classes.

* `my-component`
* `my-component--bold-text`
* `my-component--italics`

```vue
<script>
export default {
  name: 'MyComponent'
};
</script>

<template>
  <div v-bem="{ boldText: true, underline: false, italics: true }">
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
The below example will generate CSS element classes called `my-component__some-elem` and `my-component__text` respectively.

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

## Plugin Configuration

### Name

> default: `'bem'`

This changes the name the directive is registered as.
This will change the directive in your template.
The below example shows adding a block after changing the name to `'css'`.

```vue
<template>
  <div v-css>Example Text</div>
</template>
```
