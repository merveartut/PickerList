import { Meta, StoryFn } from "@storybook/react";
import DataTable from "../DataTable";

export default {
    title: 'DataTable',
    component: DataTable
} as Meta

const Template: StoryFn<{columns, data, isZebra, isCheckbox}> = (args) => <DataTable {...args}/>;

export const Default = Template.bind({})

Default.args = {
    columns: ['Name', 'Age', 'Occupation'],
    data: [
      { id: 0, Name: 'Alice', Age: 25, Occupation: 'Engineer' },
      { id: 1, Name: 'Bob', Age: 30, Occupation: 'Designer' },
      { id: 2, Name: 'Sarah', Age: 28, Occupation: 'Author' },
      { id: 3, Name: 'Gabriel', Age: 32, Occupation: 'Chef' },
    ],
    isZebra: true,
    isCheckbox: true
  }