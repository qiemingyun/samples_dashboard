import { Select } from 'antd';

type SelectProps = React.ComponentProps<typeof Select>;

export interface OptionProps {
  value: string;
  name: string;
}

export interface SelectOptionProps
  extends Omit<SelectProps, 'onChange' | 'options'> {
  defaultValue: string;
  options: OptionProps[];
  onChange: (value: string) => void;
}

const SelectOption = (props: SelectOptionProps) => {
  const { defaultValue, options, onChange, ...restProps } = props;
  return (
    <Select
      defaultValue={defaultValue}
      onChange={(value) => onChange(value.toString())}
      {...restProps}
    >
      {options?.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectOption;
