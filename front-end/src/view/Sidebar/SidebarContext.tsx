import { createContext, useState, ReactNode } from "react";

const initialValue = {
  isCollapsedSidebar: false,
  toogleSidebarCollapseHandler: () => {},
};
export const SidebarContext = createContext(initialValue);

interface Props {
  children: ReactNode | ReactNode[];
}

const SidebarProvider = ({ children }: Props) => {
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(false);

  const toogleSidebarCollapseHandler = () => {
    setIsCollapsedSidebar((prev) => !prev);
  };
  return (
    <SidebarContext.Provider
      value={{ isCollapsedSidebar, toogleSidebarCollapseHandler }}
    >{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;
