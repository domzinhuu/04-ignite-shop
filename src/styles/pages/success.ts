import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100"
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem"
  },

  a: {
    marginTop: "5rem",
    display: "block",
    color: "$green500",
    fontSize: "$lg",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      color: "$green300"
    }
  }
});

export const ImageList = styled("div", {
  display: "flex"
});
export const ImageContainer = styled("div", {
  width: 145,
  height: 145,
  background: "linear-gradient(180deg,#1ea483 0%,#7465d4 100%)",
  borderRadius: "50%",
  padding: "0.25rem",
  marginTop: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow:"-8px 0 5px rgba(0,0,0,0.6)",
  
  "&:not(:first-child)": {
    marginLeft: "-3.5rem"
  },

  img: {
    objectFit: "cover"
  }
});
