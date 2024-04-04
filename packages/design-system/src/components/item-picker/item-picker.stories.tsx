import type { Meta, StoryObj } from "@storybook/react"
import { ItemPicker, ItemPickerProps } from "./item-picker"

const options = [
  {
    label: "Daily Sentences",
    value: "1",
    selected: true,
  },
  {
    label: "Custom Cards",
    value: "2",
  },
  {
    label: "Greetings",
    value: "3",
  },
  {
    label: "Dinings & Food",
    value: "4",
  },
  {
    label: "Shopping",
    selected: true,
    value: "5",
  },
  {
    label: "Direction & Transportation",
    value: "6",
  },
  {
    label: "Accommodation",
    value: "7",
  },
]

const CategoryPickerMeta: Meta<ItemPickerProps> = {
  component: ItemPicker,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    label: "Category",
    options,
    multi: true,
    onFinish(selected) {
      console.log("selected", selected)
    },
  },
}

export default CategoryPickerMeta

export const Primary: StoryObj<ItemPickerProps> = {
  args: {},
  // Story level custom code snippet
  parameters: {
    docs: {
      source: {
        code: "<ItemPicker label=\"Category\" options={options} />",
      },
    },
  },
}

export const AllSelected: StoryObj<ItemPickerProps> = {
  args: {
    ...CategoryPickerMeta.args, // Spread the default args from the meta
    options: options.map((opt) => ({ ...opt, selected: true })),
  },
  parameters: {
    docs: {
      source: {
        code: "<ItemPicker label=\"Category\" options={options.map(opt => ({ ...opt, selected: true }))} multi={true} />",
      },
    },
  },
}
