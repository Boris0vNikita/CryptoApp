import { useRef, useState } from "react";
import { Select, Space, Typography, Flex, Divider, Form, Result, Button, InputNumber, DatePicker } from "antd";
import { useCrypto } from "../context/crypto-context";
import { useForm } from "antd/es/form/Form";
import CoinInfo from "./CoinInfo";

const validateMessage = {
    require: "${label} is required!",
    types: {
        number: "${label} is not valid nimber",
    },
    number: {
        range: "${label} must be bettween ${min} and ${max}",
    },
};

export default function AddAssetForm({ onClose }) {
    const [submitted, setSubmitted] = useState(false);
    const [form] = Form.useForm();
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState(null);
    const assetRef = useRef();

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added!"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        );
    }

    if (!coin) {
        return (
            <Select
                onSelect={(v) => setCoin(crypto.find((c) => c.id == v))}
                style={{
                    width: "100%",
                }}
                placeholder="Select coin"
                optionLabelProp="label"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                    </Space>
                )}
            />
        );
    }

    function onFinish(value) {
        const newAsset = {
            id: coin.id,
            amount: value.amount,
            price: value.price,
            date: value.date?.$d ?? new Date(),
        };
        assetRef.current = newAsset;
        setSubmitted(true);
        addAsset(newAsset);
    }

    function handleAmounChange(value) {
        const price = form.getFieldValue("price");
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        });
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue("amount");
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        });
    }

    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    price: +coin.price.toFixed(2),
                }}
                onFinish={onFinish}
                autoComplete="off"
                validateMessages={validateMessage}
            >
                <CoinInfo coin={coin} />
                <Divider />

                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: "number",
                            min: 0,
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Enter coin amount"
                        onChange={handleAmounChange}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item label="Price" name="price">
                    <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Date & Time" name="date">
                    <DatePicker showTime />
                </Form.Item>

                <Form.Item label="Total" name="total">
                    <InputNumber disabled style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Asset
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
