import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import BottomSheetCustom from "../ui/BottomSheetCustom"
import BottomSheet from "@gorhom/bottom-sheet"
import { ITask } from "../../utils/interfaces"
import Button from "../ui/Button"
import { Icon } from "@rneui/themed"
import TaskForm from "./TaskForm"

/* Defining the props that the component will receive. */
interface Props {
  task?: ITask
  selectTask?: (task: ITask | undefined) => void
  isOpen: boolean
  handleClose: () => void
  mutate: () => void
}

// TaskBottomSheet is a component that renders a bottom sheet that allows the user to edit o create a task.

const TaskBottomSheet: FC<Props> = ({
  task,
  isOpen,
  handleClose,
  selectTask,
  mutate,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => [400], [])

  /* Checking if the bottom sheet is open and if it is, it expands it. If it is not open, it sets the
  task to undefined. */
  useEffect(() => {
    if (isOpen) bottomSheetRef.current?.expand()
    if (!isOpen) selectTask(undefined)
  }, [isOpen])

  /**
   * If bottomSheetRef.current is not null, then call the close() method on it, and then call the
   * handleClose() function.
   */
  const close = () => {
    bottomSheetRef.current?.close()
    handleClose()
  }

  /* A Component that renders the backdrop of the bottomSheet. */
  const Backdrop = useCallback(
    () =>
      isOpen && (
        <Button
          activeOpacity={1}
          onPress={close}
          className="bg-black bg-opacity-40 absolute left-0 top-0 right-0 bottom-0"
        />
      ),
    [isOpen]
  )

  return (
    <BottomSheetCustom
      animateOnMount
      handleComponent={() => (
        <Button className="mt-2" onPress={close}>
          <Icon name="arrow-down" type="simple-line-icon" size={20} />
        </Button>
      )}
      enablePanDownToClose
      backdropComponent={Backdrop}
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      className="shadow-2xl mx-3"
    >
      <TaskForm task={task} mutate={mutate} handleClose={close} />
    </BottomSheetCustom>
  )
}

export default TaskBottomSheet
