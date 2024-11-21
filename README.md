
# React-Components  

[![Storybook](https://img.shields.io/badge/Storybook-View%20Docs-blue)](https://merveartut.github.io/React-Components/?path=/docs/configure-your-project--docs)  

## Overview  

**React-Components** is a reusable component library built with React, designed to simplify UI development. It features well-documented components such as **DataTable**, **Menu**, and **PickerList**, allowing developers to create interactive and dynamic user interfaces effortlessly.  

## Components  

### 1. **PickerList**  
- Manage a list of items with functionality to add or remove selections.  

### 2. **DataTable**  
- Interactive data grid with:  
  - **Hide Columns**: Minimize column width while keeping menu options accessible.  
  - **Sorting**: Sort data in ascending or descending order.  

### 3. **Menu**  
- A customizable menu component that supports actions such as **Hide** and **Sort** when integrated with DataTable or other components.  

## Features  

- **Dynamic Configuration**: Customize each component via props to meet your specific needs.  
- **Interactive Storybook Documentation**: Explore live examples and use cases directly in Storybook.  
- **Reusable Components**: Build consistent UI elements across projects.  

## Storybook  

Check out the live Storybook documentation here:  
[React-Components Storybook](https://merveartut.github.io/PickerList/?path=/docs/configure-your-project--docs)  

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/merveartut/React-Components.git
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

In your project, import the Dropdown component:

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
