import { StoryFn, Meta } from '@storybook/react';
import { ListItem } from '../ListItem';

interface Item {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    children: {
      first_name: string;
      last_name: string;
      email: string;
    };
  }
export default {
    title: 'ListItem',
    component: ListItem
} as Meta

const Template: StoryFn<{item: Item, field: string}> = (args) => <ListItem {...args}/>;


export const Default = Template.bind({})
Default.args = {
    item: {
        _id: "5df38f6e8a4caadc4aa0dc36",
        first_name: "Frederick",
        last_name: "Stuart",
        email: "frederickstuart@rocklogic.com",
        children: {
          first_name: "Reed",
          last_name: "Velez",
          email: "reedvelez@rocklogic.com"
        }
      },
      field: "first_name"
}