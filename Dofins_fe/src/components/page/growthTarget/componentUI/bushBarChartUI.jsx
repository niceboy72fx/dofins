import * as React from "react";
import { ConfigProvider, Spin, Table } from "antd";
import styled from "styled-components";
import { Button } from "@mui/material";
import { popUp } from "../../../../state";
import { useRecoilState, useSetRecoilState } from "recoil";
import Util from "../../../../service/helper/util";
import StorageUtil from "../../../../service/helper/storage";
import { useLocation } from "react-router";
import useWebSocket from "../../../../hooks/WebSocketManager";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    ResponsiveContainer,
} from "recharts";
const api = [
    {
        Quarter: 1,
        Year: 2024,
        CFO: -1398665100747.0,
        CFI: 7572029122522.0,
        CFF: -3158180062439.0,
    },
    {
        Quarter: 4,
        Year: 2023,
        CFO: 1696520062265.0,
        CFI: -115663265315.0,
        CFF: 2051843670154.0,
    },
    {
        Quarter: 3,
        Year: 2023,
        CFO: 331853412139.0,
        CFI: -5906700294407.0,
        CFF: -796921261272.0,
    },
    {
        Quarter: 2,
        Year: 2023,
        CFO: 6520433623921.0,
        CFI: -2985259021548.0,
        CFF: 3543939263584.0,
    },
    {
        Quarter: 1,
        Year: 2023,
        CFO: -2678074691459.0,
        CFI: 177620360241.0,
        CFF: -68131294123.0,
    },
    {
        Quarter: 4,
        Year: 2022,
        CFO: 730208694217.0,
        CFI: 4198873016296.0,
        CFF: -849264149097.0,
    },
    {
        Quarter: 3,
        Year: 2022,
        CFO: 3869822428113.0,
        CFI: 2323993715389.0,
        CFF: -3909958218409.0,
    },
    {
        Quarter: 2,
        Year: 2022,
        CFO: -333546473220.0,
        CFI: -1624553915844.0,
        CFF: 529757935683.0,
    },
];

api.sort((a, b) => {
    if (a.Year !== b.Year) {
        return a.Year - b.Year;
    } else {
        return a.Quarter - b.Quarter;
    }
});

const formattedData = api.map((item) => ({
    time: `Q${item.Quarter} / ${item.Year}`,
    CFO: item.CFO,
    CFI: item.CFI,
    CFF: item.CFF,
}));

console.log(formattedData);

const BushStyled = styled(ResponsiveContainer)`
  .recharts-layer recharts-brush{
        backgroundColor
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="custom-tooltip"
                style={{
                    backgroundColor: "black",
                    border: "1px solid #ccc",
                    padding: "10px",
                    color: "white",
                }}
            >
                <p className="label">{`${label}`}</p>
                <p
                    className="intro"
                    style={{ color: "#82ca9d" }}
                >{`CFO: ${Util.formatNumber(payload[0].value)}`}</p>
                <p
                    className="intro"
                    style={{ color: "#FFFA82" }}
                >{`CFI: ${Util.formatNumber(payload[1].value)}`}</p>
                <p
                    className="intro"
                    style={{ color: "#C32E30" }}
                >{`CFF: ${Util.formatNumber(payload[2].value)}`}</p>
            </div>
        );
    }

    return null;
};

const BarStyled = styled(Bar)`
  &:hover {
    fill: orange;
  }
`;

export default function BushBarChartUI() {
    return (
        <BushStyled width="100%" className="min-h-[680px]">
            <BarChart
                width={500}
                height={400}
                data={formattedData}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 3" />
                <XAxis dataKey="time" color="white" />
                <YAxis tickCount={16} tickFormatter={Util.formatNumberStringVN} />
                <YAxis yAxisId="left" orientation="left" />

                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" wrapperStyle={{ lineHeight: '80px' }} />
                <Bar dataKey="CFO" fill="#37b24d" />
                <Bar dataKey="CFI" fill="#ffd43b" />
                <Bar dataKey="CFF" fill="#c92a2a" />
                <Brush
                    dataKey="time"
                    height={12}
                    stroke="#3B4252"
                    travellerWidth={40}
                    fill="#2d2d2d"
                    strokeOpacity={0.75}
                    color="white"
                    className="text-white"
                />
            </BarChart>
        </BushStyled>
    );
}
