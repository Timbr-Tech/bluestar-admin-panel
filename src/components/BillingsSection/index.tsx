/* eslint-disable */
import { Select, Dropdown, Form, Input, DatePicker } from "antd";
import PrimaryBtn from "../PrimaryBtn";
import CancelBtn from "../CancelBtn";
import DropdownBtn from "../DropdownBtn";
import type { MenuProps } from "antd";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";
import { ReactComponent as ArrowLeftOutlined } from "../../icons/arrow-left-blue.svg";
import { ReactComponent as PlusIcon } from "../../icons/plus-blue.svg";
import CustomizeRequiredMark from "../../components/Common/CustomizeRequiredMark";
import styles from "./index.module.scss";
import { useState } from "react";

interface IBillingsSection {
  isEdit: boolean;
  isInvoice: boolean;
}

const BillingsSection = ({ isEdit, isInvoice }: IBillingsSection) => {
  const [dropdownValue, setDropdownValue] = useState("BlueStar Prime");
  const [form] = Form.useForm();

  const items: MenuProps["items"] = [
    {
      label: "Taxable",
      key: "0",
    },
    {
      label: "Non-taxable",
      key: "1",
    },
  ];

  const TAXES = [{ value: "Preset tax - 10%", label: "Preset tax - 10%" }];

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <a href="/billings" className={styles.backBtn}>
          <ArrowLeftOutlined />
          {isInvoice ? "Back to Invoices" : "Back to Receipst"}
        </a>
        <div className={styles.headingSection}>
          <div className={styles.header}>
            {isInvoice ? "Create invoice" : "Create receipt"}
          </div>
          <div className={styles.leftHeader}>
            <div className={styles.text}>Billing as: </div>
            <Select value={dropdownValue} />
            <div className={styles.dash} />
            <CancelBtn btnText="Cancel" onClick={() => {}} />
            <PrimaryBtn
              btnText="Save Invoice"
              onClick={() => {}}
              LeadingIcon={CheckIcon}
            />
          </div>
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <div className={styles.header}>
              <div className={styles["header_1"]}>Invoice details</div>
              <div className={styles["header_2"]}>
                Fill customer and booking details here
              </div>
            </div>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <DropdownBtn
                btnText={"Add custom row"}
                onClick={() => {}}
                LeadingIcon={PlusIcon}
              />
            </Dropdown>
          </div>
          <div className={styles.customerContainer}>
            <div className={styles.customerHeading}>Customer details</div>
            <Form
              requiredMark={CustomizeRequiredMark}
              className={styles.form}
              layout="vertical"
              form={form}
            >
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Customer"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer",
                    },
                  ]}
                  name="customer"
                  id="customer"
                >
                  <Input placeholder="Expedia Services" />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="GSTIN Number"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  name="gstin"
                  id="gstin"
                >
                  <Input placeholder="GSIT00004821" />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Billing Name"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  name="billingName"
                  id="billingName"
                >
                  <Input placeholder="Expedia Global Inc." />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Billing Address"
                  name="billingAddress"
                  id="billingAddress"
                >
                  <Input.TextArea
                    className={styles.textarea}
                    name="billingAddress"
                    placeholder="Parkway Centre 1  Marine Parade Central #13-03 Singapore 449408"
                  />
                </Form.Item>
              </div>
              <div className={styles.typeContainer}>
                <Form.Item
                  label="Taxes"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  name="taxes"
                  id="taxes"
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select One"
                    dropdownRender={(menu) => <>{menu}</>}
                    options={TAXES.map((tax) => ({
                      label: tax.label,
                      value: tax.value,
                    }))}
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className={styles.invoicesContainer}>
            <div className={styles.invoiceHeading}>{`Invoice dates`}</div>
            <div className={styles.invoice}>
              <div className={styles.invoiceNumber}>
                <div className={styles.primary}>{`Invoice Number`}</div>
                <div className={styles.secondary}>{`GR2425-0005`}</div>
              </div>
              <div className={styles.invoiceNumber}>
                <div className={styles.primary}>{`Invoice Date`}</div>
                <div className={styles.secondary}>{`21/07/24`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  );
};

export default BillingsSection;
