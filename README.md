
# PickerList

PickerList is a React component that implements a dropdown with advanced features like lazy loading, virtual scrolling, and filtering. The project is powered by Storybook for easy visualization and documentation of the components.

## Storybook

You can view the live Storybook documentation for PickerList at:

[Storybook Demo](https://merveartut.github.io/PickerList/)

## Features

- **Lazy Loading:** Efficient data loading as you scroll.
- **Virtual Scroll:** Renders only visible items for performance.
- **Filtering:** Allows filtering of dropdown options.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/merveartut/PickerList.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Storybook

To start the Storybook environment locally:
```bash
npm run storybook
```

## Build for Production

To build the Storybook for deployment:
```bash
npm run build-storybook
```

Deploy Storybook to GitHub Pages:
```bash
npm run deploy
```

## Usage

In your project, import the PickerList component:

```jsx
import { Dropdown } from './components/Dropdown';
```

Customize it with props:
```jsx
<Dropdown
  canFilter={true}
  withLazyLoading={true}
  singleSelect={false}
  useCheckbox={true}
/>
```

## License

This project is licensed under the MIT License.
