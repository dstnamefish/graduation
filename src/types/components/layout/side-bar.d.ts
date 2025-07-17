export interface MenuItem {
  id: number;
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  isAbled?: boolean;
  isHidden?: boolean;
}

export interface SideBarState {
  isCollapsed: boolean;
  activePath: string;
}