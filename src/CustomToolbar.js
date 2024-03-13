import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  alpha,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Tab, Nav, Button,Dropdown } from "react-bootstrap";
import Sepet from "./Sepet";
import img from "./Unknown.jpeg"

const CustomDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: "250px",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#434343",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));





const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,

  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const customButtonStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  backgroundColor: "transparent",
  color: "white",
  transition: "background-color 0.3s, color 0.3s",
};

const CustomToolbar = ({
  handleDrawerOpen,
  searchTerm,
  handleInputChange,
  handleSearch,
  categories,
  handleDrawerClose,
  handleCategoryClick,
  openDrawer,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: "#8F0213" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Kitapkurdu.com
          </Typography>

          <Search>
            <SearchIcon style={{ marginRight: "8px" }} />
            <StyledInputBase
              placeholder="Kitap Adı veya Yazar Ara"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Search>

          <div style={{ marginLeft: "auto" }}>
            <Tab.Container>
              <Nav>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/Login"
                    style={{ ...customButtonStyle }}
                    className="me-2"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{ color: "white" }}
                    >
                      Giriş Yap
                    </button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/Registration"
                    style={{ ...customButtonStyle }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{ color: "white" }}
                    >
                      Üye Ol
                    </button>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  {/* Dropdown butonu */}
                  <Dropdown 
                  >
                    <Dropdown.Toggle
                      as={Button}
                      style={{ ...customButtonStyle, height:"2.5rem", marginTop:"0.4rem" } }
                      className="btn btn-outline-secondary"
                      size="md"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} /> Sepetim
                    </Dropdown.Toggle>
                    {/* sepete eklenen kitaplar gelecek */}
                    <Dropdown.Menu >
                      <Dropdown.Item >
                      
                      <Sepet  />

                      </Dropdown.Item>
                     
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Item>
              </Nav>
            </Tab.Container>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer (Menü) */}
      <CustomDrawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              button
              component={Link}
              to={`/category/${category.id}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <ListItemText>
                <Typography variant="body1" fontWeight="bold">
                  {category.name}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </CustomDrawer>
    </ThemeProvider>
  );
};

export default CustomToolbar;
