# Vue.js Masso Modal

### Usage
##### Basic usage
```vue
<template>
  <ms-modal-mobile
    name="modal-name"
    :styleCustom="{ 'z-index': 9 }"
    :hiddenClose="true"
  >
    <div class="">
      <!-- Slot modal body here -->
    </div>
  </ms-modal-mobile>
</template>
```

##### Show and hide modal

```javascript
this.$modalMobile.show({ name: "modal-name" });
this.$modalMobile.hide({ name: "modal-name" });
```

##### Passing data when showing modal

Passing data
```javascript
this.$modalMobile.show({ name: "modal-name", payload: {
  // Data fields here
  resourceIndex: this.resourceIndex
}});
```

Use passing data
```vue
<template>
  <ms-modal-mobile
    name="modal-name"
    :styleCustom="{ 'z-index': 9 }"
    :hiddenClose="true"
  >
    <div class="" slot-scope="props">
      <div>{{ props.payload.resourceIndex }}</div>
    </div>
  </ms-modal-mobile>
</template>
```

### Props

| Name                  | Required | Type      | Default     | Description                        |
| ---                   | ---      | ---       | ---         | ---                                |
| center                | -        | Boolean   | `false`     | Style modal is center of screen if true   |
| hidden-close          | -        | Boolean   | `false`     | Hide close default button if true |
| on-hide-call-back     | -        | Function  | -           | The function is called when hiding modal |
| name                  | -        | String    | -           | Modal name. It must be unique |
