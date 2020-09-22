import React from "react";
import styles from "./top-menu.module.scss";
import { Icon, Label, Menu } from "semantic-ui-react";
import { Context } from "../../store";
import { useRouter } from "next/router";

const TopMenu = () => {
  const router = useRouter();

  const handleItemClick = (e, { name }) => {
    router.push("/cart");
  };
  const store = React.useContext(Context);
  return (
    <Menu icon className={styles.container}>
      {/* <Menu.Item name="gamepad" onClick={handleItemClick}>
        <Icon name="gamepad" />
      </Menu.Item>

      <Menu.Item name="video camera" onClick={handleItemClick}>
        <Icon name="video camera" />
      </Menu.Item> */}
      {/* <div>{store.cart}</div> */}

      <Menu.Item
        name="shopping cart"
        onClick={handleItemClick}
        className={styles.cart_menu}
      >
        <Icon name="shopping cart" size="big" />
        {(store.cart > 0 || store.cart === "99+") && (
          <Label className={styles.label} circular color="red">
            {store.cart}
          </Label>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default TopMenu;
