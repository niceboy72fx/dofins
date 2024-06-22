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
import { ComposedChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TableStyled = styled(Table)`

`;

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

export default function ChartUI() {
  return (<ResponsiveContainer width="100%" className="min-h-[400px]">
    <ComposedChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 20, right: 20, bottom: 20, left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="pv" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="uv" stroke="#ff7300" />
    </ComposedChart>
  </ResponsiveContainer>)

}
