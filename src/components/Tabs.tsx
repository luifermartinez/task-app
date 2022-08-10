import { FC } from "react"
import { FlatList } from "react-native-gesture-handler"
import { ITab } from "../utils/interfaces"
import Tab from "./ui/Tab"
import Wrapper from "./ui/Wrapper"

/* Defining the props that the component will receive. */
interface Props {
  tabs: ITab[]
  activeTab: string
  setActiveTab: (tab: "live" | "done" | "archived") => void
}
// Tabs component that renders the tabs of the app, each tab is a state of the tasks.
const Tabs: FC<Props> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Wrapper className="mt-10">
      <FlatList
        horizontal
        data={tabs}
        renderItem={({ item }) => (
          <Tab
            label={item.label}
            active={activeTab === item.code}
            onSelect={() => setActiveTab(item.code)}
          />
        )}
        keyExtractor={(item) => item.code}
      />
    </Wrapper>
  )
}

export default Tabs
