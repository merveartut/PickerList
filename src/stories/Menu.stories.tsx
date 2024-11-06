import { Meta, StoryFn } from '@storybook/react';
import Menu from '../Menu';
import { BsCaretDownFill } from "react-icons/bs";



export default {
    title: 'Menu',
    component: Menu
} as Meta

const Template: StoryFn<{Icon, items}> = (args) => <Menu {...args}/>;


export const Default = Template.bind({})
Default.args = {
    Icon: BsCaretDownFill,
    items: [
        {label: "Item 1", onclick: () => console.log("Item 1 clicked")},
        {label: "Item 2", onclick: () => console.log("Item 2 clicked")},
        {label: "Item 3", onclick: () => console.log("Item 3 clicked")}
    ]
}