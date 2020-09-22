import React from "react";
import { Button, Form, Menu, Message, Segment, Icon } from "semantic-ui-react";
import Logo from "../components/top/logo";
import TopMenu from "../components/top/top-menu";
import { getData } from "../lib/apis";
import { Context } from "../store";
import styles from "./top.module.scss";
import classNames from "class-names";
import emailjs from "emailjs-com";
const YOUR_SERVICE_ID = "service_h9azpr9";
export const YOUR_USER_ID = "user_Zqw7y3BwpGR1Ez7Ur5a2G";
const YOUR_TEMPLATE_ID = "template_9r7toxq";
const Top = (props) => {
  const { data } = props;
  const store = React.useContext(Context);
  const [activeItem, setActiveItem] = React.useState("home");
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [item, setItem] = React.useState({
    ho: "",
    ten: "",
    email: "",
    phone: "",
    content: "",
  });
  const [error, setError] = React.useState({
    ho: "",
    ten: "",
    email: "",
    phone: "",
    content: "",
  });
  const [errContent, setErrContent] = React.useState("");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    setIsSubmit(false);
  };
  const onMua = (i) => {
    store.add(i);
  };
  const onContactInput = (field) => (event) => {
    const value = event.target.value;
    if (field !== "content" && value.length > 255) {
      return;
    }
    if (isSubmit) {
      checkError(field, value);
    }

    setItem({ ...item, [field]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    let err = false;
    for (let f in item) {
      const value = item[f];
      err = checkError(f, value);
      if (err) break;
    }
    if (!err) {
      sendEmail(item);
    }
  };
  const sendEmail = (item) => {
    let template = {
      from_name: item.ten,
      to_name: "Trần Minh Sang",
      name: item.ho + " " + item.ten,
      email: item.email,
      phone: item.phone,
      message: item.content,
    };
    emailjs
      .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, template, YOUR_USER_ID)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const checkError = (field, value) => {
    let e = false;
    if (field === "email") {
      if (!value) {
        setError({ ...error, [field]: "error" });
        setErrContent("Vui lòng nhập địa chỉ email");
        e = true;
      } else {
        if (!value.includes("@")) {
          setError({ ...error, [field]: "error" });
          setErrContent("Vui lòng nhập địa chỉ email chính xác");
          e = true;
        } else {
          setError({ ...error, [field]: "" });
          setErrContent("");
          e = false;
        }
      }
    } else if (field === "ten") {
      if (!value) {
        setError({ ...error, [field]: "error" });
        setErrContent("Vui lòng nhập tên của bạn");
        e = true;
      } else {
        setError({ ...error, [field]: "" });
        setErrContent("");
        e = false;
      }
    }
    return e;
  };
  return (
    <div className={styles.top}>
      <TopMenu></TopMenu>
      <Logo></Logo>
      <div className={styles.menu_container}>
        <Menu secondary className={styles.menu}>
          <Menu.Menu position="left" className={styles.menu_group}>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={handleItemClick}
            >
              Sản Phẩm
            </Menu.Item>
            <Menu.Item
              name="contact"
              active={activeItem === "contact"}
              onClick={handleItemClick}
            >
              Liên Hệ
            </Menu.Item>
          </Menu.Menu>

          <Menu.Menu position="right">
            {/* <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item> */}
            {/* <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={handleItemClick}
              className={styles.logout}
            /> */}
          </Menu.Menu>
        </Menu>
      </div>
      {activeItem === "home" && (
        <div className={styles.body}>
          {data.map((value, index) => {
            return (
              <div key={index} className={styles.item}>
                <div className={styles.item_image}>
                  <p className={styles.image_text}>{value.name}</p>
                  <img src={value.img} alt={value.name}></img>
                  <div
                    className={styles.add}
                    onClick={() => {
                      onMua(value);
                    }}
                  >
                    Mua
                  </div>
                </div>
                <div className={styles.item_name}>
                  <p>{value.name}</p>
                </div>
                <div className={styles.item_price}>
                  <p>${value.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {activeItem === "contact" && (
        <div className={styles.contact}>
          Nếu có nhu cầu đặt mua hay cần hỗ trợ tư vấn về sản phẩm hoặc bất kì
          câu hỏi nào, xin vui lòng liên hệ chúng tôi qua email:
          <div className={styles.email}>sang9c.nguyendu@gmail.com</div>
          <div className={styles.hoac}>
            <p>Hoặc điền vào form dưới dây và gửi yêu cầu cho chúng tôi.</p>
          </div>
          <div className={styles.downArrowContainer}>
            <Icon
              className={styles.downArrow}
              name="hand point down outline"
            ></Icon>
          </div>
          <div className={styles.form}>
            <Segment inverted className={styles.segment}>
              <Form inverted error={errContent !== ""} onSubmit={onSubmit}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Họ"
                    placeholder="Họ"
                    onChange={onContactInput("ho")}
                  >
                    <input value={item.ho} />
                  </Form.Input>
                  <Form.Input
                    fluid
                    label="Tên"
                    placeholder="Tên"
                    onChange={onContactInput("ten")}
                    error={error["ten"] !== ""}
                  >
                    <input value={item.ten} />
                  </Form.Input>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Email"
                    placeholder="Email"
                    onChange={onContactInput("email")}
                    error={error["email"] !== ""}
                  >
                    <input value={item.email} />
                  </Form.Input>
                  <Form.Input
                    fluid
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    onChange={onContactInput("phone")}
                  >
                    <input value={item.phone} />
                  </Form.Input>
                </Form.Group>
                <Form.TextArea
                  label="Xin vui lòng cho chúng tôi biết điều bạn muốn"
                  placeholder="Please tell us more..."
                  rows={10}
                  value={item.content}
                  onChange={onContactInput("content")}
                ></Form.TextArea>
                <Form.Checkbox label="I agree to the Terms and Conditions" />
                {errContent !== "" && (
                  <Message
                    error
                    header="Action Forbidden"
                    content={errContent}
                  />
                )}
                <Button type="submit">Gửi yêu cầu</Button>
              </Form>
            </Segment>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top;

export async function getServerSideProps(context) {
  const res = await getData();
  return {
    props: {
      data: res,
    }, // will be passed to the page component as props
  };
}
