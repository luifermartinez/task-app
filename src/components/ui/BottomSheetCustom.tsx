import React from "react"
import BottomSheet, { BottomSheetProps } from "@gorhom/bottom-sheet"
import tw from "twrnc"
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"

interface Props extends BottomSheetProps {
  className?: string
}

export type Ref = Props

// BottomShetCustom is a component that renders the bottom sheet.

export default React.forwardRef(function bottomSheet(
  { className, children, ...props }: Props,
  ref: any
) {
  return (
    <BottomSheet
      ref={ref as unknown as React.MutableRefObject<BottomSheetMethods>}
      style={className ? tw`${className} ` : {}}
      {...props}
    >
      {children}
    </BottomSheet>
  )
})
