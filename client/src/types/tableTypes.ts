import React from "react";

export interface ColumnType {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: string) => string | React.ReactNode;
}




export interface SidebarItem{
  icon:React.ReactNode;
  name:string;
  link:string;
}

export type SidebarListType = SidebarItem[];