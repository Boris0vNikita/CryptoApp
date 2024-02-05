import { Divider, Flex, Tag, Typography } from "antd";
import CoinInfo from "./CoinInfo";

export default function CoinInfoModal({ coin }) {
    return (
        <>
            <CoinInfo coin={coin} withSymbol />
            <Divider />

            {/* Статистика */}
            <Typography.Paragraph>
                <Typography.Text strong>1 hour: </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>{coin.priceChange1h}%</Tag>

                <Typography.Text strong>1 day: </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>{coin.priceChange1d}%</Tag>

                <Typography.Text strong>1 week: </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>

            {/* Цена BTC*/}
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                {coin.priceBtc}$
            </Typography.Paragraph>

            {/* маркет капитализации */}
            <Typography.Paragraph>
                <Typography.Text strong>Market Capital: </Typography.Text>
                {coin.marketCap}$
            </Typography.Paragraph>

            {/* контракт адресс */}
            <Typography.Paragraph>
                <Typography.Text strong>Contract Address: </Typography.Text>
                {coin.contractAddress}$
            </Typography.Paragraph>
        </>
    );
}
