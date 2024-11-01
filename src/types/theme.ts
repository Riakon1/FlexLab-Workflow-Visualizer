export interface Theme {
  id: string;
  name: string;
  colors: {
    toolbar: string;
    toolbarHover: string;
    canvas: string;
    gridPrimary: string;
    gridSecondary: string;
    objectBackground: string;
    objectBorder: string;
    objectText: string;
    connectionLine: string;
    connectionLineHover: string;
    modalBackground: string;
  };
  spacing: {
    toolbarWidth: number;
    objectPaddingX: number;
    objectPaddingY: number;
    objectBorderRadius: number;
  };
}