import { filter } from "lodash";
import { styled } from "../../styles";

export const CartBackground = styled("section", {
  width: 0,
  height: 0,
  backgroundColor: "transparent",
  position: "fixed",

  "&.show": {
    zIndex: 9999,
    backgroundColor: "rgba(0,0,0,0.6)",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100vh"
  }
});
export const CartContainer = styled("div", {
  width: 480,
  height: "100vh",
  backgroundColor: "$gray800",
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: 9999,
  boxShadow: "-5px 0px 3px rgba(0,0,0,0.3)",
  transform: "translateX(480px)",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  "&.show": {
    transform: "translateX(0)",
    opacity: 1
  }
});

export const CartHeader = styled("header", {
  padding: "1.5rem",
  textAlign: "end",

  img: {
    cursor: "pointer"
  }
});

export const CartContent = styled("main", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1
});

export const CartItems = styled("div", {
  flex: 1
});

export const CartResume = styled("div", {
  flex: 4,
  padding: "1.5rem 3rem 2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: "1rem"
});

export const CartResumeDetail = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  p: {
    fontSize: "1rem"
  },

  strong: {
    fontSize: "1.25rem"
  }
});

export const CartTitle = styled("h2", {
  fontSize: "$lg",
  color: "$gray100",
  fontWeight: "bold",
  padding: "1.5rem 3rem 2rem"
});

export const CartAction = styled("div", {
  padding: "1.5rem 3rem 2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  button: {
    backgroundColor: "$green500",
    borderRadius: 8,
    border: "none",
    color: "$white",
    padding: 20,
    width: "100%",
    fontSize: "1.125rem",
    fontWeight: "bold",
    cursor: "pointer",

    "&:hover":{
      backgroundColor: "$green300"
    },

    "&:disable": {
      cursor: "not-allowed"
    }
  }
});
