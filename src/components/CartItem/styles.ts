import { styled } from "../../styles";

export const CartItemContainer = styled("div", {
  padding: "0 3rem",
  display: "flex",
  gap: "1.25rem",
  width:'100%',
  marginBottom:'1.25rem'
});

export const CartItemAvatar = styled("div", {
  background: "linear-gradient(180deg,#1ea483 0%,#7465d4 100%)",
  width: 102,
  height: 93,
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  img: {
    objectFit: "cover"
  }
});

export const CartItemDescription = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",

  div: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  p: {
    fontSize: "$md",
    width: 230
  },

  button: {
    alignSelf: "flex-start",
    background: "transparent",
    color: "$green500",
    fontWeight: "bold",
    fontSize: "$md",
    border: "none"
  }
});
