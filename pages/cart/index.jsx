import React from "react";
import styles from "./cart.module.scss";
import { Context } from "../../store";
import TopMenu from "../../components/top/top-menu";
import Logo from "../../components/top/logo";
import {
  Button,
  Header,
  Icon,
  Image,
  Input,
  Menu,
  Pagination,
  Table,
} from "semantic-ui-react";

const Cart = () => {
  const store = React.useContext(Context);
  const { cartList } = store;
  const [activeItem, setActiveItem] = React.useState("home");
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const onMua = (i) => {
    store.add(i);
  };
  const onReduce = (i) => {
    store.reduce(i);
  };
  const onDelete = (i) => {
    store.delete(i);
  };
  const onInput = (i) => (event) => {
    const input = +event.target.value;
    if (!Number.isSafeInteger(input)) {
      return;
    }
    store.inNumber(i, input);
  };
  return (
    <div className={styles.cart}>
      <TopMenu></TopMenu>
      <Logo></Logo>
      <div className={styles.container}>
        <div className={styles.cart_title}>
          <div className={styles.text}>
            <p>Shopping Cart</p>
          </div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.cart_table}>
          <Table basic="very" celled collapsing striped>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Mã Sản Phẩm</Table.HeaderCell>
                <Table.HeaderCell>Số lượng</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {cartList.map((cartItem, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image src={cartItem.img} rounded size="mini" />
                        <Header.Content>
                          {cartItem.name}
                          <Header.Subheader>Nước mắm</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        type="text"
                        action
                        className={styles.action_buttons}
                        onChange={onInput(cartItem)}
                      >
                        <Button
                          animated
                          color="blue"
                          onClick={() => {
                            onMua(cartItem);
                          }}
                        >
                          <Button.Content visible>Tăng</Button.Content>
                          <Button.Content hidden>
                            <Icon name="add" />
                          </Button.Content>
                        </Button>
                        <input value={cartItem.total}></input>
                        <Button
                          animated
                          color="orange"
                          onClick={() => {
                            onReduce(cartItem);
                          }}
                        >
                          <Button.Content visible>Giảm</Button.Content>
                          <Button.Content hidden>
                            <Icon name="minus" />
                          </Button.Content>
                        </Button>
                      </Input>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        animated
                        color="red"
                        onClick={() => {
                          onDelete(cartItem);
                        }}
                      >
                        <Button.Content visible>Xóa</Button.Content>
                        <Button.Content hidden>
                          <Icon name="delete" />
                        </Button.Content>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
            <Table.Footer>
              {cartList.length > 0 && (
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Pagination
                      boundaryRange={0}
                      defaultActivePage={1}
                      totalPages={1}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              )}
            </Table.Footer>
          </Table>
        </div>
        <div className={styles.return}>
          <a href="/">Return to home page !</a>
        </div>
      </div>
    </div>
  );
};
export default Cart;
