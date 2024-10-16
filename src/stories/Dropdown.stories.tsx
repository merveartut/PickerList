import { Dropdown } from "../Dropdown";
import { StoryFn, Meta } from '@storybook/react';

export default {
    title: 'Dropdown',
    component: Dropdown
} as Meta

const Template: StoryFn<{canFilter: boolean, withLazyLoading: boolean, singleSelect: boolean, useCheckbox: boolean}> = (args) => <Dropdown {...args}/>

export const FilterEnabled = Template.bind({})
FilterEnabled.args = {
    canFilter: true,
    withLazyLoading: true,
    singleSelect: true,
    useCheckbox: false
}

export const FilterDisabled = Template.bind({})
FilterDisabled.args = {
    canFilter: false,
    withLazyLoading: true,
    singleSelect: true,
    useCheckbox: false
}

export const LazyLoadingEnabled = Template.bind({})
LazyLoadingEnabled.args = {
    canFilter: true,
    withLazyLoading: true,
    singleSelect: true,
    useCheckbox: false
}

export const VirtualScrollEnabled = Template.bind({})
VirtualScrollEnabled.args = {
    canFilter: true,
    withLazyLoading: false,
    singleSelect: true,
    useCheckbox: false
}
export const MultiSelect = Template.bind({})
MultiSelect.args = {
    canFilter: true,
    withLazyLoading: false,
    singleSelect: false,
    useCheckbox: false
}

export const WithCheckBox = Template.bind({})
WithCheckBox.args = {
    canFilter: true,
    withLazyLoading: false,
    singleSelect: false,
    useCheckbox: true
}