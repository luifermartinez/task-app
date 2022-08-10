import React, { useState } from "react"
import { TextInputProps } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import tw from "twrnc"
import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import Wrapper from "./Wrapper"
import Label from "./Label"

/* Defining the props that the component will receive. */
interface Props extends TextInputProps, UseControllerProps {
  className?: string
  control: FieldValues | any
  defaultValue?: string
  name: string
  label?: string
  multiline?: boolean
  errors?: any
}

// Input component

export default React.forwardRef(function Input(
  {
    className,
    label,
    control,
    defaultValue,
    name,
    rules,
    multiline,
    errors,
    ...props
  }: Props,
  ref: any
) {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
  })

  const [height, setHeight] = useState(60)

  const newStyle = {
    height,
  }

  const updateSize = (height) => {
    setHeight(height)
  }

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <TextInput
        ref={ref}
        onChangeText={onChange}
        value={value}
        multiline={multiline}
        onContentSizeChange={(e) =>
          multiline && updateSize(e.nativeEvent.contentSize.height)
        }
        style={
          className
            ? {
                ...tw`${className} ${
                  errors[name] ? "border-red-500 border" : ""
                }`,
                ...newStyle,
              }
            : { ...newStyle }
        }
        {...props}
      />
      {errors && errors[name] && (
        <Label className="text-xs font-medium text-red-500 mt-2 text-center">
          {errors[name].message}
        </Label>
      )}
    </Wrapper>
  )
})
