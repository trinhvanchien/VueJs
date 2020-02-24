# Vue.js Masso Modal

### Usage
##### Basic usage
```vue
<template>
  <ms-modal
    name="modal-name"
    :style-custom="{ width: '524px' }"
    :hiddenClose="true"
  >
    <div class="">
      <!-- Slot modal body here -->
    </div>
  </ms-modal>
</template>
```

##### Show and hide modal

```javascript
this.$modal.show({ name: "modal-name" });
this.$modal.hide({ name: "modal-name" });
```

##### Passing data when showing modal

Passing data
```javascript
this.$modal.show({ name: "modal-name", payload: {
  // Data fields here
  resourceIndex: this.resourceIndex
}});
```

Use passing data
```vue
<template>
  <hs-modal
    name="modal-name"
    :style-custom="{ width: '524px' }"
    :hiddenClose="true"
  >
    <div class="" slot-scope="props">
      <div>{{ props.payload.resourceIndex }}</div>
    </div>
  </hs-modal>
</template>
```

### Props

| Name                  | Required | Type      | Default     | Description                        |
| ---                   | ---      | ---       | ---         | ---                                |
| center                | -        | Boolean   | `false`     | Style modal is center of screen if true   |
| hidden-close          | -        | Boolean   | `false`     | Hide close default button if true |
| on-hide-call-back     | -        | Function  | -           | The function is called when hiding modal |
| name                  | -        | String    | -           | Modal name. It must be unique |
| styleCustom           | -        | Object    | -           | Custom modal style |
