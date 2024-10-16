import { StoryFn, Meta } from '@storybook/react';
import { ListItem } from '../ListItem';

interface Item {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
export default {
    title: 'ListItem',
    component: ListItem
} as Meta

const Template: StoryFn<{item: Item, field: string}> = (args) => <ListItem {...args}/>;


export const Default = Template.bind({})
Default.args = {
    item: {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
      },
      field: "name"
}