import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetFrom from "../AddAssetForm";

const headerStyle = {
    width: "100%",
    textAlign: "center",
    height: 60,
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export default function AppHeader() {
    const [modal, setModal] = useState();
    const [coin, setCoin] = useState(null);
    const [select, setSelect] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const { crypto } = useCrypto();

    //При нажатии на "/" открывается селект и так же на нее закрывается
    useEffect(() => {
        const keypress = (event) => {
            if (event.key === "/") {
                setSelect((prev) => !prev);
            }
        };
        document.addEventListener("keypress", keypress);
        return () => document.removeEventListener("keypress", keypress);
    }, []);

    function handleSelect(value) {
        console.log(value);
        setModal(true);
        setCoin(crypto.find((c) => c.id == value));
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                onSelect={handleSelect}
                open={select}
                onClick={() => setSelect((prev) => !prev)}
                style={{
                    width: "250px",
                }}
                value="press / to open"
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

            <Button type="primary" onClick={() => setDrawer(true)}>
                Add asset
            </Button>

            <Modal open={modal} footer={null} onCancel={() => setModal(false)}>
                <CoinInfoModal coin={coin} />
            </Modal>

            <Drawer width={600} title="Add Asset" destroyOnClose onClose={() => setDrawer(false)} open={drawer}>
                <AddAssetFrom onClose={() => setDrawer(false)} />
            </Drawer>
        </Layout.Header>
    );
}
