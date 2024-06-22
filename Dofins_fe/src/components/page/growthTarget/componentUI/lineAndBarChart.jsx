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
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const TableStyled = styled(Table)`

`;

const data = [
  { date: '01/01', price: 36000, volume: 2400 },
  { date: '01/02', price: 35800, volume: 1398 },
  { date: '01/03', price: 35700, volume: 9800 },
  { date: '01/04', price: 35900, volume: 3908 },
  { date: '01/05', price: 35500, volume: 4800 },
  { date: '01/06', price: 35300, volume: 3800 },
  { date: '01/07', price: 35400, volume: 4300 },
];


export default function LineAndBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" domain={[35000, 36000]} />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="price" stroke="#ff7300" dot={false} />
        <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#413ea0" />
      </ComposedChart>
    </ResponsiveContainer>
  )

}
