import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden"
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between"
});

export const Bag = styled("div", {
  cursor: "pointer",
  position: "relative",
  zIndex: 1,
  span: {
    width: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    backgroundColor: "$green500 ",
    color: "$white",
    borderRadius: "50%",
    position: "absolute",
    top: -8,
    right: -8,
    fontSize: "0.875rem",
    border: "4px solid $gray900",
    fontWeight: "bold",
    boxSizing: "border-box"
  }
});
