"use client";

import { ForwardedRef, forwardRef, ReactNode } from "react";
import { Button, Select as AriaSelect, SelectProps as AriaSelectProps, SelectValue, SelectValueRenderProps } from "react-aria-components";

import { ChevronDownIcon } from "lucide-react";

import { ForwardRefType } from "./types";
import { useObserveElementWidth } from "./utils";
import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";
import { Popover, PopoverProps } from "./popover";
import { Separator } from "./separator";

// props

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children">,
    Omit<PopoverProps, keyof AriaSelectProps<T>>,
    ListBoxSlotsType<T>,
    FieldBaseProps,
    FieldInputBaseProps {
  topContent?: ReactNode;
  renderValue?: (selectValue: Omit<SelectValueRenderProps<T>, "isPlaceholder">) => ReactNode;
}

// component

function _Select<T extends object>(props: SelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const { topContent, renderValue, placeholder } = props;

  const [width, selectRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaSelect ref={selectRef} {...props}>
      {(renderProps) => (
        <>
          <Field {...renderProps} {...props}>
            <FieldInput isFocusWithin={renderProps.isOpen} endContent={<ChevronDownIcon className="!text-default-400" />} {...renderProps} {...props}>
              <Button ref={ref} className="flex items-center">
                <SelectValue className={({ isPlaceholder }) => (isPlaceholder ? "!text-default-400" : "")}>
                  {renderValue
                    ? ({ selectedItem, selectedText }) =>
                        selectedItem
                          ? renderValue({
                              selectedItem: selectedItem as T,
                              selectedText,
                            })
                          : placeholder ?? "Select"
                    : undefined}
                </SelectValue>
              </Button>
            </FieldInput>
          </Field>

          <Popover maxHeight={300} hideArrow {...props} className="overflow-auto p-0" style={{ width }}>
            {topContent && (
              <>
                {topContent}
                <Separator />
              </>
            )}

            <ListBox {...filterInlineListBoxProps(props)} className="p-2" />
          </Popover>
        </>
      )}
    </AriaSelect>
  );
}

const Select = (forwardRef as ForwardRefType)(_Select);

const SelectItem = ListBoxItem;

const SelectSection = ListBoxSection;

// exports

export { Select, SelectItem, SelectSection };
export type { SelectProps };
